(function(exports) {
    const { logger } = require('log-instance');
    const { MerkleJson } = require('merkle-json');
    const examples = require('../api/examples.json');

    class ExampleSeeker {
        constructor(opts={}) {
            (opts.logger || logger).logInstance(this, opts);
            this.examples = examples;
            this.lang = opts.lang || 'en';
            this.mj = new MerkleJson;
            this.maxResults = opts.maxResults==null ? 1000 : opts.maxResults;
            this.axios = opts.axios;
            this.matchHighlight = opts.matchHighlight ||
                '<span class="scv-matched">$&</span>';
        }

        static sanitizePattern(pattern) {
            if (!pattern) {
                throw new Error("search pattern is required");
            }
            const MAX_PATTERN = 1024;
            var excess = pattern.length - MAX_PATTERN;
            if (excess > 0) {
                throw new Error(
                    `Search text too long by ${excess} characters.`);
            }
            // replace quotes (code injection on grep argument)
            pattern = pattern.replace(/["']/g,'.'); 
            // eliminate tabs, newlines and carriage returns
            pattern = pattern.replace(/\s/g,' '); 
            // remove control characters
            pattern = pattern.replace(/[\u0000-\u001f\u007f]+/g,''); 
            // must be valid
            new RegExp(pattern);

            return pattern;
        }

        static normalizePattern(pattern) {
            // normalize white space to space
            pattern = pattern.trim().replace(/[\s]+/g,' ').toLowerCase(); 
            
            return pattern;
        }

        isExample(pattern) {
            var examples = this.examples;
            var reExamples = this.reExamples;
            if (!reExamples) {
                let patExamples = Object.keys(examples)
                    .reduce((ak,k)=>{
                        let ae = examples[k].reduce((a,e)=>[...a,e],ak);
                        return ak.concat(ae);
                    }, [])
                    .join("|");
                this.reExamples = 
                reExamples = new RegExp(`(\\b)?\(${patExamples}\)(\\b)?`, "iu");
            }
            return reExamples.test(pattern);
        }

        exampleGuid(example, lang='en') {
            const fbody = [
                `(args)=>{`,
                `                return that.slowFind.call(that, args);`,
                `            }`,
            ].join('\n');
            let key = {
              volume: "Seeker.callSlowFind",
              fbody,
              args: [{
                  pattern: example,
                  languages: lang === 'en'
                    ? [ "pli", "en", ]
                    : [ "pli", "en", lang ],
                  searchLang: lang,
                  lang,

                  showMatchesOnly: true,
                  maxResults: 1000,
                  maxDoc: 50,
                  minLang: lang === 'en' ? 2 : 3,
                  matchHighlight: this.matchHighlight,
                  types: [ "root", "translation" ],
                  includeUnpublished: false,
                  sortLines: undefined, // These are not serialized
                  tipitakaCategories: undefined, // These are not serialized
              }],
            };
            return this.mj.hash(key);
        }

        findArgs(args) {
            if (!(args instanceof Array)) {
                throw new Error("findArgs(?ARRAY-OF-ARGS?)");
            }
            if (typeof args[0] === 'string') {
                var opts = {
                    pattern: args[0],
                    maxResults: args[1],
                }
            } else {
                var opts = args[0];
            }
            var {
                pattern: rawPattern,
                searchLang,
                lang,
                language, // DEPRECATED
                languages,
                minLang,    // minimum number of languages
                maxResults, // maximum number of grep files
                maxDoc,     // maximum number of returned documents
                matchHighlight,
                sortLines,
                showMatchesOnly,
                tipitakaCategories,
                types,
                includeUnpublished=this.includeUnpublished,
            } = opts;
            if (rawPattern == null) {
                throw new Error(`pattern is required`);
            }

            // STEP 1. extract embeddable options
            var argv = rawPattern.split(' ');
            var pattern = '';
            for (var i = 0; i < argv.length; i++) {
                var arg = argv[i];
                if (arg === '-d' || arg === '--maxDoc') {
                    let n = Number(argv[++i]);
                    if (!isNaN(n) && 0 < n ) {
                        maxDoc = n;
                    }
                } else if (arg === '-mr' || arg === '--maxResults') {
                    let n = Number(argv[++i]);
                    if (!isNaN(n) && 0 < n && n < 4000 ) {
                        maxResults = n;
                    }
                } else if (arg.startsWith('-tc:')) {
                    tipitakaCategories = arg.substring('-tc:'.length);
                } else if (arg === '-ml1' ) {
                    minLang = 1;
                } else if (arg === '-ml2' ) {
                    minLang = 2;
                } else if (arg === '-ml3' ) {
                    minLang = 3;
                } else if (arg === '-ml' || arg === '--minLang') {
                    let n = Number(argv[++i]);
                    if (!isNaN(n) && 0 < n && n <= 3) {
                        minLang = n;
                    }
                } else if (arg === '-l' || arg === '--lang') {
                    (arg = argv[++i]) && (lang = arg);
                } else if (arg === '-sl' || arg === '--searchLang') {
                    (arg = argv[++i]) && (searchLang = arg);
                } else {
                    pattern  = pattern ? `${pattern} ${arg}` : arg;
                }
            }

            // STEP 2. Assign default values
            var thisLang = this.lang;
            lang = lang || language || thisLang;
            minLang = minLang || 
                (lang === 'en' || searchLang === 'en' ? 2 : 3);
            pattern = ExampleSeeker.sanitizePattern(pattern);
            pattern = ExampleSeeker.normalizePattern(pattern);
            (showMatchesOnly == null) && (showMatchesOnly = true);
            languages = languages || [];
            (lang && !languages.includes(lang)) && languages.push(lang);
            maxResults = maxResults==null ? this.maxResults : maxResults;
            if (isNaN(Number(maxResults))) {
                throw new Error(`maxResults must be a number:${maxResults}`);
            }
            maxResults = Number(maxResults);
            maxDoc = Number(maxDoc==null ? this.maxDoc : maxDoc);
            (matchHighlight == null) && 
                (matchHighlight = this.matchHighlight);

            types = types || ['root', 'translation'];

            return {
                pattern,
                showMatchesOnly,
                languages,
                maxResults,
                searchLang,
                maxDoc,
                minLang,
                matchHighlight,
                sortLines,
                tipitakaCategories,
                lang,
                types,
                includeUnpublished,
            }
        }

        async find(...args) { try {
            var {
                axios,
                findMemo,
                memoizer,
            } = this;
            var {
                lang,
                pattern,
            } = this.findArgs(args);
            var that = this;
            var callSlowFind = (args)=>{
                return that.slowFind.call(that, args);
            };
            var result;
            if (this.isExample(pattern)) {
                let guid = this.exampleGuid(pattern, lang);
                let url = [
                    'https://raw.githubusercontent.com',
                    'sc-voice',
                    'scv-static',
                    'main',
                    'api',
                    'Seeker.callSlowFind',
                    guid.substring(0,2),
                    `${guid}.json`,
                ].join('/');
                try {
                    let res = await axios.get(url);
                    result = res.data.value;
                } catch(e) {
                    let err = new Error(`${url} => ${e.message}`);
                    throw err;
                }
            } else {
                console.log(`dbg find() non-example:`, pattern);
            }
            return result;
        } catch(e) {
            this.warn(`find(${pattern})`, e.message);
            throw e;
        }}

    }

    module.exports = exports.ExampleSeeker = ExampleSeeker;

})(typeof exports === "object" ? exports : (exports = {}));

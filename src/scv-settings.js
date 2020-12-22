(function(exports) {
    const { logger } = require('log-instance');
    class ScvSettings { 
        constructor(opts={}) {
            let {
                audio = ScvSettings.AUDIO.OGG,
                useCookies = false,
                fullLine = false,
                ips = 6,
                lang = 'en',
                locale = 'en',
                maxResults = 5,
                scid = null,
                search = null,
                showId = false,
                showLang = ScvSettings.SHOWLANG.BOTH,
                vnameRoot = 'Aditi',
                vnameTrans = 'Amy',

            } = opts;
            (opts.logger || logger).logInstance(this, opts);

            this.audio = audio;
            this.fullLine = fullLine;
            this.ips = 6;
            this.lang = lang;
            this.locale = locale;
            this.maxResults = maxResults;
            this.scid = scid;
            this.search = search;
            this.showId = showId;
            this.showLang = showLang;
            this.useCookies = useCookies;
            this.vnameRoot = vnameRoot;
            this.vnameTrans = vnameTrans;

        }
        
        static get WEB_LANGUAGES() { 
            return [{
                code: 'cs',
                label: 'Čeština / CS',
            }, {
                code: 'da',
                label: 'Dansk / DA',
            }, {
                code: 'de',
                label: 'Deutsch / DE',
            }, {
                code: 'en',
                label: 'English / EN',
            }, {
                code: 'fr',
                label: 'Français / FR',
            }, {
                code: 'hi',
                label: 'हिंदी / HI',
            }, {
                code: 'is',
                label: 'Íslenska / IS',
            }, {
                code: 'ja',
                label: '日本語 / JA',
            }, {
                code: 'nb',
                label: 'Norsk / NB',
            }, {
                code: 'nl',
                label: 'Nederlands / NL',
            }, {
                code: 'pl',
                label: 'Polski / PL',
            }, {
                code: 'pt',
                label: 'Português / PT',
            }, {
                code: 'ro',
                label: 'Română / RO',
            }, {
                code: 'si',
                label: 'සිංහල / SI',
            }, {
                code: 'vi',
                label: 'Tiếng Việt / VI',
            }];
        }

        static langLabel(lang) {
            let info = ScvSettings.WEB_LANGUAGES.find(l=>l.code === lang) || {
                label:`unknown language:${lang}` };
            return info.label;
        }

        static get SHOWLANG() { 
            return { BOTH: 0, PALI: 1, TRANS: 2, } 
        }

        static get AUDIO() { 
            return { MP3: 'mp3', OGG: 'ogg', OPUS: 'opus', };
        }

    }

    module.exports = exports.ScvSettings = ScvSettings;
})(typeof exports === "object" ? exports : (exports = {}));


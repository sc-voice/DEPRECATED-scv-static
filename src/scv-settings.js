(function(exports) {
    const { logger } = require('log-instance');
    class ScvSettings { 
        constructor(opts={}) {
            let {
                audio = ScvSettings.AUDIO.OGG,
                cookieName = null, // don't use cookies
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
            this.cookieName = cookieName;
            this.vnameRoot = vnameRoot;
            this.vnameTrans = vnameTrans;

        }
        
        static get WEB_LANGUAGES() { 
            return [{
                name: 'cs',
                label: 'Čeština / CS',
            }, {
                name: 'da',
                label: 'Dansk / DA',
            }, {
                name: 'de',
                label: 'Deutsch / DE',
            }, {
                name: 'en',
                label: 'English / EN',
            }, {
                name: 'fr',
                label: 'Français / FR',
            }, {
                name: 'hi',
                label: 'हिंदी / HI',
            }, {
                name: 'is',
                label: 'Íslenska / IS',
            }, {
                name: 'ja',
                label: '日本語 / JA',
            }, {
                name: 'nb',
                label: 'Norsk / NB',
            }, {
                name: 'nl',
                label: 'Nederlands / NL',
            }, {
                name: 'pl',
                label: 'Polski / PL',
            }, {
                name: 'pt',
                label: 'Português / PT',
            }, {
                name: 'ro',
                label: 'Română / RO',
            }, {
                name: 'si',
                label: 'සිංහල / SI',
            }, {
                name: 'vi',
                label: 'Tiếng Việt / VI',
            }];
        }

        static langLabel(lang) {
            let info = ScvSettings.WEB_LANGUAGES.find(l=>l.name === lang) || {
                label:`unknown language:${lang}` };
            return info.label;
        }


        static create(opts={}) {
            var {
                navigator,
                $cookie,
                cookieName='scv-settings',
            } = opts;
            let navLang = navigator && navigator.language;
            var locale = navLang && navLang.split('-')[0] || 'en';
            var settings = {
                locale,
            };

            if ($cookie) {
                var json = $cookie.get(cookieName);
                if (json) { try {
                    Object.assign(settings, JSON.parse(json), {
                        cookieName,
                    });
                } catch (e) {
                    this.warn(`Could not load cookie scv-settings:${json}`);
                }}
            }

            return new ScvSettings(settings);
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


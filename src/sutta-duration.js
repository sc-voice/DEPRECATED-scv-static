(function(exports) {
    const { logger } = require('log-instance');
    const { MerkleJson } = require('merkle-json');
    const examples = require('../api/examples.json');
    const SUID_DURATION_URL = [
        `https://raw.githubusercontent.com/sc-voice/sc-voice`,
        `master/src/assets/suid-duration.json`,
    ].join('/');

    class SuttaDuration {
        constructor(opts={}) {
            (opts.logger || logger).logInstance(this, opts);
            this.language = opts.language || 'en';
            this.voice = opts.voice || 'amy';
            this.axios = opts.axios;
        }

        async initialize() { try {
            if (this.initialized) { return this; }

            let {
                axios,
            } = this;
            let res = await axios.get(SUID_DURATION_URL);
            this.suidMap = res.data;
            this.initialized = true;
            return this;
        } catch(e) {
            this.warn(`initialize()`, e.message);
            throw e;
        }}

        duration(suid) {
            let {
                language,
                suidMap,
                voice,
            } = this;
            let langMap = suidMap[language] || {};
            let voiceMap = langMap[voice] || {};
            return voiceMap[suid]; // duration or undefined
        }

    }

    module.exports = exports.SuttaDuration = SuttaDuration;

})(typeof exports === "object" ? exports : (exports = {}));

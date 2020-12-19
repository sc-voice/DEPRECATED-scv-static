import BilaraWeb from '../src/bilara-web';
const examples = require('../api/examples.json');

var bilaraWeb;

export const DEFAULT = {
    get sutta() { return {
        titles: ['...'],
        lang: 'en',
        sutta_uid: '...',
        segments: [
            {scid: '...', pli: '...', en: '...'}
        ],
        examples,
    }}
}

export const state = () => ({
    search: '',
    searchResults: {},
    settings: {
        audio: 'ogg',
        fullLine: true,
        ips: 6,
        lang: 'en',
        locale: 'en',
        maxResults: 5,
        showId: false,
        showLang: 2,
        useCookies: true,
        vnameRoot: 'Aditi',
        vnameTrans: 'Amy',
    },
    sutta: DEFAULT.sutta,
    suttaHistory: [],
    examples: Object.assign({}, DEFAULT.examples),
    examplesLoaded: false,
})

export const mutations = {
    sutta(state, value) {
        Object.assign(state.sutta, DEFAULT.sutta, value);
        console.log(`$store.state.scv.sutta:`, value);
    },
    sutta_uid(state, value) {
        let { sutta_uid, lang, updateHistory=true } = value;
        Object.assign(state.sutta, DEFAULT.sutta, {sutta_uid});
        if (updateHistory) {
            let sh = state.suttaHistory.find(h=>h.sutta_uid === sutta_uid);
            let date = new Date();
            if (sh) {
                sh.date = date;
            } else {
                state.suttaHistory.push({ sutta_uid, date, lang, });
            }
            state.suttaHistory.sort((a,b)=>a.date-b.date);
        }
        console.log(`$store.state.scv.sutta_uid:`, value); 
    },
    search(state, value) {
        if (value !== state.search) {
            console.log(`$store.state.scv.search:`, value);
            state.search = value;
        }
    },
    searchResults(state, value) {
        state.searchResults = value;
        value.mlDocs.forEach(mld=>(mld.showDetails = false));
        console.log(`$store.state.scv.searchResults:`, value);
    },
    settings(state, value) {
        Object.assign(state.settings, value);
        console.log(`$store.state.scv.settings:`, value);
    },
    examples(state, value) {
        Object.assign(state.examples, value);
        console.log(`$store.state.scv.examples:`, value);
    },
    examplesLoaded(state, value){
        state.examplesLoaded = value;
        console.log(`$store.state.scv.examplesLoaded:`, value);
    },
}

export const actions = {
    async loadSutta (context, payload) {
        let { $axios: axios } = this;
        let { sutta_uid, lang='en', updateHistory } = payload;
        context.commit('sutta_uid', {sutta_uid, lang, updateHistory});

        if (!bilaraWeb) {
            bilaraWeb = new BilaraWeb({axios});
        }
        let sutta = await bilaraWeb.loadSutta({sutta_uid, lang});
        context.commit('sutta', sutta);
    },
    async loadExamples({state, commit}) {
        if (state.examplesLoaded) { return; }
        let { $axios: axios } = this;
        const GITHUB = 'https://raw.githubusercontent.com';
        let url = `${GITHUB}/sc-voice/scv-static/main/api/examples.json?s=store`;
        let eg = examples;
        try {
            let headers = { Accept: 'text/plain', };
            let res = await this.$axios.get(url, { headers, });
            eg = (typeof res.data === 'string') ? JSON.parse(res.data) : res.data;
            commit('examples', eg);
        } catch(e) {
            console.warn(`$store.state.scv.loadExamples()`,
                `using default examples:${Object.keys(eg)}`, 
                `${url} =>`, e.message);
        } finally {
            commit('examplesLoaded', true);
        }
    },
}

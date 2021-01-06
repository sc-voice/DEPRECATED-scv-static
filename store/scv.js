import BilaraWeb from '../src/bilara-web';
const examples = require('../api/examples.json');
import ScvSettings from '../src/scv-settings';

var bilaraWeb;

export const DEFAULT = {
    get sutta() { return {
        titles: ['...'],
        lang: 'en',
        sutta_uid: null,
        segments: [
            {scid: '...', pli: '...', en: '...'}
        ],
        examples,
    }}
}

export const state = () => ({
    search: '',
    searchResults: {},
    settings: Object.assign({}, new ScvSettings()),
    sutta: DEFAULT.sutta,
    suttaHistory: [],
    examples: Object.assign({}, DEFAULT.examples),
    examplesLoaded: false,
    voices: [],
})

export const mutations = {
    sutta(state, value) {
        Object.assign(state.sutta, DEFAULT.sutta, value);
        console.log(`$store.state.scv.sutta:`, value);
    },
    suttaRef(state, value) {
        let { sutta_uid, lang, updateHistory=true } = value;
        Object.assign(state.sutta, DEFAULT.sutta, {sutta_uid, lang});
        if (updateHistory) {
            let sh = state.suttaHistory
                .find(h=>h.sutta_uid===sutta_uid && h.lang===lang);
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
        value.showTrans === false && (state.settings.showPali = true);
        value.showPali === false && (state.settings.showTrans = true);
        console.log(`$store.state.scv.settings:`, value);
    },
    voices(state, value) {
        Object.assign(state.voices, value);
        console.log(`$store.state.scv.voices:`, value);
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
        $nuxt.$emit('scv-load-sutta', payload);
        let { sutta_uid, lang='en', updateHistory } = payload;
        context.commit('suttaRef', {sutta_uid, lang, updateHistory});
        bilaraWeb = bilaraWeb || new BilaraWeb({fetch});
        let sutta = await bilaraWeb.loadSutta({sutta_uid, lang});
        context.commit('sutta', sutta);
    },
    async loadExample ({commit, state}, payload) {
        let { pattern, lang=state.settings.lang } = payload;
        bilaraWeb = bilaraWeb || new BilaraWeb({fetch});
        if (pattern) {
            let value = await bilaraWeb.find({ pattern, lang, });
            value.mlDocs.forEach(mld=>{
                mld.segments = Object.keys(mld.segMap).map(scid=>mld.segMap[scid]);
            });
            commit('searchResults', value);
            commit('search', pattern);
            $nuxt.$emit('scv-load-example', payload);
        }
    },
    async loadExamples({state, commit}) {
        if (state.examplesLoaded) { return; }
        const GITHUB = 'https://raw.githubusercontent.com';
        let url = `${GITHUB}/sc-voice/scv-static/main/api/examples.json?s=store`;
        let eg = examples;
        try {
            let headers = { Accept: 'text/plain', };
            let res = await fetch(url, headers);
            eg = await res.json();
            commit('examples', eg);
        } catch(e) {
            console.warn(`$store.state.scv.loadExamples()`,
                `using default examples:${Object.keys(eg)}`, 
                `${url} =>`, e.message);
        } finally {
            commit('examplesLoaded', true);
        }
    },
    async loadVoices({state, commit}) {
        bilaraWeb = bilaraWeb || new BilaraWeb({fetch});
        let voices = await bilaraWeb.voices();
        commit('voices', voices);
    },
}

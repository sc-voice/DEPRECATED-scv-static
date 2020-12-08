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
})

export const mutations = {
    search(state, value) {
        state.search = value;
    },
    searchResults(state, value) {
        state.searchResults = value;
    },
    settings(state, value) {
        Object.assign(state.settings, value);
    },
}

export const state = () => {
    return {
        scv: {
            search: '',
            searchResults: {},
        },
    }
}

export const mutations = {
    scvSearch(state, value) {
        state.scv.search = value;
    },
    scvSearchResults(state, value) {
        state.scv.searchResults = value;
    },
}

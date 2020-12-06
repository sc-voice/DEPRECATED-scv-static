export const state = () => ({
    search: '',
    searchResults: {},
})

export const mutations = {
    search(state, value) {
        state.search = value;
    },
    searchResults(state, value) {
        state.searchResults = value;
    },
}

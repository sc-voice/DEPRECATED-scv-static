export const state = () => {
    return {
        scvSearchResults: {color:'red'},
    }
}

export const mutations = {
    scvSearchResults(state, value) {
        state.scvSearchResults = value;
    },
}

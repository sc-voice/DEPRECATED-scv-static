import Vue from "vue"

export default ({ app }, inject) => {
    let {
        language = 'noNavigator-noNavigator',
    } = navigator;
    inject('g', {
        language,
    });
}

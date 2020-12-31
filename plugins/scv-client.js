import Vue from "vue"
import VueCookie from "vue-cookie"

const COOKIE_NAME = 'scv-settings';
const COOKIE_SETTINGS = {
    expires: "100Y",
    SameSite: "Strict",
}

export default (context, inject) => {
    let {
        $vuetify,
        store,
        app,
    } = context;

    let $t = function(key) {
        if (/\./.test(key)) {
            key = key.startsWith('$vuetify') ? key : `$vuetify.${key}`;
        } else {
            key = `$vuetify.scv.${key}`;
        }
      return $vuetify && $vuetify.lang.t(key) || `$vuetify.lang.t(${key})`;
    }
    console.log(`scv-client: injecting $t`);
    inject('t', $t);
    console.log(`scv-client: injecting $cookie`);
    inject('cookie', VueCookie);

    let cookieJson = VueCookie.get(COOKIE_NAME);
    if (cookieJson) {
        let settings = JSON.parse(cookieJson);
        setTimeout(()=>{
            store.commit('scv/settings', settings);
            $vuetify.lang.current = settings.locale;
        },500);
    }

    store.subscribe((mutation,state) => {
        if (mutation.type === 'scv/settings') {
            let settings = state.scv.settings;
            $vuetify.lang.current = settings.locale;
            if (settings.useCookies) {
                console.log(`scv-client: setting cookie`, settings);
                VueCookie.set(COOKIE_NAME, JSON.stringify(settings), COOKIE_SETTINGS);
            } else {
                console.log(`scv-client: clearing cookie`, settings);
                VueCookie.delete(COOKIE_NAME);
            }
        }
    });


}

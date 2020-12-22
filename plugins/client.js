import Vue from "vue"
import VueCookie from "vue-cookie"

export default (context, inject) => {
    let {
        $vuetify,
        store,
    } = context;

    let $t = function(key) {
        if (/$vuetify/.test(key)) {
            // fully qualified
        } else if (/\./.test(key)) {
            key = `$vuetify.${key}`;
        } else {
            key = `$vuetify.scv.${key}`;
        }
      return $vuetify
        ? $vuetify.lang.t(key)
        : `$vuetify.lang.t(${key})`;
    }
    inject('t', $t);
    inject('cookie', VueCookie);

    store.subscribe((mutation,state) => {
        if (mutation.type === 'scv/settings') {
            const COOKIE_NAME = 'scv-settings';
            let settings = state.scv.settings;
            $vuetify.lang.current = settings.locale;
            if (settings.useCookies) {
                console.log(`dbg setting cookie`, settings);
                VueCookie.set(COOKIE_NAME, JSON.stringify(settings));
            } else {
                console.log(`dbg clearing cookie`, settings);
                VueCookie.delete(COOKIE_NAME);
            }
        }
    });


}

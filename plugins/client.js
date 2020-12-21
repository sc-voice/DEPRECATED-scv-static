import Vue from "vue"
import VueCookie from "vue-cookie"

export default (context, inject) => {
    let $t = function(key) {
        let { 
            $vuetify,
        } = this;
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
}

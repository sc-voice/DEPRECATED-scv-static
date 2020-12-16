import Vue from 'vue'
import 'vue-material-design-icons/styles.css'
import Cog from 'vue-material-design-icons/Cog.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

export default function materialIcons () {
    Vue.component('cog-icon', Cog);
    Vue.component('chevron-right', ChevronRight);
    Vue.component('chevron-left', ChevronLeft);
}

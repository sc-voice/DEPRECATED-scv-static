import Vue from 'vue'
import 'vue-material-design-icons/styles.css'

import AppsIcon from 'vue-material-design-icons/Apps.vue'
import CellphoneIcon from 'vue-material-design-icons/Cellphone.vue'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import MonitorIcon from 'vue-material-design-icons/Monitor.vue'

export default function materialIcons () {
    Vue.component('apps-icon', AppsIcon);
    Vue.component('Cellphone-icon', CellphoneIcon);
    Vue.component('chevron-left-icon', ChevronLeftIcon);
    Vue.component('chevron-right-icon', ChevronRightIcon);
    Vue.component('cog-icon', CogIcon);
    Vue.component('home-icon', HomeIcon);
    Vue.component('Monitor-icon', MonitorIcon);

}

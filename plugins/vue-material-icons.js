import Vue from 'vue'
import 'vue-material-design-icons/styles.css'

import AppsIcon from 'vue-material-design-icons/Apps.vue'
import CellphoneIcon from 'vue-material-design-icons/Cellphone.vue'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue'
import FormatAlignJustify from 'vue-material-design-icons/FormatAlignJustify.vue'
import FormatColumns from 'vue-material-design-icons/FormatColumns.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import MonitorIcon from 'vue-material-design-icons/Monitor.vue'
import RobotOutlineIcon from 'vue-material-design-icons/RobotOutline.vue'
import VolumeHighIcon from 'vue-material-design-icons/VolumeHigh.vue'

export default function materialIcons () {
    Vue.component('apps-icon', AppsIcon);
    Vue.component('cellphone-icon', CellphoneIcon);
    Vue.component('chevron-left-icon', ChevronLeftIcon);
    Vue.component('chevron-right-icon', ChevronRightIcon);
    Vue.component('cog-icon', CogIcon);
    Vue.component('dots-horizontal-icon', DotsHorizontalIcon);
    Vue.component('format-align-justify-icon', FormatAlignJustify);
    Vue.component('format-columns-icon', FormatColumns);
    Vue.component('home-icon', HomeIcon);
    Vue.component('menu-icon', MenuIcon);
    Vue.component('monitor-icon', MonitorIcon);
    Vue.component('robot-outline-icon', RobotOutlineIcon);
    Vue.component('volume-high-icon', VolumeHighIcon);

}

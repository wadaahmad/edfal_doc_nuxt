/* Set up using Vue 2 */
import Vue from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faTrashCan,
    faPencil,
    faCirclePlus,
    faPowerOff,
    faFire,
    faRobot,
    faSortAlphaDown

} from '@fortawesome/free-solid-svg-icons'

import {
    faTrashCan as faTrashLight,
    faUser as faUserLight,
} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
    faFire,
    faTrashCan,
    faTrashLight,
    faUserLight,
    faPencil,
    faCirclePlus,
    faPowerOff,
    faRobot,
    faSortAlphaDown
)

/* add font awesome icon component */
Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false
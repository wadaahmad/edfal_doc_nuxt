
import Vue from "vue";
import Vue2Editor from "vue2-editor";
import { Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import QuillBetterTable from 'quill-better-table'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/better-table', QuillBetterTable)
Vue.use(Vue2Editor);
<template>
  <form ref="form">
    <b-row>
      <b-col sm="3" md="3" class="my-1">
        <label class="typo__label">File</label>
      </b-col>
      <b-col sm="9" md="9" class="my-1">
        <b-form-file v-model="file"></b-form-file>
      </b-col>
    </b-row>
    <div class="mt-4">
      <b-button variant="primary" @click="importExcel" class="btn-main"
        ><i class="fa fa-send"></i> Import Excel
      </b-button>
      <b-button
        variant="primary"
        v-if="urlTemplate != null"
        @click="templateExcel"
        class="btn-main"
        ><i class="fa fa-send"></i> Download Template
      </b-button>
    </div>
  </form>
</template>
<script>
var FileSaver = require('file-saver')
export default {
  data() {
    return {
      file: '',
    }
  },
  props: {
    templateName: {
      type: String,
      default: 'Template',
    },
    urlImporter: {
      type: String,
      required: true,
    },
    urlTemplate: String,
  },
  methods: {
    templateExcel() {
      var fileName =
        'template_' + this.templateName + '_' + new Date().getTime() + '.xlsx'
      return this.$axios
        .$get(
          'schools/' + this.$store.state.schoolId + '/' + this.urlTemplate,
          { responseType: 'blob' }
        )
        .then((res) => {
          FileSaver.saveAs(res, fileName)
        })
    },
    async importExcel() {
      if (this.file == '') {
        this.$bvModal.msgBoxOk('Mohon isi File', {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        })
      } else {
        //console.log(this.imports.file)
        // let data = null;
        // var files = e.target.files || e.dataTransfer.files
        var formData = new FormData()
        formData.append('file_excel', this.file)
        await this.$axios
          .$post(
            'schools/' + this.$store.state.schoolId + '/' + this.urlImporter,
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data; boundary=' + formData._boundary,
              },
            }
          )
          .then((res) => {
            $nuxt.$bvToast.toast('data berhasil terimport', {
              title: 'Success.',
              variant: 'primary',
              solid: true,
            })
            this.$emit('store', true)
          })
          .catch((error) => {
            if (error) {
              error.response.data.message.forEach((element) => {
                $nuxt.$bvToast.toast(element, {
                  title: 'Failed save',
                  variant: 'danger',
                  solid: true,
                })
              })
            }
            this.$emit('store', false)
          })
      }
    },
  },
}
</script>
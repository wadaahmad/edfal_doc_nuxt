import { $axios } from '~/utils/api'

export function useImageApi() {
  async function uploadImage(file: any): Promise<any> {

    let { image_host, image_user, image_pass } = useNuxtApp().nuxt2Context.$config
    // console.log(ctx.$config.public)
    var formData = new FormData()
    if (Array.isArray(file)) {
      file.forEach((value, index) => {
        formData.append('images[]', value)
      })
    } else {
      formData.append('images', file)
    }
    return await $axios
      .$post(image_host + '/image', formData, {
        headers: {
          'Content-Type':
            'multipart/form-data;'
        },
        auth: {
          username: image_user,
          password: image_pass
        }
      })
  }
  return {
    uploadImage
  }
}
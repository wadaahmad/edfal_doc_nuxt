import { useImageApi } from "./imageApi"

export function useImageRepo() {
  let { image_host, image_user, image_pass } = useNuxtApp().nuxt2Context.$config
  async function handleImageAdded(file: any, Editor: any, cursorLocation: any, resetUploader: any) {
    const imageApi = useImageApi()
    // An example of using FormData
    // NOTE: Your key could be different such as:
    // formData.append('file', file)
    var upload = await imageApi.uploadImage(file)
    let url = upload.data.url
    Editor.insertEmbed(cursorLocation, 'image', url)
    resetUploader()

  }
  function getThumbnail(imgUrl: any) {
    return imgUrl.replace('/images', '/images/thumbnails')
  }

  return {
    handleImageAdded,
    getThumbnail,
    image_host,
    image_user,
    image_pass
  }
}
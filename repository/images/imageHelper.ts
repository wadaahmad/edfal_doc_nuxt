export class imageHelper {
    static getThumbnail(imgUrl: any) {
        return imgUrl.replace('/images', '/images/thumbnails')
    }
}
import { useProductApi } from "./repository/productApi";
import { product } from "./type/product";

export function useProductRepo() {
    const productApi = useProductApi()
    const activeProduct = computed(() => productApi.active_product)
    function setActiveProduct(product: product){
        // console.log('masuk')
        productApi.$patch({
            active_product: product
        })
        // console.log(activeProduct.value)
    }
    return {
        activeProduct,
        setActiveProduct
    }
}
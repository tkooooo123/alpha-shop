import { apiHelper } from "../utils/helpers";


export default {
    getProducts({ page, categoryId, keyword}) {
        const searchParams = new URLSearchParams({ page, categoryId, keyword: keyword || ''})
        return apiHelper.get(`/products?${searchParams.toString()}`)
    },
    getProduct({ productId }) {
        return apiHelper.get(`/products/${productId}`)
    },
    getCategories() {
        return apiHelper.get('/categories')
    }
}
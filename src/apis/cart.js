import { apiHelper } from "../utils/helpers";


export default {
    postCart({ productId, quantity, cartId }) {
        return apiHelper.post('/carts', { productId, quantity, cartId })
    },
    getCart ({ cartId }) {
        return apiHelper.get(`/carts?cartId=${cartId}`)
    }
}
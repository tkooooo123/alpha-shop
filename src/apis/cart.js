import { apiHelper } from "../utils/helpers";


export default {
    postCart({ productId, quantity, cartId }) {
        return apiHelper.post('/carts', { productId, quantity, cartId })
    },
    getCart ({ cartId }) {
        return apiHelper.get(`/carts?cartId=${cartId}`)
    },
    addCartItem({id}) {
        return apiHelper.post(`/carts/cartItem/${id}/add`)
    },
    subCartItem({id}) {
        return apiHelper.post(`/carts/cartItem/${id}/sub`)
    },deleteCartItem({id}) {
        return apiHelper.delete(`/carts/cartItem/${id}/delete`)
    },
}
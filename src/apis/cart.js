import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
    postCart({ productId, quantity, cartId }) {
        return apiHelper.post('/carts', { productId, quantity, cartId }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getCart () {
        return apiHelper.get(`/carts`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    addCartItem({id}) {
        return apiHelper.post(`/carts/cartItem/${id}/add`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    subCartItem({id}) {
        return apiHelper.post(`/carts/cartItem/${id}/sub`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },deleteCartItem({id}) {
        return apiHelper.delete(`/carts/cartItem/${id}/delete`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
}
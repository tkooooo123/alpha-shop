import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
    getOrders() {
        return apiHelper.get('/orders', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    postOrder({
        userId,
        cartId,
        name,
        email,
        phone,
        address,
        amount,
        shipping_status,
        payment_status
    }) {
        return apiHelper.post('/orders', {
            userId,
            cartId,
            name,
            email,
            phone,
            address,
            amount,
            shipping_status,
            payment_status
        }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
   
}
import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
    getProducts() {
        return apiHelper.get('/admin/products',{
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    getProduct({id}) {
        return apiHelper.get(`/admin/products/${id}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    putProduct({id, formData}) {
        return apiHelper.put(`/admin/products/${id}`, formData
        )
    },
    postProduct({formData}) {
        return apiHelper.post('/admin/product', formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })

    },
    deleteProduct({id}) {
        return apiHelper.delete(`/admin/products/${id}/delete`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
    },
    
}
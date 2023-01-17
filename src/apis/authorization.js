import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('token')
export default {
    signIn({ email, password }) {
        return apiHelper.post('/signin', {
            email,
            password
        })
    },
    signUp({ name, email, password, confirmPassword}) {
        return apiHelper.post('/signup', {
            name,
            email,
            password,
            confirmPassword
        })
    },
    getCurrentUser() {
        return apiHelper.get('/users/getCurrentUser', {
            headers: { Authorization: `Bearer ${getToken()}` }
        })

    }
}
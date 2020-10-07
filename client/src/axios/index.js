import axios from 'axios'

if(localStorage.getItem('token')){
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
}

export default axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});
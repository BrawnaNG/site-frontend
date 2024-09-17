import axios from 'axios';
import App from 'vue';
//
App.axios = axios;
App.axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"

let token = localStorage.getItem('csrf-token')

if (token) {
    App.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
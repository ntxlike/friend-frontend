import axios from "axios";

const isDEV = process.env.NODE_ENV === 'development';

const Axios = axios.create({
    baseURL: isDEV ? 'http://localhost:8080/api/' :  'http://8.138.35.138:8080/api/',
    // baseURL: 'http://8.138.35.138:8080/api/',
    withCredentials: true,
});

// Axios.defaults.withCredentials = true;

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response?.data?.code === 40100) {
        window.location.href = '/login'
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default Axios;
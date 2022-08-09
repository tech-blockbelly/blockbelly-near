// import axios from 'axios';

// const baseURL = `${process.env.REACT_APP_API_URL}/api/`;

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     headers: {
//         Authorization: localStorage.getItem('access')
//             ? 'JWT ' + localStorage.getItem('access')
//             : null,
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//     },
// });

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async function (error) {
//         const originalRequest = error.config;

//         if (typeof error.response === 'undefined') {
//             alert(
//                 'A server/network error occurred. ' +
//                     'Looks like CORS might be the problem. ' +
//                     'Sorry about this - we will get it fixed shortly.',
//             );
//             return Promise.reject(error);
//         }

//         if (
//             error.response.status === 401 &&
//             originalRequest.url === baseURL + 'auth/jwt/refresh/'
//         ) {
//             console.log('Redirect to Login');
//             window.location.href = '/login/';
//             return Promise.reject(error);
//         }

//         if (
//             error.response.data.code === 'token_not_valid' &&
//             error.response.status === 401 &&
//             error.response.statusText === 'Unauthorized'
//         ) {
//             const refreshToken = localStorage.getItem('refresh');

//             if (refreshToken) {
//                 const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

//                 // exp date in token is expressed in seconds, while now() returns milliseconds:
//                 const now = Math.ceil(Date.now() / 1000);
//                 console.log(tokenParts.exp);

//                 if (tokenParts.exp > now) {
//                     return axiosInstance
//                         .post('/token/refresh/', {
//                             refresh: refreshToken,
//                         })
//                         .then((response) => {
//                             localStorage.setItem(
//                                 'access',
//                                 response.data.access,
//                             );
//                             localStorage.setItem(
//                                 'refresh',
//                                 response.data.refresh,
//                             );

//                             axiosInstance.defaults.headers['Authorization'] =
//                                 'JWT ' + response.data.access;
//                             originalRequest.headers['Authorization'] =
//                                 'JWT ' + response.data.access;

//                             return axiosInstance(originalRequest);
//                         })
//                         .catch((err) => {
//                             console.log(err);
//                         });
//                 } else {
//                     console.log(
//                         'Refresh token is expired',
//                         tokenParts.exp,
//                         now,
//                     );
//                     console.log('Redirect to Login');
//                     window.location.href = '/login/';
//                 }
//             } else {
//                 console.log('Refresh token not available.');
//                 window.location.href = '/login/';
//             }
//         }

//         // specific error handling done elsewhere
//         return Promise.reject(error);
//     },
// );

// export default axiosInstance;

import axios from 'axios';

import { toast } from 'react-toastify';

const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

let axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: localStorage.getItem('access')
            ? 'JWT ' + localStorage.getItem('access')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

function updateInterceptors() {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            console.log('Interceptor Error', error.response);
            if (typeof error.response === 'undefined') {
                alert(
                    'A server/network error occurred. ' +
                        'Looks like CORS might be the problem. ' +
                        'Sorry about this - we will get it fixed shortly.',
                );
                return Promise.reject(error);
            }

            if (
                error.response.status === 401 &&
                originalRequest.url === API_URL + 'auth/jwt/refresh/'
            ) {
                console.log('Redirect to Login');
                window.location.href = '/login/';
                return Promise.reject(error);
            }

            if (
                error.response.data.code === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === 'Unauthorized'
            ) {
                const refreshToken = localStorage.getItem('refresh');

                if (refreshToken) {
                    const tokenParts = JSON.parse(
                        atob(refreshToken.split('.')[1]),
                    );

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                            .post('/token/refresh/', {
                                refresh: refreshToken,
                            })
                            .then((response) => {
                                localStorage.setItem(
                                    'access',
                                    response.data.access,
                                );
                                localStorage.setItem(
                                    'refresh',
                                    response.data.refresh,
                                );

                                axiosInstance.defaults.headers[
                                    'Authorization'
                                ] = 'JWT ' + response.data.access;
                                originalRequest.headers['Authorization'] =
                                    'JWT ' + response.data.access;

                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        console.log(
                            'Refresh token is expired',
                            tokenParts.exp,
                            now,
                        );
                        console.log('Redirect to Login');
                        window.location.href = '/login/';
                    }
                } else {
                    console.log('Refresh token not available.');
                    window.location.href = '/login/';
                }
            }

            toast.error(error.response.data.msg);

            // specific error handling done elsewhere
            return Promise.reject(error);
        },
    );
}

export function updateAPIClient() {
    axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: localStorage.getItem('access')
                ? 'JWT ' + localStorage.getItem('access')
                : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    });

    updateInterceptors();
}

export function getAPIClient() {
    if (!axiosInstance) {
        updateAPIClient();
    }
    return axiosInstance;
}

getAPIClient();

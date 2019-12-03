import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "3deece36-1a9f-4527-9a42-03c4ade7f957"
    }
});


export const usersAPI = {
    async getUsers(requiredPage, pageSize) {
        const response = await instance.get(`users?page=${requiredPage}&count=${pageSize}`);
        return response.data;
    },

    async unFollowUser(id) {
        const response = await instance.delete(`/follow/${id}`);
        return response.data;
    },
    async followUser(id) {
        const response = await instance.post(`/follow/${id}`, {});
        return response.data;
    },

    getUserProfileById(userId) {
        console.warn("Obsolete method. Please, use profileApi object.");
        return profileAPI.getUserProfileById(userId);
    },
};
export const profileAPI = {
    getUserProfileById(userId) {
        return instance.get(`/profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status});
    },
    uploadPhoto(formData) {
        return instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    }
};

export const loginAPI = {
    login(data) {
        return instance.post(`auth/login`, {
            email: data.login,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        });
    },
    logOut() {
        return instance.delete(`auth/login`);
    }
};
export const authAPI = {
    async getMyUserData() {
        const response = await instance.get(`/auth/me`);
        return response.data;
    },
};
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
};
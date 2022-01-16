/* eslint-disable */
import axios from "axios";

const getInstance = () => {
    const instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_HOST}/api`,
        withCredentials: true,
        timeout: 30000,
    });
    return instance;
};

export default {
    auth: {
        register: (data) => getInstance().post("auth/register", data),
        login: (data) => getInstance().post("auth/login", data),
        logout: () => getInstance().get("auth/logout"),
        forgotPassword: (data) =>
            getInstance().post("auth/forgot-password", data),
        resetPassword: (data) =>
            getInstance().post("auth/reset-password", data),
        getUser: () => getInstance().get("auth/user"),
        updateUser: (id,plan) => getInstance().get("auth/change-plan/"+id+"/"+plan),
    },
    project: {
        openProject: (data) => getInstance().get("project/open"),
        getAllProjects: () => getInstance().get("project/allProjects"),
        createProject: (data) =>
            getInstance().post("project/createProject", data),
        updateProject: (id, data) =>
            getInstance().post("project/updateProject/" + id, data),
        deleteProject: (id) => getInstance().post("project/delete/" + id),
    },
    builder: {
        getFileAccessToken: (id) =>
            getInstance().get("builder/getFileAccessToken/" + id),
    },
};

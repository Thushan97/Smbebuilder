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
    },
    project: {
        openProject: (data) => getInstance().get("project/open"),
    },
    plan: {
        addPaln: (data) => getInstance().post("plan/createPlan", data),
    },
    template: {
        getTemplates: () => getInstance().get("templates")
    }
};

export const AUTH_SET_LOGGED_IN = "AUTH_SET_LOGGED_IN";
export const AUTH_SET_LOGGED_OUT = "AUTH_SET_LOGGED_OUT";


export function setLogin(auth) {
    return {
        type: AUTH_SET_LOGGED_IN,
        auth
    };
};

export function setLogout() {
    return {
        type: AUTH_SET_LOGGED_OUT
    };
};

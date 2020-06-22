export const getUserInfo = (state) => {
    return {
        userEmail: state.user.userEmail,
        userName: state.user.userName,
        userSecondName: state.user.userSecondName,
        userLanguage: state.user.userLanguage,
        userPhone: state.user.userPhone,
    };
};
export const getUserIsLoading = (state) => {
    return state.user.isLoading;
};

export const getUserSuccessUserGetInfo = (state) => {
    return state.user.successUserGetInfo;
};

export const getUsererror = (state) => {
    return state.user.error;
};

export class StaticData{
    static isRouteGuardEnabled = true;

    static apiBaseUrl = "http://localhost:8080";
    // static apiBaseUrl = "http://192.168.57.82:8080";

    // smtp-controller
    static smtpMarkSelectedPutUrl = this.apiBaseUrl+"/smtp/mark-selected"; //put: /smtp/mark-selected
    static smtpEditByIdPutUrl = this.apiBaseUrl+"/smtp/edit/{id}"; //put: /smtp/edit/{id}
    static smtpAddPostUrl = this.apiBaseUrl+"/smtp/add"; // post: /smtp/add
    static smtpGetGetUrl = this.apiBaseUrl+"/smtp/get/{id}"; // get: /smtp/get/{id}
    static smtpGetAllGetUrl = this.apiBaseUrl+"/smtp/get-all"; // get: /smtp/get-all
    static smtpDeleteDeleteUrl = this.apiBaseUrl+"/smtp/delete/{id}"; // del: /smtp/delete/{id}

    // user-controller
    static userProfilePicPostUrl = this.apiBaseUrl+"/user/profile-pic"; // post: /user/profile-pic
    static useruserInfoGetUrl = this.apiBaseUrl+"/user/user-info/{userIdStr}"; // get: /user/user-info/{userIdStr}
    static userCurrentGetUrl = this.apiBaseUrl+"/user/current"; // get: /user/current
    static userAllGetUrl = this.apiBaseUrl+"/user/all"; // get: /user/all

    // role-controller
    static roleCreatePostUrl = this.apiBaseUrl+"/role/create"; // post: /role/create
    static roleAllRoleGetUrl = this.apiBaseUrl+"/role/all-roles"; // get: /role/all-roles

    // registration-controller
    static registerUserPostUrl = this.apiBaseUrl+"/register/user"; // post: /register/user
    static registerUsernameAvailableGetUrl = this.apiBaseUrl+"/register/username-available/{username}"; // get: /register/username-available/{username}
    static registerHasEmailBeenInUseGetUrl = this.apiBaseUrl+"/register/has-email-been-in-use/{email}"; // get: /register/has-email-been-in-use/{email}
    static registeEmailInUseGetUrl = this.apiBaseUrl+"/register/email-in-use/{email}"; // get: /register/email-in-use/{email}

    // password-update-controller
    static passwordUpdateUserPostUrl = this.apiBaseUrl+"/password-update/user"; // post: /password-update/user

    // jwt-controller
    static jwtLoginPostUrl = this.apiBaseUrl+"/jwt/login"; // post: /jwt/login
    static jwtActivatePostUrl = this.apiBaseUrl+"/jwt/activate"; // post: /jwt/activate

    // email-verification-controller
    static emailVerifyPostUrl = this.apiBaseUrl+"/email/verify-email"; // post: /email/verify-email
    static emailSecurityCodePostUrl = this.apiBaseUrl+"/email/security-code"; // post: /email/security-code

    // image-controller
    static imageProfilePicGetUrl = this.apiBaseUrl+"/image/profile-pic/{id}"; // get: /image/profile-pic/{id}

}
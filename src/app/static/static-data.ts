export class StaticData{
    static isRouteGuardEnabled = true;

    static baseUrl = 
    "http://localhost:8080";
    // "http://192.168.1.6:8080";

    // smtp-controller
    static smtpMarkSelectedPutUrl = this.baseUrl+"/smtp/mark-selected"; //put: /smtp/mark-selected
    static smtpEditByIdPutUrlB = this.baseUrl+"/smtp/edit/{id}"; //put: /smtp/edit/{id}
    static smtpAddPostUrl = this.baseUrl+"/smtp/add"; // post: /smtp/add
    static smtpGetGetUrlB = this.baseUrl+"/smtp/get/{id}"; // get: /smtp/get/{id}
    static smtpGetAllGetUrl = this.baseUrl+"/smtp/get-all"; // get: /smtp/get-all
    static smtpDeleteDeleteUrlB = this.baseUrl+"/smtp/delete/{id}"; // del: /smtp/delete/{id}

    // user-controller
    static userProfilePicPostUrl = this.baseUrl+"/user/profile-pic"; // post: /user/profile-pic
    static useruserInfoGetUrlB = this.baseUrl+"/user/user-info/{userIdStr}"; // get: /user/user-info/{userIdStr}
    static userCurrentGetUrl = this.baseUrl+"/user/current"; // get: /user/current
    static userAllGetUrl = this.baseUrl+"/user/all"; // get: /user/all

    // role-controller
    static roleCreatePostUrl = this.baseUrl+"/role/create"; // post: /role/create
    static roleAllRoleGetUrl = this.baseUrl+"/role/all-roles"; // get: /role/all-roles

    // registration-controller
    static registerUserPostUrl = this.baseUrl+"/register/user"; // post: /register/user
    static registerUsernameAvailableGetUrlB = this.baseUrl+"/register/username-available/{username}"; // get: /register/username-available/{username}
    static registerHasEmailBeenInUseGetUrlB = this.baseUrl+"/register/has-email-been-in-use/{email}"; // get: /register/has-email-been-in-use/{email}
    static registeEmailInUseGetUrlB = this.baseUrl+"/register/email-in-use/{email}"; // get: /register/email-in-use/{email}

    // password-update-controller
    static passwordUpdateUpdatePostUrl = this.baseUrl+"/password-update/update"; // post: /password-update/update
    static passwordUpdateSendSecurityCodePostUrl = this.baseUrl+"/password-update/send-security-code"; // post: /password-update/send-security-code

    // jwt-controller
    static jwtLoginPostUrl = this.baseUrl+"/jwt/login"; // post: /jwt/login

    // email-verification-controller
    static emailVerifyPostUrl = this.baseUrl+"/email/verify-email"; // post: /email/verify-email
    static emailSecurityCodePostUrl = this.baseUrl+"/email/security-code"; // post: /email/security-code

    // image-controller
    static imageProfilePicGetUrlB = this.baseUrl+"/image/profile-pic/{id}"; // get: /image/profile-pic/{id}

}
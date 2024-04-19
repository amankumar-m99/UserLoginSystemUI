export class RegistrationFormModel{
    accountDetails = {
        "username":"",
        "email":"",
        "password":"",
        "promotionalMails":true,
    };
    personalDetails = {
        "firstName":"",
        "middleName":"",
        "lastName":"",
        "gender":"",
        "country":"",
        "dateOfBirth":""
    };
    securityDetails = {
        "recoveryEmail":"",
        "recoveryPhone":"",
        "sequrityQuestion":"",
        "sequrityAnswer":"",
        "loginAlert":true,
        "passwordChangeAlert":true,
        "twoStepLogin":false,
    };
}
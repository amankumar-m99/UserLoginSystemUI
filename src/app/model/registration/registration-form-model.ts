import { AccountDetails } from "./account-details.model";
import { PersonalDetails } from "./personal-details.model";
import { SecurityDetails } from "./security-details.model";

export class RegistrationFormModel{
    public accountDetails = new AccountDetails();
    public personalDetails = new PersonalDetails();
    public securityDetails = new SecurityDetails();
}
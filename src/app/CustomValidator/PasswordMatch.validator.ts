import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom validator function that checks if the password and confirm password fields match.
 * @param complexPassword (Optional) Indicates whether to perform additional validation to check if the password contains the user's name. Default is false.
 * @returns A validator function that returns a `ValidationErrors` object if the password and confirm password fields do not match, otherwise null.
 */
export function passwordMatch(complexPassword: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nameControl = control.get("fullName");
    const passControl = control.get("password");
    const confirmPassControl = control.get("confirmPassword");

    // If any of the controls or their values are missing, return null (no validation error)
    if (!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value) {
      return null;
    }

    // If complexPassword is false and the nameControl and password value are present and the password contains the name, return a validation error
    if (!complexPassword && nameControl && nameControl.value && passControl.value.includes(nameControl.value)) {
      return { passwordContainsName: true };
    }

    // Create a validation error object with the password and confirm password values
    const validationError: ValidationErrors = { 'UnmatchedPassword': { 'pass': passControl.value, 'confirmPassword': confirmPassControl.value } };

    // Return null if the password and confirm password values match (no validation error), otherwise return the validation error object
    return (passControl.value === confirmPassControl.value) ? null : validationError;
  };
}

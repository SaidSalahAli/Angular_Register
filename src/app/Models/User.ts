// Represents a user entity with relevant properties
export interface User {
    fullName: string; // User's full name
    email: string; // User's email address
    phoneNo: string; // User's phone number
    address: {
      city: string; // City where the user resides
      postalCode: string; // Postal code of the user's address
      street: string; // Street name of the user's address
    };
    password: string; // User's password
    confirmPassword: string; // Confirmation of the user's password
  }
// export Function to validate first name
export function validateFirstName(firstName) {
  return /^[a-zA-Z]{3,15}$/.test(firstName);
}

// export Function to validate last name
export function validateLastName(lastName) {
  return /^[a-zA-Z]{3,15}$/.test(lastName);
}

// export Function to validate phone number
export function validatePhoneNumber(phoneNumber) {
  return /^\d{10}$/.test(phoneNumber);
}

// export Function to validate email
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// export Function to validate date of birth
export function validateDOB(dob) {
  return /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/.test(dob);
}

// export Function to validate address
export function validateAddress(address) {
  address.trim();
  return address.length <= 100;
}

// export Function to validate PIN
export function validatePIN(pin) {
  return /^\d{4}$/.test(pin);
}

export function validateSignupForm(warnings) {
  return Boolean(
    warnings.address === "" &&
      warnings.dob === "" &&
      warnings.email === "" &&
      warnings.firstName === "" &&
      warnings.lastName === "" &&
      warnings.phoneNumber === "" &&
      warnings.pin === ""
  );
}

export function validateSigninForm(warnings) {
  return Boolean(warnings.phoneNumber === "" && warnings.pin === "");
}

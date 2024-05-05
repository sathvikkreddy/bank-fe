// export Function to validate first name
export function validateFirstName(firstName) {
  return /^[a-zA-Z\s]{3,15}$/.test(firstName);
}

// export Function to validate last name
export function validateLastName(lastName) {
  return /^[a-zA-Z\s]{3,15}$/.test(lastName);
}

export function validateFatherName(fatherName) {
  return /^[a-zA-Z\s]{3,30}$/.test(fatherName);
}

// export Function to validate phone number
export function validatePhoneNumber(phoneNumber) {
  return /^\d{10}$/.test(phoneNumber);
}

export function validateAadhar(aadhar) {
  return /^\d{12}$/.test(aadhar);
}

// export Function to validate email
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePan(pan) {
  pan.trim();
  return pan.length === 10;
}

// export Function to validate date of birth
export function validateDOB(dob) {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dob);
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

export function validateGender(gender) {
  let isValidGender = false;
  if (gender === "Male" || gender === "Female" || gender === "Others")
    isValidGender = true;
  return isValidGender;
}

export function validateSignupForm(warnings) {
  let isValidForm = true;
  for (let key in warnings) {
    if (warnings[key] !== "") {
      isValidForm = false;
    }
  }
  return isValidForm;
}

export function validateSigninForm(warnings) {
  let isValidForm = true;
  for (let key in warnings) {
    if (warnings[key] !== "") {
      isValidForm = false;
    }
  }
  return isValidForm;
}

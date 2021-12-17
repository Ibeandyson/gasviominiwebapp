const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data._id)) {
    errors._id = "Id is required";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Namae is required";
  }
 
  if (Validator.isEmpty(data.cylinderAge)) {
    errors.cylinderAge = "Cylinder Age is required";
  }
  if (Validator.isEmpty(data.cylinderSize)) {
    errors.cylinderSize = "Cylinder size is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

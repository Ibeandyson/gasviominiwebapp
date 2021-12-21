const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSaleGasInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.refillKg)) {
    errors.refillKg = "RefillKg Name is required";
  }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

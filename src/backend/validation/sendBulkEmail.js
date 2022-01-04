const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSendBulkEmailsInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject is required";
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = "Message is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

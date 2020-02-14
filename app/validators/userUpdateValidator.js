const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function userUpdateValidator(data) {

  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';

  if(Validator.isEmpty(data.fullName)) {
    errors.fullName = "User full name is required";
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = "Email ID is required";
  }

  if(Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact number is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
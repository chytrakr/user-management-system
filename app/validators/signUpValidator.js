const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function signUpValidator(data) {

  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.userId = !isEmpty(data.userId) ? data.userId : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';

  if(Validator.isEmpty(data.fullName)) {
    errors.fullName = "User full name is required";
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if(Validator.isEmpty(data.userId)) {
    errors.userId = "User ID is required";
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
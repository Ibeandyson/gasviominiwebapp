const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {}

    // // converting empty firlds to a string so we can use validator functions
    // data.email = !isEmpty(data.email) ? data.email: "";
    // data.phone = !isEmpty(data.phone) ? data.phone: "";
    // data.address = !isEmpty(data.address) ? data.address: "";
    // data.firstName = !isEmpty(data.firstName) ? data.firstName: ""
    // data.lastName = !isEmpty(data.lastName) ? data.lasttName: ""
    // data.password = !isEmpty(data.password) ? data.password: "";
    // data.password2 = !isEmpty(data.password2) ? data.password2: "";
    // data.role = !isEmpty(data.role) ? data.password2: "";

  
    if (Validator.isEmpty(data.email)){
        errors.email = "email can not be empty";
    }else if (!Validator.isEmail(data.email)){
        errors.email = "email is invalid";
    }
    if(Validator.isEmpty(data.address)){
        errors.address = "address can not be empty";
    }
    if (Validator.isEmpty(data.phone)){
        errors.phone = "phone can not be empty";
    }
  
    if (Validator.isEmpty(data.firstName)){
        errors.firstName = "first name can not empty";
    }
    if (Validator.isEmpty(data.lastName)){
        errors.lastName = "last name can not empty";
    }
    if (Validator.isEmpty(data.role)){
        errors.role = "role can not be empty"
    }
    if (Validator.isEmpty(data.password)){
        errors.password = "password can not be empty"
    }
    if (Validator.isEmpty(data.password2)){
        errors.password2 = "comfirm password  is required";
    }
    if (!Validator.isLength(data.password, {min:8, max:30})){
        errors.password = "password must be least 8 characters";
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password= "passwords must match";
    }
    return{
        errors,
        isValid:isEmpty(errors)
    };
};
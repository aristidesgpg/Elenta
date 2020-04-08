import * as React from "react";


const SignUpForm = () => {
  function validate({password}, errors) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/.test(password)) {
      errors.password.addError("Password must contain minimum eight characters, at least one number character and both uppercase and lowercase letters.");
    }
    return errors;
  }

  return (<div>Sign up</div>)
};

export default SignUpForm;
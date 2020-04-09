import React, {useState} from "react";
import axios from "axios";
import Form from "react-jsonschema-form";
import {Alert, Button, Col} from "react-bootstrap";
import {validateEmail} from "../../../utils/utils";
import ErrorListTemplate from "./ErrorListTemplate";

const validate = ({name_email: {email, name}, passwords: {password, password_confirmation}}, errors) => {
  if (!validateEmail(email)) {
    errors.name_email.email.addError(`${email} is not a valid email.`);
  }

  if (!name) {
    errors.name_email.name.addError(`Name is required.`);
  }

  if (password !== password_confirmation) {
    errors.passwords.password_confirmation.addError("The passwords confirmation does not match.");
  }
  return errors;
};

const signUpFormData = {
  schema: {
    type: "object",
    title: "",
    description: "",
    autoComplete: "off",
    isRequired: true,
    properties: {
      account_type: {
        title: "",
        type: "object",
        properties: {
          accountType: {
            type: "number",
            title: "Sign up as",
            description: "",
            oneOf: [
              {
                title: "Learning Consultant",
                const: 1,
              },
              {
                title: "Learner",
                const: 2,
              },
            ],
          }
        },
      },
      name_email: {
        title: "",
        type: "object",
        properties: {
          name: {
            type: "string",
            title: "Name",
            description: "",
          },
          email: {
            type: "string",
            title: "Email",
            description: "",
          }
        }
      },
      passwords: {
        title: "",
        type: "object",
        properties: {
          password: {
            type: "string",
            title: "Password",
            description: "",
            minLength: 6,
            maxLength: 16
          },
          password_confirmation: {
            type: "string",
            title: "Confirm Password",
            description: "",
            minLength: 6,
            maxLength: 16
          }
        }
      },
    }
  },
  uiSchema: {
    account_type: {
      accountType: {
        "ui:widget": "radio",
        "ui:options": {
          inline: true,
        },
      }
    },
    name_email: {
      email: {
        "ui:placeholder": "Enter your email",
        "ui:widget": "email",
        "ui:options": {
          inputType: 'email',
          autoComplete: 'off',
        }
      },
      name: {
        "ui:placeholder": "Enter your name",
      }
    },
    passwords: {
      password: {
        "ui:placeholder": "Password",
        "ui:widget": "password"
      },
      password_confirmation: {
        "ui:placeholder": "Confirm Password",
        "ui:widget": "password"
      }
    },
  },
  formData: {
    account_type: {
      accountType: 1
    },
    name_email: {
      name: '',
      email: ''
    },
    passwords: {
      password: '',
      password_confirmation: '',
    },
  },
  extraErrors: {},
  liveValidate: false
};

const SignUpForm = () => {
  const [form, setForm] = useState(signUpFormData);
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const signUp = (formData) => {
    const data = Object.keys(formData).reduce((acc, section) => ({...acc, ...formData[section]}), {});

    axios.post('/register', data)
      .then(function (response) {
        console.log(response);

        localStorage.setItem('token', response.data.token);
        window.location.reload();
      })
      .catch(function (error) {
        const errors = error.response.data.errors;
        // The extraErrors feature doesn't include in the version of 1.8.0.
        const extraErrors = Object.keys(errors).reduce((acc, error) => (
          {
            ...acc, [error]: {
              __errors: errors[error]
            }
          }
        ), {});
        setForm({...form, extraErrors});
        setErrors(errors);
        setShowAlert(true);
      });
  };

  return (
    <Col sm={12}>
      <div className="form-title text-center">
        Sign up
      </div>
      {showAlert &&
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        {Object.keys(errors).map(error => (
          <div key={error}>
            {
              errors[error].map((message, index) => (
                <p key={index}>
                  {message}
                </p>
              ))
            }
          </div>
        ))}
      </Alert>
      }
      <Form
        className={"auth-form"}
        liveValidate={form.liveValidate}
        schema={form.schema}
        uiSchema={form.uiSchema}
        formData={form.formData}
        extraErrors={form.extraErrors}
        onChange={(formData) => {
          setForm({...form, ...formData, liveValidate: true});
        }}
        onSubmit={({formData}) => {
          signUp(formData);
        }}
        onError={(errors, val) => console.log('errors', {errors, val})}
        validate={validate}
        ErrorList={ErrorListTemplate}
      >
        <div className="form-actions">
          <div className="title">Sign up with</div>
          <div className="social-buttons">
            <a href="/login/google" className="btn btn-outline-info">
              <i className="fab fa-google"/> Google
            </a>
            <a href="/login/linkedin" className="btn btn-outline-info">
              <i className="fab fa-linkedin-in"/> Linkedin
            </a>
          </div>
          <Button variant="info" type="submit" className="submit-button">Sign up</Button>
        </div>

      </Form>
    </Col>
  )
};

export default SignUpForm;
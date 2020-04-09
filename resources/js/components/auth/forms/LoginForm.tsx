import React, {useState} from "react";
import axios from "axios";
import Form from "react-jsonschema-form";
import {Alert, Button, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {validateEmail} from "../../../utils/utils";
import ErrorListTemplate from "./ErrorListTemplate";

const validate = ({email}, errors) => {
  if (!validateEmail(email)) {
    errors.email.addError(`${email} is not a valid email.`);
  }
  return errors;
};

const loginFormData = {
  schema: {
    type: "object",
    title: "",
    description: "",
    autoComplete: "off",
    isRequired: true,
    required: [
      "password"
    ],
    properties: {
      email: {
        type: "string",
        title: "Login",
        description: "",
      },
      password: {
        type: "string",
        title: "Password",
        description: "",
      },
    }
  },
  uiSchema: {
    email: {
      "ui:placeholder": "Enter email",
      "ui:widget": "email",
      "ui:options": {
        inputType: 'email',
        autoComplete: 'off',
      }
    },
    password: {
      "ui:placeholder": "Password",
      "ui:widget": "password"
    },
  },
  formData: {
    email: '',
    password: '',
  },
  extraErrors: {},
  liveValidate: false
};

const LoginForm = () => {
  const [form, setForm] = useState(loginFormData);
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const login = (formData) => {
    axios.post('/login', formData)
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
    <Col sm={{span: 8, offset: 2}}>
      <div className="form-title text-center">
        Log in
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
          login(formData);
        }}
        onError={(errors, val) => console.log('errors', {errors, val})}
        validate={validate}
        ErrorList={ErrorListTemplate}
      >

        <NavLink to={'/login'}>
          Forgot the password?
        </NavLink>

        <div className="form-actions">
          <div className="title">Log in with</div>
          <div className="social-buttons">
            <a href="/login/google" className="btn btn-outline-info">
              <i className="fab fa-google"/> Google
            </a>
            <a href="/login/linkedin" className="btn btn-outline-info">
              <i className="fab fa-linkedin-in"/> Linkedin
            </a>
          </div>
          <Button variant="info" type="submit" className="submit-button">Log In</Button>
        </div>

      </Form>
    </Col>
  )
};

LoginForm.propTypes = {};

export default LoginForm;
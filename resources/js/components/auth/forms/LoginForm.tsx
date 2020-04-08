import * as React from "react";
import PropTypes, {element} from "prop-types";
// import Form from "react-jsonschema-form-bs4";
import Form from "react-jsonschema-form";
import {Button, Col} from "react-bootstrap";
import {validateEmail} from "../../../utils/utils";
import {NavLink} from "react-router-dom";

const ErrorListTemplate = (props) => {
  const {errors} = props;
  return (
    <ul className="errors-list">
      {errors.map(error => (
        <li key={error.stack}>
          {error.stack}
        </li>
      ))}
    </ul>
  );
};

const validate = ({email}, errors) => {
  if (!validateEmail(email)) {
    errors.email.addError(`${email} is not a valid email.`);
  }
  return errors;
};

const LoginForm = () => {
  return (
    <Col sm={{span: 8, offset: 2}}>
      <div className="form-title text-center">
        Log in
      </div>
      <Form
        liveValidate={true}
        className={"auth-form"}
        schema={{
          type: "object",
          title: "",
          description: "",
          liveValidate: true,
          autoComplete: "off",
          isRequired: true,
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
              minLength: 6,
              maxLength: 16
            },
          }
        }}
        uiSchema={{
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
        }}
        formData={{
          email: '',
          password: '',
        }}
        onChange={(formData) => console.log({
          ...element,
          ...formData
        })}
        onSubmit={({formData}, e) => {
          console.log("submitted formData", formData);
          console.log("submit event", e);
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


/*
      <hr/>
      <div className="settings">
        {element.schema.isRequired &&
        <div className="property">
          <i className='glyphicon glyphicon-ok-sign'/> Required
        </div>
        }

        {element.schema.showInDashboard &&
        <div className="property">
          <i className='glyphicon glyphicon-ok-sign'/> Show in Dashboard
        </div>
        }

        <button className="btn btn-danger remove-element"
                onClick={() => onRemove(element)}>
          <i className='glyphicon glyphicon-trash'/>
        </button>
      </div>
      */
import * as React from "react";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";

export const CompanyLogoField = (props) => {
  const [hasCustomUrl, setHasCustomUrl] = useState(false)
  const clearbitDomainEndpoint = "https://company.clearbit.com/v1/domains/find?name=";
  const clearbitAPIKey = process.env.CLEARBIT_API_KEY;

  const onFormChange = (e) => {
    e.target.name === 'companyLogoUrl' ? setHasCustomUrl(true) : setHasCustomUrl(false);
    const tempState = {
      ...props.companyAttributes,
      [e.target.name]: e.target.value
    };
    props.setCompanyAttributes(tempState);
  };

  const onCompanyNameBlur = () => {
    fetchCompanyUrl(props.companyAttributes.companyName);
  };

  const fetchCompanyUrl = (companyName) => {
    fetch(`${clearbitDomainEndpoint}${companyName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${clearbitAPIKey}`
      }
    }).then((r) => {
      return r.json();
    }).then((r) => {
      let companyLogoUrl = "";
      if (r?.error?.type === 'unknown_record' && !hasCustomUrl) {
        companyLogoUrl = ""
      }
      else if (!hasCustomUrl) {
        companyLogoUrl = r.logo
      }
      else {
        companyLogoUrl = props.companyAttributes.companyLogoUrl;
      }
      const tempState = {
        ...props.companyAttributes,
        companyLogoUrl
      };
      props.setCompanyAttributes(tempState)
    })
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            value={props.companyAttributes.companyName}
            name="companyName"
            onChange={onFormChange}
            onBlur={onCompanyNameBlur}
            placeholder="Enter the company name" />
        </Form.Group>
        <Form.Group controlId="formCompanyUrl">
          <Form.Label>Company Logo URL</Form.Label>
          <Form.Control
            value={props.companyAttributes.companyLogoUrl}
            name="companyLogoUrl"
            onChange={onFormChange}
            placeholder="Enter the company logo URL" />
          <Form.Text className="text-muted">
            This field will autofill if we can find a logo, otherwise please add your own.
          </Form.Text>
        </Form.Group>
        {props.companyAttributes.companyLogoUrl &&
        <img src={props.companyAttributes.companyLogoUrl}  width="200" height="200"/>}
      </Form>
    </>
  );
};

export default CompanyLogoField;

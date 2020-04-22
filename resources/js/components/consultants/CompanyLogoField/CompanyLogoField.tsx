import * as React from "react";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";

export const CompanyLogoField = (props) => {
  const [hasCustomUrl, setHasCustomUrl] = useState(false);
  const clearbitDomainEndpoint = "https://company.clearbit.com/v1/domains/find?name=";
  const clearbitAPIKey = process.env.CLEARBIT_API_KEY;

  const handleOnChange = (e) => {
    e.target.name === 'company_logo_url' ? setHasCustomUrl(true) : setHasCustomUrl(false);
    const tempState = {
      ...props.formData,
      [e.target.name]: e.target.value
    };
    props.onChange(tempState);
  };

  const onCompanyNameBlur = () => {
    fetchCompanyUrl(props.formData.company_name);
  };

  const fetchCompanyUrl = (company_name) => {
    fetch(`${clearbitDomainEndpoint}${company_name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${clearbitAPIKey}`
      }
    }).then((r) => {
      return r.json();
    }).then((r) => {
      let company_logo_url = "";
      if (r?.error?.type === 'unknown_record' && !hasCustomUrl) {
        company_logo_url = ""
      }
      else if (!hasCustomUrl) {
        company_logo_url = r.logo
      }
      else {
        company_logo_url = props.formData.companyLogoUrl;
      }
      const tempState = {
        ...props.formData,
        company_logo_url
      };
      props.onChange(tempState)
    })
  };

  return (
    <div>
      <Form.Group controlId="company_name">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          type="text"
          value={props.formData.company_name}
          name="company_name"
          onChange={handleOnChange}
          onBlur={onCompanyNameBlur}
          placeholder="Enter the company name"/>
      </Form.Group>
      <Form.Group controlId="company_logo_url">
        <Form.Label>Company Logo URL</Form.Label>
        <Form.Control
          type="text"
          value={props.formData.company_logo_url}
          name="company_logo_url"
          onChange={handleOnChange}
          placeholder="Enter the company logo URL" />
      </Form.Group>
      {props.formData.company_logo_url &&
      <img src={props.formData.company_logo_url}  width="200px" height="200px"/>}
    </div>
  );
};

export default CompanyLogoField;

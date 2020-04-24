import * as React from "react";
import JsonForm from "react-jsonschema-form-bs4";
import DTPicker from "../../consultants/ElentaFormBuilder/fields/DTPicker";
import {ImageWidget} from "../../consultants/ElentaFormBuilder/fields/ImageWidget";
import {VideoWidget} from "../../consultants/ElentaFormBuilder/fields/VideoWidget";
import Tags from "../../tags/Tags";
import LayoutField from "./LayoutField";
import CompanyLogoField from "../../consultants/CompanyLogoField/CompanyLogoField";

export const defaultFields = {
  tags: Tags,
  layout: LayoutField,
  companyLogoField: CompanyLogoField
};

const defaultWidgets = {
  RDP: DTPicker,
  Image: ImageWidget,
  Video: VideoWidget,
};

interface Props {
  schema: any,
  uiSchema?: any,
  formData?: any,
  onChange?: any,
  children?: any,
  widgets?: any,
  fields?: any,
}

// TODO: pass option for button
export const ElentaJsonForm: React.FunctionComponent<Props> =
  ({
     schema,
     uiSchema,
     formData,
     onChange,
     widgets,
     fields,
     ...rest
   }) => {
    return (
      <JsonForm schema={schema}
                uiSchema={{
                  "ui:field": "layout",
                  ...uiSchema
                }}
                formData={
                  formData ?
                    formData :
                    Object.keys(schema.properties).reduce((ac, a) => ({...ac, [a]: ''}), {})
                }
                onChange={onChange}
                widgets={{
                  widgets,
                  ...defaultWidgets
                }}
                fields={{
                  fields,
                  ...defaultFields
                }}
                {...rest}
      >
        <br/>
      </JsonForm>
    );
  };

export default ElentaJsonForm;

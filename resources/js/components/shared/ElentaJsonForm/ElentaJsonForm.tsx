import * as React from "react";
import JsonForm from "react-jsonschema-form";
import DTPicker from "../../consultants/ElentaFormBuilder/fields/DTPicker";
import {ImageWidget} from "../../consultants/ElentaFormBuilder/fields/ImageWidget";
import {VideoWidget} from "../../consultants/ElentaFormBuilder/fields/VideoWidget";
import Tags from "../../tags/Tags";

export const fields = {
  tags: Tags
};
const widgets = {
  RDP: DTPicker,
  Image: ImageWidget,
  Video: VideoWidget,
};

export const ElentaJsonForm = ({schema, uiSchema, formData, onChange, children, ...rest}) => {
  return (
    <JsonForm schema={schema}
              uiSchema={uiSchema}
              formData={
                formData ?
                  formData :
                  Object.keys(schema.properties).reduce((ac, a) => ({...ac, [a]: ''}), {})
              }
              onChange={onChange}
              widgets={widgets}
              {...rest}
    >
      {children}
    </JsonForm>
  );
};

export default ElentaJsonForm;

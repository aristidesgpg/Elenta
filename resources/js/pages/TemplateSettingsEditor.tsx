import * as React from "react";
import {useParams} from "react-router-dom";
import {gql} from "apollo-boost";
import ElentaForm from "../components/elenta-form/ElentaForm";
import {CREATE_TEMPLATE, GET_TEMPLATE, UPDATE_TEMPLATE} from "../graphql/queries";

const schema = {
  title: "Create Template",
  type: "object",
  required: ["title"],
  properties: {
    id: {
      type: "string"
    },
    title: {
      type: "string",
      title: "Title",
      default: "New Template"
    },
    can_request: {
      type: "boolean",
      title: "Allow Requests",
      default: true
    },
    is_public: {
      type: "boolean",
      title: "Share publicly",
      default: false
    }
  }
};

const uiSchema = {
  id: {
    "ui:widget": "hidden"
  }
};

export const TemplateSettingsEditor = () => {
  let {id} = useParams();

  if (id == "new") {
    return <ElentaForm
      schema={schema}
      uiSchema={uiSchema}
      mutation={CREATE_TEMPLATE}
      mutationVars={
        {
          owner: {
            connect: "c798b1a1-fdc7-4b59-9599-9f991b94dc51"
          }
        }
      }
    />
  } else {
    return <ElentaForm
        schema={schema}
        uiSchema={uiSchema}
        query={GET_TEMPLATE}
        mutation={UPDATE_TEMPLATE}
        queryVars={{variables: {id}}}
      />
  }
};

export default TemplateSettingsEditor;

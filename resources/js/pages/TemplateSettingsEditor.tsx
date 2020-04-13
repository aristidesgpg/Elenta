import * as React from "react";
import {useParams} from "react-router-dom";
import ElentaForm from "../components/elenta-form/ElentaForm";
import {CURRENT_USER, CURRENT_USER_PROFILE, GET_TEMPLATE, UPSERT_TEMPLATE} from "../graphql/queries";
import {useQuery} from "@apollo/react-hooks";

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
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  if (id == "new") {
    return <ElentaForm
      schema={schema}
      uiSchema={uiSchema}
      mutation={UPSERT_TEMPLATE}
      mutationVars={
        {
          owner: {
            connect: userProfile.id
          }
        }
      }
      onSuccess={(data) => {
          window.location.replace(`/template/content/${data.upsertTemplate.id}`);
        }
      }
    />
  } else {
    schema.title = "Update Template";
    return <ElentaForm
      schema={schema}
      uiSchema={uiSchema}
      query={GET_TEMPLATE}
      mutation={UPSERT_TEMPLATE}
      queryVars={
        {
          variables: {
            id: id
          }
        }
      }
    />
  }
};

export default TemplateSettingsEditor;

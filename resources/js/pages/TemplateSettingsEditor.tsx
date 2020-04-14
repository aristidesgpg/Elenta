import * as React from "react";
import {useParams} from "react-router-dom";
import ElentaForm from "../components/elenta-form/ElentaForm";
import {CURRENT_USER_PROFILE, GET_TEMPLATE, UPSERT_TEMPLATE} from "../graphql/queries";
import {useQuery} from "@apollo/react-hooks";
import ElentaFormBuilder from "../components/builder/ElentaFormBuilder";
import {useState} from "react";

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
    },
    dynamic_fields: {
      type: "string"
    }
  }
};

const uiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  dynamic_fields: {
    "ui:widget": "hidden"
  }
};

export const TemplateSettingsEditor = () => {
  // TODO: Can we make dynamic fields a rjsf type with a new component
  const [dynamicFields, setDynamicFields] = useState({
    schema: {
      type: "object",
      properties: {}
    },
    uiSchema: {
      "ui:order": []
    }
  });

  let {id} = useParams();
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  if (id == "new") {
    return (
      <ElentaForm
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
        mutationTransform={d => {
          d.dynamic_fields = JSON.stringify(dynamicFields)
        }}
        onSuccess={(data) => {
          window.location.replace(`/template/content/${data.upsertTemplate.id}`);
        }}
      >
        <h3>Dynamic Fields</h3>
        <ElentaFormBuilder
          schema={dynamicFields.schema}
          uiSchema={dynamicFields.uiSchema}
          onSave={(schema: any, uiSchema: any) => {
            let o = {
              schema: schema,
              uiSchema: uiSchema
            };
            setDynamicFields(o)
          }}
          excludedFields={['richtext', 'rank', 'slider', 'multiple-checkbox', 'radiobuttonlist', 'repeater']}
        />
      </ElentaForm>
    )
  } else {
    schema.title = "Update Template";
    return <ElentaForm
      schema={schema}
      uiSchema={uiSchema}
      query={GET_TEMPLATE}
      mutation={UPSERT_TEMPLATE}
      queryVars={{
          variables: {
            id: id
          }
        }}
    />
  }
};

export default TemplateSettingsEditor;

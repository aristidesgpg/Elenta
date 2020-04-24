import * as React from "react";
import {useParams, useHistory} from "react-router-dom";
import {CURRENT_USER_PROFILE, GET_TEMPLATE, UPSERT_TEMPLATE} from "../../graphql/queries";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import ElentaFormBuilder from "../../components/consultants/ElentaFormBuilder/ElentaFormBuilder";
import {useContext, useEffect, useState} from "react";
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import {ToastContext} from "../../contexts/ToastContext";
import {immutableMerge} from "../../utils/utils";
import {mutateTagData, tagSchema, tagUiSchema} from "../../components/tags/Tags";
import ElentaJsonForm from "../../components/shared/ElentaJsonForm/ElentaJsonForm";

const schema = {
  type: "object",
  required: ["title", "can_request", "is_public"],
  properties: {
    id: {
      type: "string"
    },
    title: {
      type: "string",
      title: "Title",
      default: "New Template"
    },
    description: {
      type: "string",
      title: "Description",
      default: "Template Description"
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
    },
    ...tagSchema
  }
};

const uiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  description: {
    "ui:widget": "textarea"
  },
  dynamic_fields: {
    "ui:widget": "hidden"
  },
  ...tagUiSchema
};

const defaultDynamicFields = {
  schema: {
    type: "object",
    properties: {}
  },
  uiSchema: {
    "ui:order": []
  }
};

// TODO: change tag name to tag label
export const TemplateSettingsPage = () => {
  let history = useHistory();
  let {id} = useParams();
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  const [formState, setFormState] = useState({
    dynamic_fields: defaultDynamicFields
  });

  const [runQuery, {loading: queryLoading, error: queryError, data: queryData}] = useLazyQuery(GET_TEMPLATE);
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_TEMPLATE);

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (!queryData && id != "new") {
      runQuery({variables: {id: id}});
    }

    if (queryData) {
      let dynamicFields = JSON.parse(queryData.getTemplate.dynamic_fields);
      if (dynamicFields.schema === undefined) {
        dynamicFields = defaultDynamicFields;
      }
      setFormState(immutableMerge(queryData.getTemplate, {
        dynamic_fields: {
          schema: dynamicFields.schema,
          uiSchema: dynamicFields.uiSchema
        }
      }))
    }
  }, [queryData]);

  const handleChange = (data) => {
    let newState = immutableMerge(formState, data.formData);
    if (!_.isEqual(newState, formState)) {
      setFormState(newState);
    }
  };

  const handleSubmit = () => {
    runMutation({
        variables: {
          input: immutableMerge(
            _.pick(formState, ['id', 'title', 'description', 'can_request', 'is_public', 'dynamic_fields']),
            {
              id: id == "new" ? null : id,
              dynamic_fields: JSON.stringify(formState.dynamic_fields),
              owner: {
                connect: userProfile.id
              },
              tags: mutateTagData(_.result(formState, 'tags'))
            })
        }
      }
    ).then(r => {
      toastContext.addToast({header: "Success!", body: "Saved"});
      if (id == "new") {
        history.push(`/template/content/${r.data.upsertTemplate.id}`);
      }
    });
  };

  return (
    <LoadingContainer
      loading={[mutationLoading, queryLoading]}
      error={[mutationError, queryError]}
    >
      <ElentaJsonForm schema={schema}
                      uiSchema={uiSchema}
                      formData={formState}
                      onChange={handleChange}
      />
      <h3>Dynamic Fields</h3>
      <ElentaFormBuilder
        schema={formState.dynamic_fields.schema}
        uiSchema={formState.dynamic_fields.uiSchema}
        onSave={(schema: any, uiSchema: any) => {
          setFormState(immutableMerge(formState, {
            dynamic_fields: {
              schema: schema,
              uiSchema: uiSchema
            }
          }));
        }}
        excludedFields={['richtext', 'rank', 'slider', 'multiple-checkbox', 'radiobuttonlist', 'repeater']}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </LoadingContainer>
  );
};

export default TemplateSettingsPage;

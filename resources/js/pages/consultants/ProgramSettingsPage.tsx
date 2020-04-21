import * as React from "react";
import {useParams} from "react-router-dom";
import {
  CURRENT_USER_PROFILE,
  GET_PROGRAM,
  GET_TEMPLATES_BY_OWNER,
  UPSERT_PROGRAM,
} from "../../graphql/queries";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {useContext, useEffect, useState} from "react";
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import JsonForm from "react-jsonschema-form";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import {ToastContext} from "../../contexts/ToastContext";
import DTPicker from "../../components/consultants/ElentaFormBuilder/fields/DTPicker";
import {immutableMerge} from "../../utils/utils";

const widgets = {RDP: DTPicker};

const schema = {
  type: "object",
  required: ["title"],
  properties: {
    id: {
      type: "string"
    },
    title: {
      type: "string",
      title: "Title",
      default: "New Program"
    },
    template: {
      type: "string",
      title: "Template",
      enum: [],
      enumNames: [],
      default: ""
    },
    format: {
      type: "string",
      title: "Format",
      default: "SELF_DIRECTED",
      enum: ["SELF_DIRECTED", "IN_PERSON", "VIRTUAL_ATTENDANCE"],
      enumNames: ["Self Directed", "In Person", "Virtual Attendance"]
    },
    max_learners: {
      type: "integer",
      title: "Max Learners",
      default: 100
    },
    start_timestamp: {
      type: "string",
      title: "Start Date",
      format: "date-time"
    },
    can_invite: {
      type: "boolean",
      title: "Allow Sharing",
      default: false
    },
    is_public: {
      type: "boolean",
      title: "Listed publicly",
      default: false
    }
  }
};

const visibleUiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  start_timestamp: {
    "ui:widget": "RDP"
  },
  max_learners: {
    "ui:widget": "updown"
  }
};

const hiddenUiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  start_timestamp: {
    "ui:widget": "hidden"
  },
  max_learners: {
    "ui:widget": "hidden"
  }
};

const defaultDynamicFields = {
  schema: {
    type: "object",
    properties: {}
  },
  uiSchema: {
    "ui:order": []
  },
  formData: {}
};

export const ProgramSettingsPage = () => {
  let {id} = useParams();
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  const [uiSchemaState, setUiSchemaState] = useState(hiddenUiSchema);
  const [schemaState, setSchemaState] = useState(immutableMerge(schema, {
    properties: {
      template: {
        readOnly: id !== "new"
      }
    }
  }));

  const [dynamicFields, setDynamicFields] = useState(defaultDynamicFields);
  const [formState, setFormState] = useState({
    template: null
  });

  const [runTemplatesQuery, {loading: templatesQueryLoading, error: templatesQueryError, data: templatesQueryData}] = useLazyQuery(GET_TEMPLATES_BY_OWNER);
  const [runProgramQuery, {loading: programQueryLoading, error: programQueryError, data: programQueryData}] = useLazyQuery(GET_PROGRAM);
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_PROGRAM);

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (!templatesQueryData && id == "new") {
      runTemplatesQuery({variables: {consultant_profile_id: userProfile.id}});
    }

    if (templatesQueryData) {
      setFormState(immutableMerge(formState, {
        template: templatesQueryData.getTemplatesByOwner[0].id
      }));

      setDynamicFields(JSON.parse(templatesQueryData.getTemplatesByOwner[0].dynamic_fields));

      setSchemaState(immutableMerge(
        schemaState,
        {
          properties: {
            template: {
              enum: templatesQueryData.getTemplatesByOwner.map(d => d.id),
              enumNames: templatesQueryData.getTemplatesByOwner.map(d => d.title),
              default: templatesQueryData.getTemplatesByOwner[0].id
            }
          }
        }
      ));
    }
  }, [templatesQueryData]);

  useEffect(() => {
    if (!programQueryData && id != "new") {
      runProgramQuery({variables: {id: id}});
    }

    if (programQueryData) {
      setSchemaState(immutableMerge(
        schemaState,
        {
          properties: {
            template: {
              enum: [programQueryData.getProgram.template.id],
              enumNames: [programQueryData.getProgram.template.title]
            }
          }
        }
      ));

      if (["IN_PERSON", "VIRTUAL_ATTENDANCE"].includes(programQueryData.getProgram.format)) {
        setUiSchemaState(immutableMerge(uiSchemaState, visibleUiSchema));
      } else {
        setUiSchemaState(immutableMerge(uiSchemaState, hiddenUiSchema));
      }

      let df = JSON.parse(programQueryData.getProgram.dynamic_fields);
      if (df.schema === undefined) {
        setDynamicFields(defaultDynamicFields);
      } else {
        setDynamicFields(df);
      }

      setFormState(immutableMerge(programQueryData.getProgram, {
        template: programQueryData.getProgram.template.id
      }))
    }
  }, [programQueryData]);

  useEffect(() => {
    if (mutationData) {
      toastContext.addToast({header: "Success!", body: "Saved"});
    }
  }, [mutationData]);

  const currentTemplate = () => {
    if (templatesQueryData && formState.template) {
      return templatesQueryData.getTemplatesByOwner.filter(t => t.id === formState.template)[0]
    }
  }

  const handleChange = (data) => {
    let newState = immutableMerge(formState, data.formData);
    if (currentTemplate() && id == "new") setDynamicFields(JSON.parse(currentTemplate().dynamic_fields));

    if (!_.isEqual(newState, formState)) {
      setFormState(newState);
      if (["IN_PERSON", "VIRTUAL_ATTENDANCE"].includes(newState.format)) {
        setUiSchemaState(immutableMerge(uiSchemaState, visibleUiSchema));
      } else {
        setUiSchemaState(immutableMerge(uiSchemaState, hiddenUiSchema));
      }
    }
  };

  const handleDynamicChange = (f) => {
    let newState = immutableMerge(dynamicFields, {formData: f.formData})
    if (!_.isEqual(newState, dynamicFields)) {
      setDynamicFields(newState);
    }
  }

  const handleSubmit = () => {
    runMutation({
        variables: {
          input: immutableMerge(
            _.pick(formState, ['title', 'format', 'is_public', 'can_invite', 'max_learners']),
            {
              id: id == "new" ? null : id,
              template: {
                connect: formState.template
              },
              dynamic_fields: JSON.stringify(dynamicFields),
              owner: {
                connect: userProfile.id
              }
            })
        }
      }
    )
  };

  return (
    <LoadingContainer
      loading={[mutationLoading, templatesQueryLoading, programQueryLoading]}
      error={[mutationError, templatesQueryError, programQueryError]}
    >
      <JsonForm schema={schemaState}
                uiSchema={uiSchemaState}
                formData={_.pick(formState, Object.keys(schemaState.properties))}
                onChange={handleChange}
                widgets={widgets}
      >
        <hr/>
      </JsonForm>
      <JsonForm schema={dynamicFields.schema}
                uiSchema={dynamicFields.uiSchema}
                formData={
                  dynamicFields.formData ?
                    dynamicFields.formData :
                    Object.keys(dynamicFields.schema.properties).reduce((ac,a) => ({...ac,[a]:''}),{})
                }
                onChange={handleDynamicChange}
      >
        <br/>
      </JsonForm>
      <Button onClick={handleSubmit}>Submit</Button>
    </LoadingContainer>
  );
};

export default ProgramSettingsPage;

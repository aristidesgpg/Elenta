import * as React from "react";
import {useParams, Redirect} from "react-router-dom";
import ElentaForm from "../components/elenta-form/ElentaForm";
import JsonForm from "react-jsonschema-form";

import {
  CURRENT_USER,
  CURRENT_USER_PROFILE,
  GET_PROGRAM,
  GET_TEMPLATES_BY_OWNER,
  UPSERT_PROGRAM
} from "../graphql/queries";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import _ from "lodash";
import moment from "moment";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {useEffect, useState} from "react";

const schema = {
  title: "Create Program",
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
      enumNames: []
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

const uiSchema = {
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

const rulesSchema = {
  start_timestamp: {
    requires: {
      field: "format",
      values: ["IN_PERSON", "VIRTUAL_ATTENDANCE"]
    }
  },
  max_learners: {
    requires: {
      field: "format",
      values: ["IN_PERSON", "VIRTUAL_ATTENDANCE"]
    }
  }
};

export const ProgramSettingsEditor = () => {
  let {id} = useParams();
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);
  // TODO: We can fetch this when we load the consultant profile, and then pass the data down or fetch from cache
  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_TEMPLATES_BY_OWNER, {variables: {consultant_profile_id: userProfile.id}});

  const [dynamicFields, setDynamicFields] = useState({formData: {}});
  const [currentTemplate, setCurrentTemplate] = useState(null);
  // TODO: This whole page needs refactoring, along with TemplateSettingsEditor. We shouldn't be using the ref
  let formRef = {state: {formData: {}}};

  useEffect(() => {
    if (queryData) {
      setCurrentTemplate(queryData.getTemplatesByOwner[0]);
    }
  }, [queryData]);

  if (queryData) {
    if (queryData.getTemplatesByOwner.length == 0) {
      return (
        <>
          <p>Please create a Template first</p>
          <Redirect to="/dashboard"/>
        </>
      );
    }

    schema.properties.template.enum = _.map(queryData.getTemplatesByOwner, 'id');
    schema.properties.template.enumNames = _.map(queryData.getTemplatesByOwner, 'title');
    schema.properties.template["default"] = schema.properties.template.enum[0];

    if (id == "new") {
      schema.title = 'Create Program';
      return <LoadingContainer loading={queryLoading} error={queryError}>
        <ElentaForm
          schema={schema}
          uiSchema={uiSchema}
          rulesSchema={rulesSchema}
          mutation={UPSERT_PROGRAM}
          mutationVars={
            {
              owner: {
                connect: userProfile.id
              }
            }
          }
          mutationTransform={(d) => {
            d['template'] = {
              connect: d.template
            };
            d['start_timestamp'] = moment(d.start_timestamp).format("Y-MM-DD HH:mm:ss");
            d['dynamic_fields'] = JSON.stringify(
              Object.assign(
                JSON.parse(currentTemplate.dynamic_fields),
                {formData: formRef.state.formData}
              )
            )
          }}
          handleChange={(d) => {
            setCurrentTemplate(queryData.getTemplatesByOwner.filter(q => q.id == d.id)[0])
          }}
        >
          {
            currentTemplate && currentTemplate.dynamic_fields &&
            <JsonForm schema={JSON.parse(currentTemplate.dynamic_fields).schema}
                      uiSchema={JSON.parse(currentTemplate.dynamic_fields).uiSchema}
                      ref={form => formRef = form}
            >
              <br/>
            </JsonForm>
          }
        </ElentaForm>
      </LoadingContainer>
    } else {
      schema.title = 'Update Program';
      schema.properties.template["readOnly"] = true;
      return <LoadingContainer loading={queryLoading} error={queryError}>
        <ElentaForm
          schema={schema}
          uiSchema={uiSchema}
          rulesSchema={rulesSchema}
          query={GET_PROGRAM}
          mutation={UPSERT_PROGRAM}
          queryVars={
            {
              variables: {
                id: id
              }
            }
          }
          queryTransform={d => {
            setDynamicFields(JSON.parse(d.getProgram.dynamic_fields));
          }}
          mutationTransform={(d) => {
            delete d['template'];
            d['start_timestamp'] = moment(d.start_timestamp).format("Y-MM-DD HH:mm:ss");
            d['dynamic_fields'] = JSON.stringify(
              Object.assign(
                JSON.parse(currentTemplate.dynamic_fields),
                {formData: formRef.state.formData}
              )
            )
          }}
        >
          {
            currentTemplate && currentTemplate.dynamic_fields &&
            <JsonForm schema={JSON.parse(currentTemplate.dynamic_fields).schema}
                      uiSchema={JSON.parse(currentTemplate.dynamic_fields).uiSchema}
                      formData={dynamicFields.formData}
                      ref={form => formRef = form}
            >
              <br/>
            </JsonForm>
          }
        </ElentaForm>
      </LoadingContainer>
    }
  }
  return null;
};

export default ProgramSettingsEditor;

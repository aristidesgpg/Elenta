import * as React from "react";
import {useParams} from "react-router-dom";
import ElentaForm from "../components/elenta-form/ElentaForm";
import {GET_PROGRAM, GET_TEMPLATES_BY_OWNER, UPSERT_PROGRAM} from "../graphql/queries";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import _ from "lodash";
import moment from "moment";
import LoadingContainer from "../components/component-container/LoadingContainer";

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

  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(GET_TEMPLATES_BY_OWNER, {variables: {consultant_profile_id: "818cecf2-b1b9-4f80-b095-565faeea1953"}});

  if (queryData) {
    if (queryData.getTemplatesByOwner.length == 0) {
      return <p>Please create a Template first</p>;
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
                connect: "c798b1a1-fdc7-4b59-9599-9f991b94dc51"
              }
            }
          }
          mutationTransform={(d) => {
            d['template'] = {
              connect: d.template
            };
            d['start_timestamp'] = moment(d.start_timestamp).format("Y-MM-DD HH:mm:ss");
          }
          }
        />
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
          mutationTransform={(d) => {
            delete d['template'];
            d['start_timestamp'] = moment(d.start_timestamp).format("Y-MM-DD HH:mm:ss");
          }
          }
        />
      </LoadingContainer>
    }
  }
};

export default ProgramSettingsEditor;

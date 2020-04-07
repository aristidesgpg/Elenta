import * as React from "react";
import Container from "react-bootstrap/Container";
import JsonForm from "react-jsonschema-form";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {DocumentNode, gql} from "apollo-boost";
import Spinner from "react-bootstrap/Spinner";
import {useEffect, useState} from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ElentaFormButton from "./ElentaFormButton";

export const ElentaForm: React.FunctionComponent<ElentaFormProps> =
  ({
     schema,
     uiSchema,
     rulesSchema,
     query,
     mutation,
     queryVars,
     mutationVars,
     queryTransform,
     mutationTransform
   }) => {

    const [localUiSchema, setLocalUiSchema] = useState(uiSchema);
    const [formState, setFormState] = useState(null);
    const [runQuery, {loading: queryLoading, error: queryError, data: queryData}] = useLazyQuery(query);
    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(mutation);

    useEffect(() => {
      if (query) {
        runQuery(queryVars);

        if (queryData) {
          // Returns with first child as query name, e.g queryData.getTemplate.id. Get first child.
          queryTransform(queryData);
          let newState = _.pick(queryData[Object.keys(queryData)[0]], Object.keys(schema.properties));
          // Sometimes we fetch a child object, let's flatten this to an id so the state is one level deep
          Object.keys(newState).forEach(k => {
            if (typeof (newState[k]) == 'object') newState[k] = newState[k].id;
          });
          onChange({formData: newState});
        }
      }
    }, [queryData]);

    const onSubmit = ({formData}, e) => {
      e.preventDefault();
      let submitData = _.cloneDeep(formData);
      mutationTransform(submitData);
      runMutation({variables: {input: Object.assign(mutationVars, submitData)}});
      setFormState(formData);
    };

    const onChange = ({formData}) => {
      // Custom addition to rjsf, allowing fields to hide based on values of
      // other fields
      let fields = Object.keys(rulesSchema);
      let tempUiSchema = _.cloneDeep(localUiSchema);
      if (formData) {
        fields.forEach(f => {
          if (rulesSchema[f].requires) {
            let fieldVal = formData[rulesSchema[f].requires.field];
            let validVals = rulesSchema[f].requires.values;
            if (validVals.includes(fieldVal)) {
              // We don't want the default for date-times
              if (schema.properties[f].format == 'date-time') {
                _.set(tempUiSchema, f + '.ui:widget', 'alt-datetime');
              } else {
                delete tempUiSchema[f]["ui:widget"];
              }
            } else if (localUiSchema[f]) {
              _.set(tempUiSchema, f + '.ui:widget', 'hidden');
            }
          }
        });
        setLocalUiSchema(tempUiSchema);
      }
      setFormState(formData);
    };

    const log = (type) => console.log.bind(console, type);

    if (queryError) {
      console.log(queryError);
      return (
        <Alert variant="danger" transition={null}>
          {
            queryError.graphQLErrors.map(e => {
              return <p>{e.message}</p>
            })
          }
        </Alert>
      );
    }

    return (
      <Container>
        {
          queryLoading &&
          <Spinner animation="border"/>
        }
        {
          !queryLoading &&
          <JsonForm schema={schema}
                    uiSchema={localUiSchema}
                    formData={formState}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    onError={log("errors")}
          >
            <ElentaFormButton
              mutationLoading={mutationLoading}
              mutationError={mutationError}
              mutationData={mutationData}
            />
          </JsonForm>
        }

      </Container>
    );
  };

interface ElentaFormProps {
  schema: any,
  uiSchema?: any,
  rulesSchema?: any,
  query?: DocumentNode,
  mutation?: DocumentNode,
  queryVars?: object,
  mutationVars?: object,
  queryTransform?: any,
  mutationTransform?: any
}

ElentaForm.defaultProps = {
  uiSchema: {},
  rulesSchema: {},
  queryVars: {},
  mutationVars: {},
  queryTransform: (d) => d,
  mutationTransform: (d) => d
};

export default ElentaForm;

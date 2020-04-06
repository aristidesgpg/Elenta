import * as React from "react";
import Container from "react-bootstrap/Container";
import JsonForm from "react-jsonschema-form";
import {useParams} from "react-router-dom";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {DocumentNode, gql} from "apollo-boost";
import Spinner from "react-bootstrap/Spinner";
import {useEffect, useState} from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface ElentaFormProps {
  schema: any,
  uiSchema?: any,
  rulesSchema?: any,
  query?: DocumentNode,
  mutation?: DocumentNode,
  queryVars?: object,
  mutationVars?: object
}

export const ElentaForm: React.FunctionComponent<ElentaFormProps> =
  ({
     schema,
     uiSchema,
     rulesSchema,
     query,
     mutation,
     queryVars,
     mutationVars
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
          let newState = _.pick(queryData[Object.keys(queryData)[0]], Object.keys(schema.properties));
          setFormState(newState);
          onChange({formData: newState});
        }
      }

      if (mutation && mutationData) {
        let newState = _.pick(mutationData[Object.keys(mutationData)[0]], Object.keys(schema.properties));
        setFormState(newState);
        onChange({formData: newState});
      }
    }, [queryData, mutationData]);

    const onSubmit = ({formData}, e) => {
      e.preventDefault();
      setFormState(formData);
      runMutation({variables: {input: Object.assign(mutationVars, formData)}});
    };

    const onChange = ({formData}) => {
      setFormState(formData);
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
              delete tempUiSchema[f]["ui:widget"];
            } else if (localUiSchema[f]) {
              _.set(tempUiSchema, f + '.ui:widget', 'hidden');
            }
          }
        });
        setLocalUiSchema(tempUiSchema);
      }
    };

    const log = (type) => console.log.bind(console, type);

    if (queryError) return (
      <Alert variant="danger" transition={null}>Something went wrong, please try again</Alert>
    );

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
            <div>
              <Button type="submit">
                {
                  mutationLoading ?
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> : "Submit"
                }
              </Button>
              {
                mutationData &&
                <Alert variant="success" transition={null}>Success!</Alert>
              }
              {
                mutationError &&
                <Alert variant='danger' transition={null}>
                  Form Error please try again
                </Alert>
              }
            </div>
          </JsonForm>
        }

      </Container>
    );
  };

export default ElentaForm;

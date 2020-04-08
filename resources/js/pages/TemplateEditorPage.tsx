import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {GET_TEMPLATE, UPSERT_MODULE} from "../graphql/queries";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ModuleEditor from "../components/modules/ModuleEditor";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {useEffect, useState} from "react";
import _ from "lodash";
import Col from "react-bootstrap/Col";

export const TemplateEditorPage = () => {
  let {id} = useParams();

  const [template, setTemplate] = useState(null);
  const {loading, error, data} = useQuery(GET_TEMPLATE, {variables: {id}});
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

  const addModule = () => {
    runMutation({
      variables: {
        input: {
          title: "New Module",
          description: "Module description",
          owner: {
            connect: "6ee525f9-c935-4117-85a2-3a9a52e83300"
          },
          templates: {
            connect: [data.getTemplate.id]
          }
        }
      }
    });
  };

  if (data && !template) {
    setTemplate(data.getTemplate);
  }

  useEffect(() => {
    if (mutationData) {
      let newState = _.cloneDeep(template);
      newState.modules.push(mutationData.upsertModule);
      setTemplate(newState);
    }
  }, [mutationData]);


  // TODO: Passing mutation* for the button here is a sloppy abstraction - need to clean it up
  return (
    <LoadingContainer loading={loading} error={error}>
      <Tabs defaultActiveKey="modules" id="template-editor" transition={false}>
        <Tab eventKey="modules" title="Content">
          <ModuleEditor
            modules={template ? template.modules : {}}
            addModule={addModule}
            buttonLoading={mutationLoading}
            buttonError={mutationError}
            buttonData={mutationData}
          />
        </Tab>
        <Tab eventKey="learners" title="Learners">
          test
        </Tab>
        <Tab eventKey="results" title="Results">
          test
        </Tab>
      </Tabs>
    </LoadingContainer>
  )
};

export default TemplateEditorPage;

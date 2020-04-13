import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {CURRENT_USER, GET_TEMPLATE, UPSERT_MODULE} from "../graphql/queries";
import Tab from "react-bootstrap/Tab";
import ModuleEditor from "../components/modules/ModuleEditor";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {useEffect, useState} from "react";
import _ from "lodash";
import Nav from "react-bootstrap/Nav";

export const TemplateEditorPage = () => {
  let {id} = useParams();

  //TODO: Can we fetch the current profile too, based on the nav?
  const {data: {user}} = useQuery(CURRENT_USER);

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
            connect: user.consultantProfile[0].id
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
      <Tab.Container defaultActiveKey="modules" id="template-editor" transition={false}>
        <Nav variant="tabs" fill className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="modules">Modules</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="learners">Learners</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="results">Results</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="modules" title="Content">
            <ModuleEditor
              modules={template ? template.modules : {}}
              addModule={addModule}
              buttonLoading={mutationLoading}
              buttonError={mutationError}
              buttonData={mutationData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="requests" title="Requests">
            test
          </Tab.Pane>
          <Tab.Pane eventKey="programs" title="Programs">
            test
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </LoadingContainer>
  )
};

export default TemplateEditorPage;

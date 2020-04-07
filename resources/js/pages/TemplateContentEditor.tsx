import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";
import {useParams} from "react-router-dom";
import ModuleList from "../components/modules/ModuleList";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../components/builder/Form";
import {GET_TEMPLATE, UPSERT_MODULE} from "../graphql/queries";
import Tabs from "react-bootstrap/Tabs";
import ModuleSettingsEditor from "../components/modules/ModuleSettingsEditor";
import Tab from "react-bootstrap/Tab";
import ElentaFormButton from "../components/elenta-form/ElentaFormButton";
import _ from "lodash";

export const TemplateContentEditor = () => {
  const [formReminder, setFormReminder] = useState(null);
  const [formTrigger, setFormTrigger] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  let {id} = useParams();
  const {loading, error, data} = useQuery(GET_TEMPLATE, {variables: {id}});
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

  useEffect(() => {
    if (activeModule){
      setFormReminder(_.omit(activeModule.reminders[0], "__typename"));
      setFormTrigger(_.omit(activeModule.triggers[0], "__typename"));
    }
  }, [activeModule]);

  const onSubmit = () => {
    runMutation({
      variables: {
        input: {
          id: activeModule.id,
          reminders: {
            upsert: [
              formReminder
            ]
          },
          triggers: {
            upsert: [
              formTrigger
            ]
          }
        }
      }
    });
  };

  if (loading) return <Spinner animation="border"/>;
  if (error) return <p>Error :(</p>;

  if (data && data.getTemplate.modules.length > 0 && !activeModule) {
    setActiveModule(data.getTemplate.modules[0]);
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <ModuleList modules={data.getTemplate.modules}
                      activeModule={activeModule}
                      setActiveModule={setActiveModule}/>
        </Col>
        <Col>
          <ElentaFormButton
            onClick={onSubmit}
            mutationLoading={mutationLoading}
            mutationError={mutationError}
            mutationData={mutationData}
          />
          <Tabs defaultActiveKey="content" id="module-editor" transition={false}>
            <Tab eventKey="content" title="Content">
              <Form/>
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <ModuleSettingsEditor
                reminder={formReminder}
                trigger={formTrigger}
                setFormReminder={setFormReminder}
                setFormTrigger={setFormTrigger}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
};

export default TemplateContentEditor;

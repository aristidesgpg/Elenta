import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import Spinner from "react-bootstrap/Spinner";
import {useParams} from "react-router-dom";
import ModuleList from "./ModuleList";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ElentaFormBuilder from "../builder/ElentaFormBuilder";
import {UPSERT_MODULE} from "../../graphql/queries";
import Tabs from "react-bootstrap/Tabs";
import ModuleSettingsEditor from "./ModuleSettingsEditor";
import Tab from "react-bootstrap/Tab";
import ElentaFormButton from "../elenta-form/ElentaFormButton";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export const ModuleEditor =
  ({
     modules,
     addModule,
     buttonLoading,
     buttonError,
     buttonData
   }) => {
    const [formReminder, setFormReminder] = useState(null);
    const [formTrigger, setFormTrigger] = useState(null);
    const [activeModule, setActiveModule] = useState(modules[0]);

    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

    useEffect(() => {
      setFormReminder(_.omit(activeModule.reminders[0], "__typename"));
      setFormTrigger(_.omit(activeModule.triggers[0], "__typename"));
    }, [activeModule]);

    useEffect(() => {
      if (buttonData) {
        setActiveModule(buttonData.upsertModule);
      }
    }, [buttonData]);

    const onSave = () => {
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

    return (
      <Container className="pl-0 pr-0 pt-4">
        <Row>
          <Col md={3}>
            <ModuleList modules={modules}
                        activeModule={activeModule}
                        setActiveModule={setActiveModule}
            />
            <ElentaFormButton
              onClick={addModule}
              mutationLoading={buttonLoading}
              mutationError={buttonError}
              mutationData={buttonData}
              title="Add Module"
            />
          </Col>
          <Col>
            <Tab.Container defaultActiveKey="content" id="module-editor" transition={false}>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="content">Content</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                  </Nav.Item>
                  <ElentaFormButton
                    className="ml-auto"
                    title="Save Module"
                    onClick={onSave}
                    mutationLoading={mutationLoading}
                    mutationError={mutationError}
                    mutationData={mutationData}
                  />
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="content" title="Content">
                    <ElentaFormBuilder schema={{}} uiSchema={{}} onSave ={(schema,uiSchema)=>{}}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings" title="Settings">
                    <ModuleSettingsEditor
                      reminder={formReminder}
                      trigger={formTrigger}
                      setFormReminder={setFormReminder}
                      setFormTrigger={setFormTrigger}
                    />
                  </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    )
  };

export default ModuleEditor;

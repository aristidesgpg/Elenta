import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import ModuleList from "./ModuleList";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ElentaFormBuilder from "../builder/ElentaFormBuilder";
import {UPSERT_MODULE} from "../../graphql/queries";
import ModuleSettingsEditor from "./ModuleSettingsEditor";
import Tab from "react-bootstrap/Tab";
import ElentaFormButton from "../elenta-form/ElentaFormButton";
import _ from "lodash";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {RIEInput, RIETextArea} from "riek";

export const ModuleEditor =
  ({
     modules,
     addModule,
     buttonLoading,
     buttonError,
     buttonData
   }) => {
    const [formContent, setFormContent] = useState({
      schema: {
        type: "object",
        properties: {}
      },
      uiSchema: {
        "ui:order": []
      }
    });
    const [formReminder, setFormReminder] = useState(null);
    const [formTrigger, setFormTrigger] = useState(null);
    const [activeModule, setActiveModule] = useState(modules[0]);

    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

    useEffect(() => {
      if (activeModule) {
        setFormReminder(_.omit(activeModule.reminders[0], "__typename"));
        setFormTrigger(_.omit(activeModule.triggers[0], "__typename"));
        if (activeModule.content) setFormContent(JSON.parse(activeModule.content));
      }
    }, [activeModule]);

    useEffect(() => {
      if (buttonData) {
        setActiveModule(buttonData.upsertModule);
      }
    }, [buttonData]);

    const updateModuleList = (d) => {
      setActiveModule(Object.assign(activeModule, d));
    };

    const onSave = () => {
      runMutation({
        variables: {
          input: {
            id: activeModule.id,
            title: activeModule.title,
            description: activeModule.description,
            reminders: {
              upsert: [
                formReminder
              ]
            },
            triggers: {
              upsert: [
                formTrigger
              ]
            },
            content: JSON.stringify(formContent)
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
            <Row>
              <Col md={9}>
                <Form>
                  <Form.Group>
                    <Form.Label>Title: </Form.Label>
                    <RIEInput
                      value={activeModule ? activeModule.title : ""}
                      change={updateModuleList}
                      propName='title'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description: </Form.Label>
                    <RIETextArea
                      value={activeModule ? activeModule.description : ""}
                      change={updateModuleList}
                      propName='description'
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <ElentaFormButton
                  title="Save Module"
                  onClick={onSave}
                  mutationLoading={mutationLoading}
                  mutationError={mutationError}
                  mutationData={mutationData}
                />
              </Col>
            </Row>
            <Tab.Container defaultActiveKey="content" id="module-editor" transition={false}>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="content">Content</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings">Settings</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="content" title="Content">
                  <ElentaFormBuilder
                    schema={formContent.schema}
                    uiSchema={formContent.uiSchema}
                    onSave={(schema, uiSchema) => {
                      let o = {
                        schema: schema,
                        uiSchema: uiSchema
                      };
                      setFormContent(o);
                    }}
                  />
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

import * as React from "react";
import {useMutation} from '@apollo/react-hooks';
import ModuleList from "./ModuleList";
import {useContext, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ElentaFormBuilder from "../ElentaFormBuilder/ElentaFormBuilder";
import {UPSERT_MODULE} from "../../../graphql/queries";
import ModuleSettingsEditor from "./ModuleSettingsEditor";
import Tab from "react-bootstrap/Tab";
import _ from "lodash";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import {RIEInput, RIETextArea} from "riek";
import {Button} from "react-bootstrap";
import {ToastContext} from "../../../contexts/ToastContext";
import LoadingContainer from "../../hoc/LoadingContainer/LoadingContainer";

export const ModuleEditor =
  ({
     modules: templateModules,
     addModule,
     saveModulesOrder,
     deleteModules,
     duplicateModules,
     recipientLists
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
    const [modules, setModules] = useState(templateModules);
    const [activeModule, setActiveModule] = useState(modules[0]);
    const [recipientList, setRecipientList] = useState(null);

    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

    const toastContext = useContext(ToastContext)

    useEffect(() => {
      if (activeModule) {
        if (activeModule.reminder) setFormReminder(_.omit(activeModule.reminder, "__typename"));
        if (activeModule.trigger) setFormTrigger(_.omit(activeModule.trigger, "__typename"));
        if (activeModule.content) setFormContent(JSON.parse(activeModule.content));
        if (activeModule.pivot) setRecipientList(recipientLists.filter(rl => rl.id == activeModule.pivot.recipient_list_id)[0]);
      }
    }, [activeModule]);

    useEffect(() => {
      if (!_.isEqual(templateModules, modules)) {
        setModules(templateModules);
      }
    }, [templateModules]);

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
            reminder: {
              upsert: formReminder
            },
            trigger: {
              upsert: formTrigger
            },
            content: JSON.stringify(formContent)
          }
        }
      }).then(r => {
        toastContext.addToast({header: "Success!", body: "Saved"});
      });
    };

    const addFolder = () => {
      const title = `New Folder ${Math.round(Math.random() * 1e6)}`;
      const newModules = [
        {
          id: title,
          title: title,
          isFolder: true,
          pivot: {order: 0, folder: null},
          modules: []
        },
        ...modules
      ];
      setModules(newModules);
    };

    return (
      <LoadingContainer loading={mutationLoading} error={mutationError} className="pl-0 pr-0 pt-4">
        <Row>
          <Col md={3}>
            <Button type="submit" onClick={addFolder} className="w-100">
              Add Folder
            </Button>
            <ModuleList modules={modules}
                        activeModule={activeModule}
                        setActiveModule={setActiveModule}
                        saveModulesOrder={saveModulesOrder}
                        deleteModules={deleteModules}
                        duplicateModules={duplicateModules}
            />
            <Button onClick={addModule}>Add Module</Button>
          </Col>

          <Col>
            {activeModule &&
            <Row>
              <Col md={9}>
                <Form>
                  <Form.Group>
                    <h5>Title</h5>
                    <RIEInput
                      value={activeModule ? activeModule.title : ""}
                      change={updateModuleList}
                      propName='title'
                    />
                  </Form.Group>
                  <Form.Group>
                    <h5>Description</h5>
                    <RIETextArea
                      value={activeModule ? activeModule.description || "" : ""}
                      change={updateModuleList}
                      propName='description'
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Button onClick={onSave}>Save Module</Button>
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
                      setFormContent({
                        schema: schema,
                        uiSchema: uiSchema
                      });
                    }}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="settings" title="Settings">
                  <ModuleSettingsEditor
                    reminder={formReminder}
                    trigger={formTrigger}
                    setFormReminder={setFormReminder}
                    setFormTrigger={setFormTrigger}
                    recipientLists={recipientLists}
                    recipientList={recipientList}
                    setRecipientList={setRecipientList}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            }
            {!activeModule &&
              <p>Add Module</p>
            }
          </Col>
        </Row>
      </LoadingContainer>
    )
  };

export default ModuleEditor;

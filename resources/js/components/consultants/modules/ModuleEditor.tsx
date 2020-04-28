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
import {immutableMerge} from "../../../utils/utils";
import {Link} from "react-router-dom";

const defaultContent = {
  schema: {
    type: "object",
    properties: {}
  },
  uiSchema: {
    "ui:order": []
  }
};

// TODO: Refactor to be PivotModuleEditor that lists Program/TemplateModules
export const ModuleEditor =
  ({
     modules: templateModules,
     pivotModules,
     addModule,
     addFolder,
     saveModulesOrder,
     deleteModules,
     duplicateModules,
     recipientLists,
     updateRecipientList,
     updateModule,
     activeModule,
     setActiveModule,
     sendModule
   }) => {
    const [formContent, setFormContent] = useState(defaultContent);
    const [formReminder, setFormReminder] = useState(null);
    const [formTrigger, setFormTrigger] = useState(null);
    const [recipientList, setRecipientList] = useState(null);
    const [tagList, setTagList] = useState(null);

    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

    const toastContext = useContext(ToastContext)

    useEffect(() => {
      if (activeModule) {
        if (activeModule.reminder) setFormReminder(_.omit(activeModule.reminder, "__typename"));
        if (activeModule.trigger) setFormTrigger(_.omit(activeModule.trigger, "__typename"));
        if (activeModule.content) {
          setFormContent(JSON.parse(activeModule.content));
        } else {
          setFormContent(defaultContent);
        }
        if (activeModule.pivot) setRecipientList(recipientLists.filter(rl => rl.id == activeModule.pivot.recipient_list_id)[0]);
        if (pivotModules.length > 0) {
          const pivotModule = pivotModules.filter((pmItem) => {
            return (pmItem.id == activeModule.pivot.id)
          });
          if (pivotModule.length > 0) {
            const parsedTagList = JSON.parse(pivotModule[0].module_variables);
            setTagList(parsedTagList);
          }
        }
      }
    }, [activeModule]);

    const updateModuleList = (d) => {
      setActiveModule(immutableMerge(activeModule, d));
    };

    const onSave = () => {
      let input = immutableMerge(activeModule, {
        reminder: formReminder,
        trigger: formTrigger,
        content: JSON.stringify(formContent)
      });
      delete input.reminder['__typename'];
      delete input.trigger['__typename'];
      delete input['__typename'];
      updateModule(input);
      if (activeModule && recipientList && recipientList.id !== activeModule.pivot.recipient_list_id) {
        updateRecipientList(recipientList, activeModule)
      }
    };

    return (
      <LoadingContainer loading={mutationLoading} error={mutationError} className="pl-0 pr-0 pt-4">
        <Row>
          <Col md={3} className="p-0 pr-3 border-right">
            <Row className="pb-2 ml-2 mr-2">
              <Link to={window.location.pathname.replace('content', 'settings')}>Edit Settings</Link>
            </Row>
            <ModuleList modules={templateModules}
                        activeModule={activeModule}
                        setActiveModule={setActiveModule}
                        saveModulesOrder={saveModulesOrder}
                        deleteModules={deleteModules}
                        duplicateModules={duplicateModules}
            />
            <Row className="pt-2">
              <div className="m-auto">
                <Button variant="outline-primary" onClick={addFolder}>
                  + Folder
                </Button>
                <Button variant="outline-primary" onClick={addModule}>
                  + Module
                </Button>
              </div>
            </Row>
          </Col>

          <Col>
            {activeModule &&
            <>
              <Row className="pb-1 mr-0" style={{justifyContent: "flex-end"}}>
                {sendModule &&
                <Button variant="outline-primary" onClick={() => sendModule(activeModule)}>Send Module</Button>
                }
                <Button className="ml-1" onClick={onSave}>Save Module</Button>
              </Row>
              <Tab.Container defaultActiveKey="content" id="module-editor" transition={false}>
                <Nav variant="tabs" fill className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="content">Content</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="content" title="Content">
                    <div className="ml-3">
                      <Form.Group>
                        <h5>Title</h5>
                        <RIEInput
                          value={activeModule ? activeModule.title || "Module Title" : "Module Title"}
                          change={updateModuleList}
                          propName='title'
                          defaultProps={{
                            style: {
                              border: "1px dashed lightgrey",
                              padding: "10px",
                              width: "150px"
                            }
                          }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <h5>Description</h5>
                        <RIETextArea
                          value={activeModule ? activeModule.description || "Module Description" : "Module Description"}
                          change={updateModuleList}
                          propName='description'
                          defaultProps={{
                            style: {
                              border: "1px dashed lightgrey",
                              padding: "10px",
                              width: "150px"
                            }
                          }}
                        />
                      </Form.Group>
                    </div>
                    <ElentaFormBuilder
                      schema={formContent.schema}
                      uiSchema={formContent.uiSchema}
                      tagList={tagList}
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
            </>
            }
            {!activeModule &&
            <h4 style={{
              textAlign: "center",
              width: "50%",
              margin: "auto",
              verticalAlign: "middle"
            }}
            >
              It looks like you don't have any Modules yet. Get started by creating one on the left.</h4>
            }
          </Col>
        </Row>
      </LoadingContainer>
    )
  };

export default ModuleEditor;

import * as React from "react";
import {useMutation} from '@apollo/react-hooks';
import ModuleList from "./ModuleList";
import {useContext, useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {UPSERT_MODULE} from "../../../graphql/queries";
import _ from "lodash";
import {Button} from "react-bootstrap";
import {ToastContext} from "../../../contexts/ToastContext";
import LoadingContainer from "../../hoc/LoadingContainer/LoadingContainer";
import {immutableMerge} from "../../../utils/utils";
import {Link} from "react-router-dom";
import ModuleEditor from "./ModuleEditor";
import ModuleViewer from "./ModuleViewer";
import introJs from 'intro.js';
import 'intro.js/introjs.css';

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
export const Modules =
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
     sendModule,
     isModuleEditable,
     setModuleEditable,
     programModules,
     learners,
     maxLearners
   }) => {
    const [formContent, setFormContent] = useState(defaultContent);
    const [formReminder, setFormReminder] = useState(null);
    const [formTrigger, setFormTrigger] = useState(null);
    const [recipientList, setRecipientList] = useState(null);
    const [tagList, setTagList] = useState(null);

    const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

    const toastContext = useContext(ToastContext);

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
      introJs().start();
    }, [activeModule]);

    useEffect(() => {
      if (activeModule && programModules) {
        setModuleEditable(programModules.some(programModule => programModule.module.id === activeModule.id
          ? programModule.sends !== null && programModule.sends.length > 0
          : false))
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
                        programModules={programModules}
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
            {activeModule && (isModuleEditable
              ? <ModuleEditor
                activeModule={activeModule}
                updateModuleList={updateModuleList}
                sendModule={sendModule}
                onSave={onSave}
                tagList={tagList}
                formContent={formContent}
                setFormContent={setFormContent}
                formReminder={formReminder}
                formTrigger={formTrigger}
                setFormReminder={setFormReminder}
                setFormTrigger={setFormTrigger}
                recipientLists={recipientLists}
                recipientList={recipientList}
                setRecipientList={setRecipientList}
              />
              : <ModuleViewer
                activeModule={activeModule}
                formContent={formContent}
                learners={learners}
                maxLearners={maxLearners}
              />
)
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

export default Modules;

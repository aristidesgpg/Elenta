import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import Spinner from "react-bootstrap/Spinner";
import {useParams} from "react-router-dom";
import ModuleList from "./ModuleList";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../builder/Form";
import {UPSERT_MODULE} from "../../graphql/queries";
import Tabs from "react-bootstrap/Tabs";
import ModuleSettingsEditor from "./ModuleSettingsEditor";
import Tab from "react-bootstrap/Tab";
import ElentaFormButton from "../elenta-form/ElentaFormButton";
import _ from "lodash";
import Button from "react-bootstrap/Button";

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
      <Container>
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
            <ElentaFormButton
              onClick={onSave}
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

export default ModuleEditor;

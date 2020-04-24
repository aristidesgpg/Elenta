import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {
  CURRENT_USER,
  CURRENT_USER_PROFILE,
  GET_TEMPLATE,
  UPDATE_TEMPLATE_MODULES,
  DUPLICATE_TEMPLATE_MODULES,
  UPSERT_MODULE
} from "../../graphql/queries";
import Tab from "react-bootstrap/Tab";
import ModuleEditor from "../../components/consultants/modules/ModuleEditor";
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import {useEffect, useState} from "react";
import _ from "lodash";
import Nav from "react-bootstrap/Nav";
import TemplateRequestTable from "../../components/consultants/templates/TemplateRequestTable";

export const TemplateEditorPage = () => {
  let {id} = useParams();

  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  const [template, setTemplate] = useState(null);
  const {loading, error, data} = useQuery(GET_TEMPLATE, {variables: {id}});
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);
  const [updateTemplateModulesMutation, {loading: updateMutationLoading, error: updateMutationError, data: updateMutationData}] = useMutation(UPDATE_TEMPLATE_MODULES);
  const [duplicateModulesMutation, {loading: duplicateMutationLoading, error: duplicateMutationMutationError, data: duplicateMutationData}] = useMutation(DUPLICATE_TEMPLATE_MODULES);

  const addModule = () => {
    runMutation({
      variables: {
        input: {
          title: "New Module",
          description: "Module description",
          owner: {
            connect: userProfile.id
          },
          templates: {
            connect: [data.getTemplate.id]
          }
        }
      }
    });
  };

  const saveModulesOrder = (modules) => {
    updateTemplateModulesMutation({
      variables: {
        input: {
          id: template.id,
          templateModules: {
            upsert: modules
          }
        }
      }
    });
  };

  const deleteModules = (modules) => {
    updateTemplateModulesMutation({
      variables: {
        input: {
          id: template.id,
          templateModules: {
            delete: modules
          }
        }
      }
    });
  };

  const duplicateModules = (modules) => {
    duplicateModulesMutation({
      variables: {
        input: {
          id: template.id,
          type: 'template',
          modules
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
      const module = {...mutationData.upsertModule, pivot: _.get(mutationData, "upsertModule.templates.0.pivot", {})};
      delete module.templates;
      newState.modules.push(module);
      setTemplate(newState);
    }
    if (updateMutationData) {
      let newState = _.cloneDeep(template);
      newState.modules = updateMutationData.updateTemplateModules.modules;
      setTemplate(newState);
    }
    if (duplicateMutationData) {
      let newState = _.cloneDeep(template);
      newState.modules = duplicateMutationData.duplicateTemplateModules.modules;
      setTemplate(newState);
    }
  }, [mutationData, updateMutationData, duplicateMutationData]);


  return (
    <LoadingContainer
      loading={[updateMutationLoading, duplicateMutationLoading, loading]}
      error={[updateMutationError, duplicateMutationMutationError, error]}
    >
      <Tab.Container defaultActiveKey="modules" id="template-editor" transition={false}>
        <Nav variant="tabs" fill className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="modules">Modules</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="requests">Requests</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="modules" title="Content">
            <ModuleEditor
              modules={template ? template.modules : []}
              addModule={addModule}
              saveModulesOrder={saveModulesOrder}
              deleteModules={deleteModules}
              duplicateModules={duplicateModules}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="requests" title="Requests">
            <TemplateRequestTable requests={template ? template.requests : []}/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </LoadingContainer>
  )
};

export default TemplateEditorPage;

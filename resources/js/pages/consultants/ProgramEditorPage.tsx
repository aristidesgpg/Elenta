import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {
  CURRENT_USER_PROFILE, DUPLICATE_PROGRAM_MODULES,
  GET_PROGRAM,
  UPDATE_PROGRAM_MODULES,
  UPSERT_MODULE
} from "../../graphql/queries";
import Tab from "react-bootstrap/Tab";
import ModuleEditor from "../../components/consultants/modules/ModuleEditor";
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import {useEffect, useState} from "react";
import _ from "lodash";
import ProgramLearnerTable from "../../components/consultants/programs/ProgramLearnerTable";
import Nav from "react-bootstrap/Nav";
import ProgramInviteTool from "../../components/consultants/programs/ProgramInvite/ProgramInviteTool";
import ProgramInviteTable from "../../components/consultants/programs/ProgramInvite/ProgramInviteTable";

export const ProgramEditorPage = (props) => {
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

  const [program, setProgram] = useState(props.program);

  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);
  const [updateProgramModulesMutation, {loading: updateMutationLoading, error: updateMutationError, data: updateMutationData}] = useMutation(UPDATE_PROGRAM_MODULES);
  const [duplicateModulesMutation, {loading: duplicateMutationLoading, error: duplicateMutationMutationError, data: duplicateMutationData}] = useMutation(DUPLICATE_PROGRAM_MODULES);

  const addModule = () => {
    runMutation({
      variables: {
        input: {
          title: "New Module",
          description: "Module description",
          owner: {
            connect: userProfile.id
          },
          programs: {
            connect: [program.id]
          }
        }
      }
    });
  };

  const saveModulesOrder = (modules) => {
    updateProgramModulesMutation({
      variables: {
        input: {
          id: program.id,
          programModules: {
            upsert: modules
          }
        }
      }
    });
  };

  const deleteModules = (modules) => {
    updateProgramModulesMutation({
      variables: {
        input: {
          id: program.id,
          programModules: {
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
          id: program.id,
          type: 'program',
          modules
        }
      }
    });
  };

  useEffect(() => {
    if (mutationData) {
      let newState = _.cloneDeep(program);
      const module = {...mutationData.upsertModule, pivot: _.get(mutationData, "upsertModule.programs.0.pivot", {})};
      delete module.programs;
      newState.modules.push(module);
      setProgram(newState);
    }
    if (updateMutationData) {
      let newState = _.cloneDeep(program);
      newState.modules = updateMutationData.updateProgramModules.modules;
      setProgram(newState);
    }
    if (duplicateMutationData) {
      let newState = _.cloneDeep(program);
      newState.modules = duplicateMutationData.duplicateProgramModules.modules;
      setProgram(newState);
    }
  }, [mutationData, updateMutationData, duplicateMutationData]);

  return (
    <LoadingContainer
      loading={[updateMutationLoading, duplicateMutationLoading]}
      error={[updateMutationError, duplicateMutationMutationError]}
    >
      <Tab.Container defaultActiveKey="modules" id="program-editor" transition={false}>
        <Nav variant="tabs" fill className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="modules">Modules</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="learners">Learners</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="invites">Invites</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="modules" title="Content">
            <ModuleEditor
              modules={program ? program.modules : []}
              addModule={addModule}
              saveModulesOrder={saveModulesOrder}
              deleteModules={deleteModules}
              duplicateModules={duplicateModules}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="learners" title="Learners">
            {program &&
              <ProgramLearnerTable program={program}/>
            }
          </Tab.Pane>
          <Tab.Pane eventKey="invites" title="Invites">
            <h3>Invites</h3>
            <ProgramInviteTable invites={program ? program.invites : []} />
            <h3>Invite by Email</h3>
            <ProgramInviteTool program={program}/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </LoadingContainer>
  )
};

export default ProgramEditorPage;

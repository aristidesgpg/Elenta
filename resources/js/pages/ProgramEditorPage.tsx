import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {CURRENT_USER_PROFILE, GET_PROGRAM, UPSERT_MODULE} from "../graphql/queries";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ModuleEditor from "../components/modules/ModuleEditor";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {useEffect, useState} from "react";
import _ from "lodash";
import ProgramLearnerTable from "../components/programs/ProgramLearnerTable";
import Nav from "react-bootstrap/Nav";

export const ProgramEditorPage = () => {
  let {id} = useParams();

  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);
  const [program, setProgram] = useState(null);
  const {loading, error, data} = useQuery(GET_PROGRAM, {variables: {id}});
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPSERT_MODULE);

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
            connect: [data.getProgram.id]
          }
        }
      }
    });
  };

  if (data && !program) {
    setProgram(data.getProgram);
  }

  useEffect(() => {
    if (mutationData) {
      let newState = _.cloneDeep(program);
      newState.modules.push(mutationData.upsertModule);
      setProgram(newState);
    }
  }, [mutationData]);

  // TODO: Passing mutation* for the button here is a sloppy abstraction - need to clean it up
  return (
    <LoadingContainer loading={loading} error={error}>
      <Tab.Container defaultActiveKey="modules" id="program-editor" transition={false}>
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
              modules={program ? program.modules : {}}
              addModule={addModule}
              buttonLoading={mutationLoading}
              buttonError={mutationError}
              buttonData={mutationData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="learners" title="Learners">
            <ProgramLearnerTable
              program={program}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="results" title="Results">
            test
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </LoadingContainer>
  )
};

export default ProgramEditorPage;

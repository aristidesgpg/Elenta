import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import {useParams} from "react-router-dom";
import {GET_LEARNER_PROFILE, LEARNER_GET_PROGRAM, UPDATE_PROGRAM_MODULE_SEND} from "../../graphql/queries";
import ProgramModuleSendEditor from "../../components/learners/ProgramModuleSendEditor/ProgramModuleSendEditor";
import ProgramModuleList from "../../components/learners/ProgramModuleList/ProgramModuleList";
import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import _ from "lodash";
import {ProgramModule, Module, Maybe} from "../../graphql/graphql-generated";
import {immutableMerge} from "../../utils/utils";

export const ProgramLearnerPage = () => {
  let {id} = useParams();

  const [formData, setFormData] = useState(null);
  const [activeProgramModule, setActiveProgramModule] = useState(null);

  const {loading: queryLoading, error: queryError, data: queryData} = useQuery(LEARNER_GET_PROGRAM, {variables: {id: id}});
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPDATE_PROGRAM_MODULE_SEND);

  const update = () => {
    let submitData = _.cloneDeep(formData);
    submitData.response_data = JSON.stringify(submitData.response_data);
    submitData.id = activeProgramModule.send.id;
    delete submitData.response_timestamp;

    runMutation({
      variables: {
        input: submitData
      }
    });
  };

  const setModule = (module: Module) => {
    setActiveProgramModule(queryData.getProgram.programModules.filter((pm => pm.module.id == module.id))[0]);
  };

  useEffect(() => {
    if (queryData) {
      setActiveProgramModule(queryData.getProgram.programModules[0]);
    }
  }, [queryData]);

  useEffect(() => {
    if (activeProgramModule) {
      setFormData({
        response_data: JSON.parse(activeProgramModule.send.response_data),
        response_rating: activeProgramModule.send.response_rating,
        response_feedback: activeProgramModule.send.response_feedback,
        response_timestamp: activeProgramModule.send.response_timestamp,
        id: activeProgramModule.send.id
      });
    }
  }, [activeProgramModule]);

  return (
    <LoadingContainer
      loading={[mutationLoading, queryLoading]}
      error={[mutationError, queryError]}>
      {queryData && activeProgramModule && formData &&
      <>
        <Row>
          <Col md={3}>
            <ProgramModuleList
              modules={queryData.getProgram.programModules.map(pm => pm.module)}
              activeModule={activeProgramModule.module}
              setActiveModule={setModule}
            />
          </Col>
          <Col>
            <ProgramModuleSendEditor
              module={activeProgramModule.module}
              formData={formData}
              onChange={d => setFormData(immutableMerge(formData, d))}
              onSubmit={update}
            />
          </Col>
        </Row>
      </>
      }
    </LoadingContainer>
  )
};

export default ProgramLearnerPage;

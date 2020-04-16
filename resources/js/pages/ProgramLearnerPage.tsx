import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import LoadingContainer from "../components/component-container/LoadingContainer";
import {useParams} from "react-router-dom";
import {GET_LEARNER_PROFILE} from "../graphql/queries";
import ProgramModuleSendEditor from "../components/learners/ProgramModuleSendEditor";

export const ProgramLearnerPage = () => {
  let {id} = useParams();
  const {loading, error, data} = useQuery(GET_LEARNER_PROFILE, {
    variables: {user_id: id},
  });

  return (
    <LoadingContainer loading={loading} error={error}>
      {data &&
        <ProgramModuleSendEditor programModuleSend={data.getLearnerProfile.programs[1].programModules[0].sends[0]}/>
      }
    </LoadingContainer>
  )
};

export default ProgramLearnerPage;

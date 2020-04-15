import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {CURRENT_USER, GET_LEARNER_PROFILE} from "../graphql/queries";
import LearnerProgramList from "../components/learners/LearnerProgramList";
import LearnerProgramInviteList from "../components/learners/LearnerProgramInviteList";

export const LearnerDashboard = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  const {loading, error, data} = useQuery(GET_LEARNER_PROFILE, {
    variables: {user_id: user.id},
  });

  return (
    <LoadingContainer loading={loading} error={error}>
      {data &&
      <div>
        {data.getLearnerProfile.programs.length > 0 &&
        <Container className="pb-4">
          <Row>
            <Col md={6}>
              <h3>Programs</h3>
            </Col>
          </Row>
          <hr/>
          <LearnerProgramList
            programs={data.getLearnerProfile.programs}
          />
        </Container>
        }
        {data.getLearnerProfile.programInvites.length > 0 &&
        <Container className="pb-4">
          <Row>
            <Col md={6}>
              <h3>Program Invitations</h3>
            </Col>
          </Row>
          <hr/>
          <LearnerProgramInviteList
            invites={data.getLearnerProfile.programInvites}
          />
        </Container>
        }
      </div>
      }
    </LoadingContainer>
  )
};

export default LearnerDashboard;

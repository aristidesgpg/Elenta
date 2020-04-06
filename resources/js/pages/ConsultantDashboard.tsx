import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";
import {useParams} from "react-router-dom";
import ModuleList from "../components/modules/ModuleList";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../components/builder/Form";
import TemplateTable from "../components/templates/TemplateTable";
import ProgramList from "../components/programs/ProgramList";

const GET_CONSULTANT_PROFILE = gql`
  query getConsultantProfile {
    getConsultantProfile(id: "c9933e52-2c60-440c-9fe8-42bb3320ab34") {
      id
      programs {
        id
        title
        format
        max_learners
        start_timestamp
        can_share
        is_public
        programModules {
          id
          module {
            id
            title
          }
          sends {
            id
            response_timestamp
          }
        }
        learners {
          id
        }
        invites {
          id
        }
      }
      templates {
        title
        can_request
        is_public
        requests {
          id
        }
        programs {
          id
        }
      }
    }
  }
`

export const ConsultantDashboard = () => {
  const {loading, error, data} = useQuery(GET_CONSULTANT_PROFILE);

  if (loading) return <Spinner animation="border"/>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <Container>
        <ProgramList
          programs={data.getConsultantProfile.programs}
        />
      </Container>
      <Container>
        <TemplateTable
          templates={data.getConsultantProfile.templates}
        />
      </Container>
    </Container>
  )
};

export default ConsultantDashboard;

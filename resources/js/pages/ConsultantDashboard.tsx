import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";
import {Redirect, useParams} from "react-router-dom";
import ModuleList from "../components/modules/ModuleList";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../components/builder/Form";
import TemplateTable from "../components/templates/TemplateTable";
import ProgramList from "../components/programs/ProgramList";
import LoadingContainer from "../components/component-container/LoadingContainer";
import {CURRENT_USER, GET_CONSULTANT_PROFILE} from "../graphql/queries";

export const ConsultantDashboard = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  const {loading, error, data} = useQuery(GET_CONSULTANT_PROFILE, {
    variables: {user_id: user.id},
  });

  return (
    <LoadingContainer loading={loading} error={error}>
      {data &&
      <>
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
      </>
      }
    </LoadingContainer>
  )
};

export default ConsultantDashboard;

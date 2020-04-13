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
import ElentaFormBuilder from "../components/builder/ElentaFormBuilder";
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
      <div>
        <Container>
          <h3>Programs</h3>
          <ProgramList
            programs={data.getConsultantProfile.programs}
            showCreate={data.getConsultantProfile.templates.length > 0}
          />
        </Container>
        <Container>
          <h3>Templates</h3>
          <TemplateTable
            templates={data.getConsultantProfile.templates}
          />
        </Container>
      </div>
      }
    </LoadingContainer>
  )
};

export default ConsultantDashboard;

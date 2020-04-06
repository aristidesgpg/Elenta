import * as React from "react";
import Container from "react-bootstrap/Container";
import ElentaNav from "./navbar/ElentaNav";
import Row from "react-bootstrap/Row";
import {useQuery} from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";
import {GET_ME} from "../../graphql/queries";

export const PageContainer = (props) => {
  const {loading, error, data} = useQuery(GET_ME);
  if (loading) return <Spinner animation="border"/>;
  if (error) return <p>Error :(</p>;

  return (
    <Container>
      <ElentaNav profiles={[data.getUser.consultantProfile[0]]}/>
      <Row lg={12}>
        {props.children}
      </Row>
    </Container>
  );
};

export default PageContainer;

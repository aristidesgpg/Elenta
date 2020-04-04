import * as React from "react";
import Container from "react-bootstrap/Container";
import ElentaNav from "./navbar/ElentaNav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";

//export const UserContext = React.createContext(undefined);

const GET_ME = gql`
  query me {
    getUser(id: "f99175c5-c3fe-48e5-a622-0b0efb7bdc67") {
      id
      name
      email
      email_verified_at
      learnerProfile {
        id
        picture_url
        role
        tenure
      }
      consultantProfile {
        id
        picture_url
        title
        bio
      }
    }
  }
`

export const PageContainer = (props) => {
  const {loading, error, data} = useQuery(GET_ME);
  if (loading) return <Spinner animation="border"/>;
  if (error) return <p>Error :(</p>;

  return (
//    <UserContext.Provider value={data.me}>
          <Container>
            <ElentaNav profiles={[data.getUser.consultantProfile[0]]}/>
            <Row lg={12}>
                {props.children}
            </Row>
          </Container>
//    </UserContext.Provider>
  );
};

export default PageContainer;

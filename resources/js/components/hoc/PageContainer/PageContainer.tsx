import * as React from "react";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import {Row, Container, Spinner} from "react-bootstrap";
import {get} from "lodash";
import LoadingContainer from "../LoadingContainer/LoadingContainer";
import ElentaNav from "../../shared/ElentaNav/ElentaNav";
import {GET_ME} from "../../../graphql/queries";
import {ToastContextProvider} from "../../../contexts/ToastContext";
import ElentaToastContainer from "../../shared/ElentaToast/ElentaToastContainer";

export const PageContainer = (props) => {
  const client = useApolloClient();
  const token = localStorage.getItem('token');

  let response = {
    loading: false,
    error: null,
    data: null
  };

  if (token) {
    const {loading, error, data} = useQuery(GET_ME);
    response = {...{loading, error, data}};
  }
  const {loading, error, data} = response;

  if (error) {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }
  // TODO change the logic of getting the correct profile
  const userProfile = get(data, 'me.consultantProfile', null);
  const user = get(data, 'me', null);
  client.writeData({
    data: {
      user,
      userProfile
    }
  });

  return (
    <>
      {
        !loading && !error &&
        <ToastContextProvider>
          <LoadingContainer loading={loading} error={error}>
            <ElentaNav/>
            <ElentaToastContainer/>
            <Row lg={12}>
              {props.children}
            </Row>
          </LoadingContainer>
        </ToastContextProvider>
      }
    </>
  );
};

export default PageContainer;

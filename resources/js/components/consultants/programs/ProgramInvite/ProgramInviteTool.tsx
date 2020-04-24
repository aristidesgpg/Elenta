import * as React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from "react-bootstrap/Form";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_PROGRAM_INVITES} from "../../../../graphql/queries";
import {useContext, useState} from "react";
import LoadingContainer from "../../../hoc/LoadingContainer/LoadingContainer";
import {ToastContext} from "../../../../contexts/ToastContext";
import Button from "react-bootstrap/Button";

export const ProgramInviteTool = ({program}) => {
  const [emails, setEmails] = useState("");
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(CREATE_PROGRAM_INVITES);

  const toastContext = useContext(ToastContext);

  const invite = () => {
    let vars = emails.split(",").map(e => {
      return {
        program: {
          connect: program.id
        },
        email: e,
        message: " "
      }
    });

    runMutation({
      variables: {input: vars}
    }).then(r => {
      toastContext.addToast({header: "Success!", body: "Saved"});
    });
  };

  const handleChange = (e) => {
    setEmails(e.target.value);
  };

  return (
    <LoadingContainer
      loading={mutationLoading}
      error={mutationError}
    >
      <Form.Group>
        <Form.Label>Emails (comma separated)</Form.Label>
        <Form.Control as="textarea" rows="4" value={emails} onChange={handleChange}/>
      </Form.Group>
      <Button onClick={invite}>Invite</Button>
    </LoadingContainer>
  );
};

export default ProgramInviteTool;

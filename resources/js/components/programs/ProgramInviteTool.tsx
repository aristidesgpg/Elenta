import * as React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_PROGRAM_INVITE} from "../../graphql/queries";
import {useState} from "react";

export const ProgramInviteTool = ({program}) => {
  const [emails, setEmails] = useState(null);
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(CREATE_PROGRAM_INVITE);

  const invite = () => {
    console.log(emails);
  };

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Emails</Form.Label>
        <Form.Control as="textarea" rows="10" value={emails} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={invite}>
        Invite
      </Button>
    </Form>
  );
};

export default ProgramInviteTool;

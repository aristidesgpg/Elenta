import * as React from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from "react-bootstrap/Form";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_PROGRAM_INVITES} from "../../../../graphql/queries";
import {useState} from "react";
import ElentaFormButton from "../../../shared/ElentaForm/ElentaFormButton";

export const ProgramInviteTool = ({program}) => {
  const [emails, setEmails] = useState("");
  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(CREATE_PROGRAM_INVITES);

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
    });
  };

  const handleChange = (e) => {
    setEmails(e.target.value);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Emails (comma separated)</Form.Label>
        <Form.Control as="textarea" rows="4" value={emails} onChange={handleChange}/>
      </Form.Group>
      <ElentaFormButton
        mutationLoading={mutationLoading}
        mutationError={mutationError}
        mutationData={mutationData}
        title="Invite"
        onClick={invite}
      />
    </Form>
  );
};

export default ProgramInviteTool;

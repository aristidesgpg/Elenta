import * as React from "react";
import JsonForm from "react-jsonschema-form";
import {ProgramModuleSend} from "../../graphql/graphql-generated";
import {useState} from "react";
import _ from "lodash";
import Container from "react-bootstrap/Container";
import ElentaFormButton from "../elenta-form/ElentaFormButton";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_PROGRAM_MODULE_SEND} from "../../graphql/queries";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./ProgramModuleSendEditor.scss";
import {formatDate} from "../../utils/utils";

export const ProgramModuleSendEditor: React.FunctionComponent<Props> = ({programModuleSend}) => {
  const [pms, setPms] = useState({
    response_data: JSON.parse(programModuleSend.response_data),
    response_rating: programModuleSend.response_rating,
    response_feedback: programModuleSend.response_feedback
  });

  const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPDATE_PROGRAM_MODULE_SEND);

  const update = () => {
    let submitData = _.cloneDeep(pms)
    submitData.response_data = JSON.stringify(submitData.response_data);
    submitData.id = programModuleSend.id;
    runMutation({
      variables: {
        input: submitData
      }
    });
  };

  const handleChange = (key, val) => {
    let newPms = _.cloneDeep(pms);
    newPms[key] = val;
    setPms(newPms);
  };

  // TODO: Think about anonymous replies
  // TODO: Should we make everything readonly?
  return (
    <Container>
      <h3>{programModuleSend.programModule.module.title}</h3>
      <h3>{programModuleSend.programModule.module.description}</h3>
      {
        programModuleSend.response_timestamp &&
        <small>Responded on {formatDate(programModuleSend.response_timestamp)}</small>
      }
      <JsonForm disabled={programModuleSend.response_timestamp}
                schema={JSON.parse(programModuleSend.programModule.module.content).schema}
                uiSchema={JSON.parse(programModuleSend.programModule.module.content).uiSchema}
                formData={pms.response_data}
                onChange={d => handleChange('response_data', d.formData)}
      >
        <hr/>
      </JsonForm>
      <Form>
        <Form.Group>
          <Form.Label className="pr-3">Was this module useful?</Form.Label>
          <ToggleButtonGroup name='response_rating' value={pms.response_rating}
                             onChange={e => handleChange('response_rating', e)}>
            <ToggleButton className="btn-danger" value={0}>
              <i className="fas fa-thumbs-down"/>
            </ToggleButton>
            <ToggleButton className="btn-success" value={1}>
              <i className="fas fa-thumbs-up"/>
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>What would you do to improve this module?</Form.Label>
          <Form.Control as="textarea" rows="2" value={pms.response_feedback}
                        onChange={e => handleChange('response_feedback', (e.target as HTMLInputElement).value)}/>
        </Form.Group>
      </Form>
      <ElentaFormButton
        mutationError={mutationError}
        mutationLoading={mutationLoading}
        mutationData={mutationData}
        onClick={update}
      />
    </Container>

  );
};

interface Props {
  programModuleSend: ProgramModuleSend
}

export default ProgramModuleSendEditor;

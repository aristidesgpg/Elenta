import React, {useState, useEffect} from "react";
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import {get} from "lodash";
import ErrorListTemplate from "../auth/forms/ErrorListTemplate";

const schema = {
  type: "object",
  title: "",
  description: "",
  autoComplete: "off",
  isRequired: true,
  properties: {
    id: {
      type: "string"
    },
    folder: {
      type: "string",
      title: "Folder name",
      description: "",
    },
  }
};

const uiSchema = {
  id: {
    "ui:widget": "hidden"
  },
  folder: {
    "ui:placeholder": "Enter folder name",
  },
};

const RenameFolderModal = (props) => {
  const [formState, setFormState] = useState(null);
  const {editableFolder} = props;

  useEffect(() => {
    if (editableFolder) {
      const newForm = {...formState};
      newForm.id = editableFolder.id;
      newForm.folder = editableFolder.title;
      setFormState(newForm)
    }
  }, [editableFolder]);


  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Enter folder name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          idPrefix={'log-in-form'}
          className={"auth-form"}
          showErrorList={false}
          liveValidate={true}
          schema={schema}
          uiSchema={uiSchema}
          formData={formState}
          onChange={(data) => {
            setFormState({...formState, ...data.formData});
          }}
          onSubmit={({formData}) => {
            props.onOk({...formData});
            props.onClose(false);
          }}
          onError={(errors, val) => console.log('errors', {errors, val})}
          ErrorList={ErrorListTemplate}
        >
          <div className="form-actions">
            <Button variant="info" type="submit" className="submit-button">Send</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  )
};

RenameFolderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  editableFolder: PropTypes.object,
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RenameFolderModal;

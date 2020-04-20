// Fetch list of tags first
import * as React from "react";
import {useMutation, useQuery} from '@apollo/react-hooks';
// import LoadingContainer from "../component-container/LoadingContainer";
import {useParams} from "react-router-dom";
import {GET_ALL_TAGS, GET_LEARNER_PROFILE, UPDATE_PROGRAM_MODULE_SEND} from "../../graphql/queries";
// import ProgramModuleSendEditor from "../learners/ProgramModuleSendEditor";
// import LearnerProgramModuleList from "../learners/LearnerProgramModuleList";
import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import _ from "lodash";
import {Module} from "../../graphql/graphql-generated";
// import ElentaForm from "../../components/elenta-form/ElentaForm";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";

const schema = {
  title: "Tags",
  type: "object",
  properties: {
    state: { type: "string", title: "Tags" }
  }
};

const uiSchema = {
  state: {
    "ui:field": "typeahead",
    typeahead: {
      id: "tags",
      minLength: 0,
      multiple: true,
      options: []
    }
  }
};

export const Tags = () => {
  const {loading, error, data} = useQuery(GET_ALL_TAGS)
  const [tagOptions, setTagOptions] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)

  if (loading) return (<>'Loading...'</>);
  if (error) return (<>`Error! ${error.message}`</>);
  if (!loading && !hasLoaded) {
    setHasLoaded(true)
    // setTagOptions(data.tags.map((tag) => tag.name));
    console.log(data.tags)
    console.log(tagOptions)
    uiSchema.state.typeahead.options = data.tags.map((tag) => tag.name)
  }

  return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        fields={{ typeahead: TypeaheadField }}
      >
      </Form>
  )
  // let {id} = useParams();
  // // fetching a query
  // const {loading, error, data} = useQuery(GET_LEARNER_PROFILE, {
  //   variables: {user_id: id}
  // });
  //
  // const [formData, setFormData] = useState(null);
  // const [activeProgramModule, setActiveProgramModule] = useState(null);
  // // running the mutations
  // const [runMutation, {loading: mutationLoading, error: mutationError, data: mutationData}] = useMutation(UPDATE_PROGRAM_MODULE_SEND);
  //
  // const update = () => {
  //   let submitData = _.cloneDeep(formData);
  //   submitData.response_data = JSON.stringify(submitData.response_data);
  //   submitData.id = activeProgramModule.send.id;
  //   delete submitData.response_timestamp;
  //
  //   runMutation({
  //     variables: {
  //       input: submitData
  //     }
  //   });
  // };
  //
  // const setModule = (module: Module) => {
  //   setActiveProgramModule(data.getLearnerProfile.programs[1].programModules.filter(pm => pm.module.id == module.id)[0]);
  // };
  //
  // useEffect(() => {
  //   if (data) {
  //     setActiveProgramModule(data.getLearnerProfile.programs[1].programModules[0]);
  //   }
  // }, [data]);
  //
  // useEffect(() => {
  //   if (activeProgramModule) {
  //     setFormData({
  //       response_data: JSON.parse(activeProgramModule.send.response_data),
  //       response_rating: activeProgramModule.send.response_rating,
  //       response_feedback: activeProgramModule.send.response_feedback,
  //       response_timestamp: activeProgramModule.send.response_timestamp
  //     });
  //   }
  // }, [activeProgramModule]);
  //
  // return (
  //   <LoadingContainer loading={[mutationLoading, loading]} error={error}>
  //     {data && activeProgramModule && formData &&
  //     <>
  //       <Row>
  //         <Col md={3}>
  //           <LearnerProgramModuleList
  //             modules={data.getLearnerProfile.programs[1].programModules.map(pm => pm.module)}
  //             activeModule={activeProgramModule.module}
  //             setActiveModule={setModule}
  //           />
  //         </Col>
  //         <Col>
  //           <ProgramModuleSendEditor
  //             module={activeProgramModule.module}
  //             formData={formData}
  //             onChange={d => setFormData(Object.assign(_.cloneDeep(formData), d))}
  //             onSubmit={update}
  //           />
  //         </Col>
  //       </Row>
  //     </>
  //     }
  //   </LoadingContainer>
  // )
};

export default Tags;

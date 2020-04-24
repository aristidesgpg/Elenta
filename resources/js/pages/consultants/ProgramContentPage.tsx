import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {
  GET_PROGRAM,
} from "../../graphql/queries";
import LoadingContainer from "../../components/hoc/LoadingContainer/LoadingContainer";
import {useEffect, useState} from "react";
import ProgramModuleSendViewerPage from "./ProgramModuleSendViewerPage";
import ProgramEditorPage from "./ProgramEditorPage";

export const ProgramContentPage = () => {
  let {id} = useParams();
  const [program, setProgram] = useState(null);
  const [isEditable, setIsEditable] = useState(true);

  const {loading, error, data} = useQuery(GET_PROGRAM, {variables: {id}});

  useEffect(() => {
    if (data) {
      const program = data.getProgram;
      setProgram(program);

      const isEditable = !program.programModules.find(module => module.send !== null);
      setIsEditable(isEditable);
    }
  }, [data]);

  return (
    <LoadingContainer
      loading={[loading]}
      error={[error]}
    >
      {program && (isEditable
      ? <ProgramEditorPage program={program}/>
      : <ProgramModuleSendViewerPage program={program}/>
      )}
    </LoadingContainer>
  )
};

export default ProgramContentPage;

import * as React from "react";
import LearnerProgramModuleCard from "./LearnerProgramModuleCard";
import ListGroup from "react-bootstrap/ListGroup";
import {Module} from "../../graphql/graphql-generated";

export const LearnerProgramModuleList: React.FunctionComponent<Props> = ({modules, activeModule, setActiveModule}) => {
  return (
    <ListGroup>
      {
        modules.map(m => {
          return <LearnerProgramModuleCard
            key={m.id}
            module={m}
            isActive={m.id === activeModule.id}
            setActiveModule={setActiveModule}
          />
        })
      }
    </ListGroup>
  );
};

interface Props {
  modules: Module[]
  activeModule: Module,
  setActiveModule: any
}
export default LearnerProgramModuleList;

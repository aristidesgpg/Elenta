import * as React from "react";
import ModuleCard from "./ModuleCard";

export const ModuleList = ({modules}) => {
  return modules.map(m => (
      <ModuleCard module={m} active={false}/>
  ));
};

export default ModuleList;

import * as React from "react";
import ModuleCard from "./ModuleCard";

export const ModuleList = ({modules, activeModule, setActiveModule}) => {
  return modules.map(m => (
      <ModuleCard
          key={m.id}
          module={m}
          isActive={activeModule ? m.id === activeModule.id : false}
          setActiveModule={setActiveModule}
      />
  ));
};

export default ModuleList;

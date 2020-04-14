import React, {useState, useEffect} from "react";
import ModuleCard from "./ModuleCard";
import Sortable from 'react-sortablejs';

export const ModuleList = ({modules, activeModule, setActiveModule}) => {
  const [state, setState] = useState({
    items: []
  });

  useEffect(() => {
    const items = modules.sort((a, b) => a.pivot.order - b.pivot.order).reduce((acc, module) => {
      const folder = module.pivot.folder;
      if (folder !== null) {
        const folderIndex = acc.findIndex(m => m.id === folder);

        if (folderIndex >= 0) {
          acc[folderIndex].modules.push(module);
        } else {
          acc.push({id: folder, title: folder, modules: [module]});
        }
      } else {
        acc.push(module);
      }
      return acc;
    }, []);

    setState({items});
  }, [modules]);

  const handleFolderChange = ({items, sortable, evt, folder}) => {
    const updatedItems = [...state.items];
    const folderIndex = updatedItems.findIndex(m => m.id === folder);
    updatedItems[folderIndex].modules = [
      ...items.map(item => {
        return state.items.find(module => module.id === item) || modules.find(module => module.id === item);
      })
    ];

    setState({items: updatedItems})
  };

  const onChange = ({items, sortable, evt}) => {
    const updatedItems = items.map(item => {
      return state.items.find(module => module.id === item) || modules.find(module => module.id === item);
    });

    setState({items: updatedItems})
  };

  return (
    <Sortable
      tag="ul"
      onChange={(items, sortable, evt) => onChange({items, sortable, evt})}
      options={{
        group: 'shared'
      }}
    >
      {
        state.items.map(item => (
          <ModuleCard
            key={item.id}
            module={item}
            isActive={activeModule ? item.id === activeModule.id : false}
            setActiveModule={item.modules ? () => null : setActiveModule}
          >
            {item.modules &&
            <div>
              <Sortable
                tag="ul"
                options={{
                  group: 'shared'
                }}

                onChange={(items, sortable, evt) => handleFolderChange({items, sortable, evt, folder: item.id})}
              >
                {
                  item.modules.map(subItem => {
                    return (
                      <ModuleCard
                        key={subItem.id}
                        module={subItem}
                        isActive={activeModule ? item.id === activeModule.id : false}
                        setActiveModule={setActiveModule}
                      />
                    )
                  })
                }
              </Sortable>
            </div>
            }
          </ModuleCard>
        ))
      }
    </Sortable>
  );
};

export default ModuleList;
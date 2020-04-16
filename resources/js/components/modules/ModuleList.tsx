import React, {useState, useEffect} from "react";
import Sortable from "react-sortablejs";
import ModuleCard from "./ModuleCard";

export const ModuleList = ({modules, activeModule, setActiveModule, saveModulesOrder}) => {
  const [state, setState] = useState({
    items: []
  });

  useEffect(() => {
    const items = modules.sort((a, b) => parseInt(a.pivot.order) - parseInt(b.pivot.order))
      .reduce((acc, module) => {
        const folder = module.pivot.folder;
        if (folder !== null) {
          const folderIndex = acc.findIndex(m => m.id === folder);

          if (folderIndex >= 0) {
            acc[folderIndex].modules.push(module);
          } else {
            acc.push({id: folder, title: folder, isFolder: true, modules: [module]});
          }
        } else {
          acc.push(module);
        }
        return acc;
      }, []);

    setState({items});
  }, [modules]);

  const saveOrder = (items) => {
    let order = 1;
    const modules = items.reduce((acc, item) => {
      if (item.isFolder) {
        acc = [...acc, ...item.modules.map(module => {
          return {
            id: module.pivot.id,
            order: order++,
            folder: item.title
          };
        })]
      } else {
        acc.push({
          id: item.pivot.id,
          order: order++,
          folder: ''
        });
      }

      return acc;
    }, []);

    saveModulesOrder(modules);
  };

  const handleFolderChange = ({items, sortable, evt, folder}) => {
    const updatedItems = [...state.items];
    const folderIndex = updatedItems.findIndex(m => m.id === folder);
    updatedItems[folderIndex].modules = [
      ...items.map(item => {
        return state.items.find(module => module.id === item) || modules.find(module => module.id === item);
      })
    ];

    setState({items: updatedItems});
    saveOrder(updatedItems);
  };

  const onChange = ({items, sortable, evt}) => {
    const updatedItems = items.map(item => {
      return state.items.find(module => module.id === item) || modules.find(module => module.id === item);
    });

    if (items.length === state.items.length || items.length > state.items.length) {
      saveOrder(updatedItems);
    }
    setState({items: updatedItems});
  };

  return (
    <Sortable
      tag="ul"
      onChange={(items, sortable, evt) => onChange({items, sortable, evt})}
      options={{
        group: {
          name: 'shared',
          pull: true,
          put: true
        },
        animation: 250,
      }}
    >
      {
        state.items.map((item, index) => (
          <ModuleCard
            key={`${item.id}-${index}`}
            module={item}
            isActive={activeModule ? item.id === activeModule.id : false}
            setActiveModule={item.isFolder ? () => null : setActiveModule}
          >
            {item.isFolder &&
            <Sortable
              tag="ul"
              options={{
                group: {
                  name: 'shared',
                  pull: true,
                  put: function (to, from, item) {
                    return item.children.length === 0;
                  }
                },
                animation: 250,
              }}
              onChange={(items, sortable, evt) => handleFolderChange({items, sortable, evt, folder: item.id})}
            >
              {
                item.modules && item.modules.map((subItem, subIndex) => {
                  return (
                    <ModuleCard
                      key={`${subItem.id}-${subIndex}`}
                      module={subItem}
                      isActive={activeModule ? item.id === activeModule.id : false}
                      setActiveModule={setActiveModule}
                    />
                  )
                })
              }
            </Sortable>
            }
          </ModuleCard>
        ))
      }
    </Sortable>
  );
};

export default ModuleList;
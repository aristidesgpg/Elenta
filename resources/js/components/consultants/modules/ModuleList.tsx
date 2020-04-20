import React, {useState, useEffect} from "react";
import Sortable from "react-sortablejs";
import ModuleCard from "./ModuleCard";
import RenameFolderModal from "./RenameFolderModal";

const sortableNodeToArray = (node) => {
  const order = [];
  const children = node.children;

  for (let i = 0; i < children.length; i++) {
    const el = children[i];

    if (node) {
      order.push(el.getAttribute('data-id'));
    }
  }

  return order;
};

export const ModuleList = ({modules, activeModule, setActiveModule, saveModulesOrder, deleteModules, duplicateModules}) => {
  const [state, setState] = useState({
    items: []
  });
  const [showModal, setShowModal] = useState(false);
  const [editableFolder, setEditableFolder] = useState(null);

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
      const itemModules = extractModules(item);
      return [...acc, ...itemModules.map(module => {
        return {...module.pivot, order: order++};
      })];
    }, []);

    saveModulesOrder(modules);
  };

  const handleFolderChange = ({items, sortable, evt, folder}) => {
    const mainList = document.getElementById('root-module-list');
    const mainListItems = sortableNodeToArray(mainList);
    const updatedItems = mainListItems.map(item => {
      return state.items.find(module => module.id === item) || modules.find(module => module.id === item);
    });

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

  const renameFolder = ({id, folder}) => {
    const updatedItems = [...state.items];
    const folderIndex = updatedItems.findIndex(m => m.id === id);

    const title = updatedItems[folderIndex].title;
    updatedItems[folderIndex].modules.map(module => {
      const pivotFolder = module.pivot.folder;

      if (pivotFolder && pivotFolder === id) {
        module.pivot.folder = folder;
      }
      return module;
    });
    updatedItems[folderIndex].title = folder;

    setState({items: updatedItems});
    saveOrder(updatedItems);
  };

  const extractModules = (item) => {
    return item.isFolder
      ? [...item.modules.map(module => {
        return {
          id: module.id,
          pivot: {
            id: module.pivot.id,
            folder: item.title
          }
        };
      })]
      : [{
        id: item.id,
        pivot: {
          id: item.pivot.id,
          folder: ''
        }
      }];
  };

  const duplicateModulesHandler = (item) => {
    duplicateModules([...extractModules(item).map(module => module.id)]);
  };

  const deleteModulesHandler = (item) => {
    deleteModules([...extractModules(item).map(module => module.pivot.id)]);
  };

  return (
    <>
      <Sortable
        tag="ul"
        id={'root-module-list'}
        style={{
          padding: 0
        }}
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
              renameFolder={() => {
                setShowModal(true);
                setEditableFolder(item)
              }}
              duplicateModules={duplicateModulesHandler}
              deleteModules={deleteModulesHandler}
              isActive={activeModule ? item.id === activeModule.id : false}
              setActiveModule={item.isFolder ? () => null : setActiveModule}
            >
              {item.isFolder &&
              <Sortable
                tag="ul"
                className={'sub-module-list'}
                style={{
                  padding: 0
                }}
                options={{
                  group: {
                    name: 'shared',
                    pull: true,
                    put: function (to, from, item) {
                      return item.children.length <= 1;
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
                        duplicateModules={duplicateModulesHandler}
                        deleteModules={deleteModulesHandler}
                        isActive={activeModule ? subItem.id === activeModule.id : false}
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
      <RenameFolderModal show={showModal}
                         onClose={setShowModal}
                         editableFolder={editableFolder}
                         onOk={renameFolder}/>
    </>
  );
};

export default ModuleList;
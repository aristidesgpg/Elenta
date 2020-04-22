import React, {useState, useEffect} from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {mutateTree} from "@atlaskit/tree";
import ModuleCard from "./ModuleCard";
import RenameFolderModal from "./RenameFolderModal";
import List from "./List";

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
      items: [],
    });
    const [tree, setTree] = useState({
      rootId: "root-list",
      items: {
        "root-list": {
          id: "root-list",
          hasChildren: true,
          isFolder: false,
          isExpanded: false,
          isChildrenLoading: false,
          data: {
            name: "",
            id: "root-list"
          },
          children: []
        },
      }
    });
    const [showModal, setShowModal] = useState(false);
    const [editableFolder, setEditableFolder] = useState(null);

    useEffect(() => {
      const newTree = modules.sort((a, b) => parseInt(a.pivot.order) - parseInt(b.pivot.order))
        .reduce((acc, module) => {
          const folder = module.pivot.folder;
          if (folder !== null) {
            const folderItem = acc.items[folder];

            if (folderItem) {
              acc.items[folder].children.push(module.id);
            } else {
              acc.items["root-list"].children.push(module.id);
              acc.items["root-list"].children.push(folder);
              acc.items[folder] = {
                id: folder,
                hasChildren: true,
                isFolder: true,
                isExpanded: false,
                isChildrenLoading: false,
                data: {
                  name: folder,
                  id: folder
                },
                children: [module.id]
              }
            }
          } else {
            acc.items["root-list"].children.push(module.id);
          }
          acc.items[module.id] = {
            id: module.id,
            hasChildren: false,
            isFolder: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
              name: module.title,
              id: module.id
            },
            children: []
          };
          return acc;
        }, {...tree});
      setTree(newTree);
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


    const onDragEnd = (sourcePosition, destinationPosition) => {
      if (!destinationPosition) {
        return;
      }
      const sourceTree = tree;

      // removeItemFromTree actually just removes the itemId from parent item's children
      const {
        tree: newSourceTree,
        itemRemoved: removedItemId
      } = removeItemFromTree(sourceTree, sourcePosition);

      const movingItem = sourceTree.items[removedItemId];
      const childItems = getAllItemChildren(sourceTree, movingItem.id);

      // actually remove the item and children from items
      delete newSourceTree.items[removedItemId];
      childItems.forEach(item => delete newSourceTree.items[item.id]);

      const newDestTree = addItemToTree(
        newSourceTree,
        destinationPosition,
        removedItemId
      );

      newDestTree.items[removedItemId] = movingItem;
      childItems.forEach(item => (newDestTree.items[item.id] = item));

      setTree(newDestTree);
    };

    const getAllItemChildren = (tree, itemId) => {
      const item = tree.items[itemId];
      const childIds = item.children;
      const children = [];
      childIds.forEach(childId =>
        children.push(
          tree.items[childId],
          ...getAllItemChildren(tree, childId)
        )
      );
      return children;
    };

    const removeItemFromTree = (tree, position) => {
      const sourceParent = tree.items[position.parentId];
      const newSourceChildren = [...sourceParent.children];
      const itemRemoved = newSourceChildren.splice(position.index, 1)[0];
      const newTree = mutateTree(tree, position.parentId, {
        children: newSourceChildren,
        hasChildren: newSourceChildren.length > 0,
        isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded
      });
      return {
        tree: newTree,
        itemRemoved
      };
    };

    const addItemToTree = (tree, position, item) => {
      const destinationParent = tree.items[position.parentId];
      const newDestinationChildren = [...destinationParent.children];
      if (typeof position.index === "undefined") {
        if (
          (!!destinationParent.hasChildren &&
            destinationParent.children.length > 0) ||
          !destinationParent.hasChildren
        ) {
          newDestinationChildren.push(item);
        }
      } else {
        newDestinationChildren.splice(position.index, 0, item);
      }
      return mutateTree(tree, position.parentId, {
        children: newDestinationChildren,
        hasChildren: true
      });
    };

    const onExpand = id => setExpanded(id, true);
    const onCollapse = id => setExpanded(id, false);

    const setExpanded = (id, isExpanded) => {
      const newTree = mutateTree(tree, id, {isExpanded});
      setTree(newTree);
    };

    const renderItem = ({item, provided}) => {
      return (
        <div
          className={"card"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ModuleCard
            item={item}
            onExpand={() => setExpanded(item.id, true)}
            onCollapse={() => setExpanded(item.id, false)}
            renameFolder={() => {
              setShowModal(true);
              setEditableFolder(item)
            }}
            duplicateModules={duplicateModulesHandler}
            deleteModules={deleteModulesHandler}
            isActive={activeModule ? item.id === activeModule.id : false}
            setActiveModule={item.isFolder ? () => null : setActiveModule}
          />
        </div>
      );
    };

    return (
      <>
        <List
          tree={tree}
          renderItem={renderItem}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onDragEnd={onDragEnd}
          offsetPerLevel={16}
          isDragEnabled
          isNestingEnabled
        />
        <RenameFolderModal show={showModal}
                           onClose={setShowModal}
                           editableFolder={editableFolder}
                           onOk={renameFolder}/>
      </>
    );
  }
;

export default ModuleList;
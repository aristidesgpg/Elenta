import React, {useState, useEffect} from "react";
import {mutateTree, TreeData} from "@atlaskit/tree";
import ModuleCard from "./ModuleCard";
import RenameFolderModal from "./RenameFolderModal";
import List from "./List";
import {immutableMerge} from "../../../utils/utils";

export const ModuleList = ({modules, activeModule, setActiveModule, saveModulesOrder, deleteModules, duplicateModules}) => {
    const [tree, setTree] = useState<TreeData>({
      rootId: "root-list",
      items: {}
    });
    const [showModal, setShowModal] = useState(false);
    const [editableFolder, setEditableFolder] = useState(null);

    useEffect(() => {
      const newItems = modules.sort((a, b) => parseInt(a.pivot.order) - parseInt(b.pivot.order))
        .reduce((acc, module) => {
          const folder = module.pivot.folder;
          const moduleKey = getModuleKey(module);
          if (folder !== null) {
            const folderItem = acc[folder];

            if (folderItem) {
              acc[folder].children.push(moduleKey);
            } else {
              acc["root-list"].children.push(folder);
              acc[folder] = {
                id: folder,
                hasChildren: true,
                isExpanded: false,
                isChildrenLoading: false,
                data: immutableMerge(module, {
                  isFolder: true,
                  name: folder,
                  id: folder,
                }),
                children: [moduleKey]
              }
            }
          } else {
            acc["root-list"].children.push(moduleKey);
          }
          acc[moduleKey] = {
            id: moduleKey,
            hasChildren: false,
            isExpanded: false,
            isChildrenLoading: false,
            data: immutableMerge(module, {
              isFolder: !!module.isFolder,
              name: module.title,
            }),
            children: []
          };
          return acc;
        }, {
          "root-list": {
            id: "root-list",
            hasChildren: true,
            isExpanded: false,
            isChildrenLoading: false,
            data: {
              name: "",
              isFolder: false,
              id: "root-list"
            },
            children: []
          }
        });
      const newTree = {...tree, items: newItems};
      setTree(newTree);
    }, [modules]);

    const getModuleKey = (module) => {
      return `${module.id}:::${module.pivot.id}`;
    };

    const saveOrder = (newTree) => {
      let order = 1;
      const {items} = newTree;

      const modules = items["root-list"].children.reduce((acc, item) => {
        const itemModules = extractModules(items[item]);

        return [...acc, ...itemModules.map(module => {
          return {...module.pivot, order: order++};
        })];
      }, []);

      saveModulesOrder(modules);
    };

    const renameFolder = ({id, folder}) => {
      const newTree = {...tree};

      newTree.items[id].children.map(module => {
        const child = newTree.items[module];
        child.data.pivot.folder = folder;
      });
      newTree.items[id].data.name = folder;

      setTree(newTree);
      saveOrder(newTree);
    };

    const extractModules = (item) => {
      return item.data.isFolder
        ? [...item.children.map(module => {
          const child = tree.items[module];
          return {
            id: child.data.id,
            pivot: {
              id: child.data.pivot.id,
              folder: item.data.name
            }
          };
        })]
        : [{
          id: item.data.id,
          pivot: {
            id: item.data.pivot.id,
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

      const destinationItem = newDestTree.items[destinationPosition.parentId];
      newDestTree.items[removedItemId].data.pivot.folder = destinationItem.data.isFolder ? destinationPosition.parentId : "";

      setTree(newDestTree);
      saveOrder(newDestTree);
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
      const moduleKey = getModuleKey(activeModule);
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
            isActive={activeModule ? item.id === moduleKey : false}
            setActiveModule={item.data.isFolder ? () => null : setActiveModule}
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
          isNestingEnabled={true}
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

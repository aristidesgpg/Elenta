import React, {useState, useEffect} from "react";
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";
import {getBox} from "css-box-model";
import {calculateFinalDropPositions} from "@atlaskit/tree/dist/cjs/components/Tree/Tree-utils";
import {flattenTree, mutateTree} from "@atlaskit/tree/dist/cjs/utils/tree";
import TreeItem from "@atlaskit/tree/dist/cjs/components/TreeItem";
import {
  getDestinationPath,
  getItemById,
  getIndexById
} from "@atlaskit/tree/dist/cjs/utils/flat-tree";
import DelayedFunction from "@atlaskit/tree/dist/cjs/utils/delayed-function";
import {
  getGraftDestinationPath,
  calculateNewTreeFinalDropPositions
} from "./utils"; // customised functions

const List = (props) => {
  const {
    isNestingEnabled,
    tree
  } = props;

  const [flattenedTree, setFlattenedTree] = useState([]);
  const [draggedItemId, setDraggedItemId] = useState(null);

  let dragState = null;
  let itemsElement = {};
  let containerElement = null;
  let containerElements = {};

  let expandTimer = new DelayedFunction(500);

  useEffect(() => {
    const finalTree = closeParentIfNeeded(tree, draggedItemId);

    const newFlattenedTree = flattenTree(finalTree);

    setFlattenedTree(newFlattenedTree);
  }, [tree]);

  const closeParentIfNeeded = (tree, draggedItemId) => {
    if (draggedItemId !== null) {
      return mutateTree(tree, draggedItemId, {
        isExpanded: false
      });
    }
    return tree;
  };

  const onDragStart = result => {
    const {onDragStart} = props;
    dragState = {
      source: result.source,
      destination: result.source,
      mode: result.mode
    };
    setDraggedItemId(result.draggableId);

    containerElement = containerElements[
      result.source ? result.source.droppableId : undefined
      ];

    if (onDragStart) {
      onDragStart(result.draggableId);
    }
  };

  const onDragUpdate = update => {
    const {onExpand} = props;
    if (!dragState) {
      return;
    }

    expandTimer.stop();
    if (update.combine) {
      const {draggableId, droppableId} = update.combine;
      const item = getItemById(flattenedTree, draggableId);
      if (item && isExpandable(item)) {
        expandTimer.start(() => onExpand(draggableId, item.path));
      }
    }

    containerElement = containerElements[
      update.destination ? update.destination.droppableId : undefined
      ];

    dragState = {
      ...dragState,
      destination: update.destination,
      combine: update.combine
    };
  };

  const onDropAnimating = () => {
    expandTimer.stop();
  };

  const onDragEnd = result => {
    const {onDragEnd : onDragEndRoot} = props;
    expandTimer.stop();
    const finalDragState = {
      ...dragState,
      source: result.source,
      destination: result.destination,
      combine: result.combine
    };
    const destDroppableId = finalDragState.destination
      ? finalDragState.destination.droppableId
      : undefined;
    const sourceTree = tree;
    const destTree = tree;
    const sourceFlatTree = flattenedTree;
    const destFlatTree = flattenedTree;
    setDraggedItemId(null);

    const {sourcePosition, destinationPosition} =
      sourceTree === destTree || !destDroppableId
        ? calculateFinalDropPositions(
        sourceTree,
        sourceFlatTree,
        finalDragState
        )
        : calculateNewTreeFinalDropPositions(
        sourceTree,
        sourceFlatTree,
        destTree,
        destFlatTree,
        finalDragState
        );
    //Nesting only into folders
    const destinationItemTree = tree.items[destinationPosition.parentId];
    if (destinationItemTree.data.isFolder || destinationPosition.parentId === 'root-list') {
      onDragEndRoot(sourcePosition, destinationPosition);
      dragState = null;
    }
  };

  const onPointerMove = () => {
    if (dragState) {
      dragState = {
        ...dragState,
        horizontalLevel: getDroppedLevel()
      };
    }
  };

  const calculateEffectivePath = (flatItem, snapshot) => {
    if (
      dragState &&
      draggedItemId === flatItem.item.id &&
      (dragState.destination || dragState.combine)
    ) {
      const {
        source,
        destination,
        combine,
        horizontalLevel,
        mode
      } = dragState;
      if (mode === "SNAP" || snapshot.isDropAnimating) {
        if (destination) {
          const flattenedTree = tree;
          const sameTree = source.droppableId === destination.droppableId;
          return sameTree
            ? getDestinationPath(
              flattenedTree,
              source.index,
              destination.index,
              horizontalLevel
            )
            : getGraftDestinationPath(
              flattenedTree,
              destination.index,
              horizontalLevel
            );
        }

        if (combine) {
          const flattenedTree = tree;
          const sameTree = source.droppableId === combine.droppableId;
          return sameTree
            ? getDestinationPath(
              flattenedTree,
              source.index,
              getIndexById(flattenedTree, combine.draggableId),
              horizontalLevel
            )
            : getGraftDestinationPath(
              flattenedTree,
              getIndexById(flattenedTree, combine.draggableId),
              horizontalLevel
            );
        }
      }
    }
    return flatItem.path;
  };

  const isExpandable = item => !!item.item.hasChildren && !item.item.isExpanded;

  const getDroppedLevel = () => {
    const {offsetPerLevel} = props;

    if (!dragState || !containerElement) {
      return undefined;
    }
    const containerLeft = getBox(containerElement).contentBox.left;
    const itemElement = itemsElement[draggedItemId];
    if (itemElement) {
      const currentLeft = getBox(itemElement).contentBox.left;
      const relativeLeft = Math.max(currentLeft - containerLeft, 0);
      return (
        Math.floor((relativeLeft + offsetPerLevel / 2) / offsetPerLevel) + 1
      );
    }
    return undefined;
  };

  const patchDroppableProvided = (provided, droppableId) => ({
    ...provided,
    innerRef: el => {
      containerElements[droppableId] = el;
      provided.innerRef(el);
    }
  });

  const setItemRef = (itemId, el) => {
    itemsElement[itemId] = el;
  };

  const renderTree = () => {
    return flattenedTree.map(renderItem);
  };

  const renderItem = (flatItem, index) => {
    const {isDragEnabled} = props;

    return (
      <Draggable
        draggableId={flatItem.item.id}
        index={index}
        key={flatItem.item.id}
        isDragDisabled={!isDragEnabled}
      >
        {renderDraggableItem(flatItem)}
      </Draggable>
    );
  };

  const renderDraggableItem = flatItem => (provided, snapshot) => {
    const {renderItem, onExpand, onCollapse, offsetPerLevel} = props;
    const currentPath = calculateEffectivePath(flatItem, snapshot);
       return (
      <TreeItem
        key={flatItem.item.id}
        item={flatItem.item}
        path={currentPath}
        onExpand={onExpand}
        onCollapse={onCollapse}
        renderItem={renderItem}
        provided={provided}
        snapshot={snapshot}
        itemRef={setItemRef}
        offsetPerLevel={offsetPerLevel}
      />
    );
  };

  const renderedTree = renderTree();
  const listId = tree.rootId;
  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <div key={listId}>
        <Droppable
          droppableId={listId}
          isCombineEnabled={isNestingEnabled}
          ignoreContainerClipping
        >
          {provided => {
            const finalProvided = patchDroppableProvided(
              provided,
              listId
            );
            return (
              <div
                ref={finalProvided.innerRef}
                style={{pointerEvents: "auto"}}
                onTouchMove={onPointerMove}
                onMouseMove={onPointerMove}
                {...finalProvided.droppableProps}
              >
                {renderedTree}
                {
                  finalProvided.placeholder
                }
              </div>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default List;

import React, { useState } from 'react';
import { DragDropContext,DraggableProvided, DroppableProvided, Draggable, DropResult, DragUpdate, ResponderProvided } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import styles from '../Styling/ShapeMatchingGame.module.css';

type Shape = 'circle' | 'star' | 'tree' | 'diamond' | 'square' | 'heart' | 'triangle' | 'cross' | 'moon' | 'pentagon' | 'key';

interface Drawer {
  id: string;
  requiredShape: Shape;
  content: Shape;
  isOpen: boolean;
}

const initialDrawers: Drawer[] = [
  { id: 'drawer-1', requiredShape: 'diamond', content: 'heart', isOpen: false },
  { id: 'drawer-2', requiredShape: 'star', content: 'tree', isOpen: false },
  { id: 'drawer-3', requiredShape: 'heart', content: 'cross', isOpen: false },
  { id: 'drawer-4', requiredShape: 'star', content: 'moon', isOpen: false },
  { id: 'drawer-5', requiredShape: 'circle', content: 'heart', isOpen: false },
  { id: 'drawer-6', requiredShape: 'pentagon', content: 'cross', isOpen: false },
  { id: 'drawer-7', requiredShape: 'circle', content: 'pentagon', isOpen: false },
  { id: 'drawer-8', requiredShape: 'moon', content: 'key', isOpen: false },
  { id: 'drawer-9', requiredShape: 'diamond', content: 'tree', isOpen: false },
  { id: 'drawer-10', requiredShape: 'triangle', content: 'star', isOpen: false },
  { id: 'drawer-11', requiredShape: 'cross', content: 'tree', isOpen: false },
  { id: 'drawer-12', requiredShape: 'heart', content: 'diamond', isOpen: false },
  { id: 'drawer-13', requiredShape: 'square', content: 'star', isOpen: false },
  { id: 'drawer-14', requiredShape: 'triangle', content: 'heart', isOpen: false },
  { id: 'drawer-15', requiredShape: 'pentagon', content: 'triangle', isOpen: false }
];


const ShapeMatchingGame: React.FC = () => {
  const [drawers, setDrawers] = useState<Drawer[]>(initialDrawers);
  const [currentShape, setCurrentShape] = useState<Shape>('circle');

  const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {
    const destinationId = update.destination?.droppableId;
    console.log('Hovering over drawer:', destinationId);
  };

  const onDragEnd = (result: any) => {
    console.log('Destination:', result.destination);
    console.log('Source:', result.source);

    const { source, destination } = result;

    // Log the result for debugging
    console.log('Drag result:', result);

    // Dropped outside a droppable area
    if (!destination) return;

    const drawer = drawers.find(d => d.id === destination.droppableId);

    if (drawer && currentShape === drawer.requiredShape) {
      setCurrentShape(drawer.content);
      console.log('Correct shape, unlocking drawer. Current shape is now '+currentShape);
      setDrawers(prevDrawers =>
        prevDrawers.map(d => d.id === drawer.id ? { ...d, isOpen: true } : d)
      );

      if (drawer.content === 'key') {
        alert('You found the key and completed the game!');
      }
    } else {
      console.log('Incorrect shape, not unlocking.');
      alert('This shape does not fit in this drawer!');
    }
  };

    // Function to render the drawers based on the SVG positions
    const renderDrawers = () => {
      return drawers.map((drawer, index) => (
        <StrictModeDroppable droppableId={drawer.id} key={drawer.id} direction='horizontal'>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps} 
            className={`${styles.drawer} ${drawer.isOpen ? styles.openDrawer : ''} ${snapshot.isDraggingOver ? styles.draggingOver : ''} ${styles[drawer.id]}`}>
            </div>
          )}
        </StrictModeDroppable>
      ));
    };      

  const gameBoard = '../assets/shape-match/2021-IS-03-dresser.svg';

    // Function to retrieve the correct image path for a given shape
  const getImagePath = (shape: Shape | 'key') => {
    switch (shape) {
      case 'circle':
        return '../assets/shape-match/blue-circle-svgrepo-com.svg';
      case 'star':
        return '../assets/shape-match/star-svgrepo-com.svg';
      case 'tree':
        return '../assets/shape-match/evergreen-tree-svgrepo-com.svg';
      case 'moon':
        return '../assets/shape-match/half-moon-shape-svgrepo-com.svg';
      case 'heart':
        return '../assets/shape-match/heart-like-svgrepo-com.svg';
      case 'diamond':
        return '../assets/shape-match/large-blue-diamond-svgrepo-com.svg';
      case 'cross':
        return '../assets/shape-match/plus-add-svgrepo-com.svg';
      case 'pentagon':
        return '../assets/shape-match/polygon-pentagon-svgrepo-com.svg';
      case 'triangle':
        return '../assets/shape-match/red-triangle-pointed-down-svgrepo-com.svg';
      case 'key':
        return '../assets/shape-match/keyword-key-svgrepo-com.svg';
      default:
        return ''; // Or a default image path
    }
  };

  return (
    <div className={styles.homeContainer}>
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div className="game-board">
        <StrictModeDroppable droppableId="currentShapeArea">
          {(provided: DroppableProvided) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <img src={gameBoard} alt="Game Board" />
              {renderDrawers()}
              <Draggable draggableId="currentShape" index={0}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{...provided.draggableProps.style}}
                  >
                    <img src={getImagePath(currentShape)} alt="Current Shape" className={styles.shape}/>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </DragDropContext>
    </div>
  );
};

export default ShapeMatchingGame;
// BallSortGame.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from '../Styling/BallSortGame.module.css';
import { StrictModeDroppable } from './StrictModeDroppable';

type BallColor = 'blue' | 'orange';

interface Ball {
  id: string;
  color: BallColor;
}

interface Tube {
  id: string;
  balls: Ball[];
}

// Define initial state for the tubes
const initialTubes: Tube[] = [
    { id: 'tube-1', balls: [{ id: 'ball-1', color: 'orange' }, { id: 'ball-2', color: 'blue' }, { id: 'ball-3', color: 'orange' }] },
    { id: 'tube-2', balls: [{ id: 'ball-4', color: 'blue' }, { id: 'ball-5', color: 'orange' }, { id: 'ball-6', color: 'blue' }] },
    { id: 'tube-3', balls: [] },
  ];

const BallSortGame: React.FC = () => {
  const [tubes, setTubes] = useState<Tube[]>(initialTubes);

  // Function to handle the end of a drag event
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Early return conditions based on your game rules
    if (!destination) return;

    const sourceIndex = parseInt(source.droppableId.split('-')[1]) - 1;
    const destinationIndex = parseInt(destination.droppableId.split('-')[1]) - 1;

    const sourceTube = tubes[sourceIndex];
    const destinationTube = tubes[destinationIndex];

    // Rule 2: When there is space in a tube, a ball can only be moved on a ball of the same colour
    // Rule 3: Only one ball at the top of a tube can be moved at a time
    if (
        destinationTube.balls.length >= 3 ||
        destinationTube.balls.length > 0 && 
      destinationTube.balls[0].color !== sourceTube.balls[source.index].color
    ) {
        
      return;
    }

    // Proceed with moving the ball
    const newTubes = Array.from(tubes);
    const [removedBall] = newTubes[sourceIndex].balls.splice(source.index, 1);
    newTubes[destinationIndex].balls.unshift(removedBall); // Add to the top of the destination tube

    setTubes(newTubes);

    // Check for winning condition
    checkWinCondition();
  };
  
  const checkWinCondition = () => { 
    // Count how many tubes have all balls of the same color
    const correctlyFilledTubesCount = tubes.filter(tube =>
      tube.balls.every(ball => ball.color === tube.balls[0]?.color) &&
      tube.balls.length > 0
    ).length;
  
    // Calculate the expected number of tubes filled with balls of the same color
    const expectedCorrectTubes = 2; // Assuming there are 2 colors in the game
  
    // Check if all tubes with balls have the same color balls and there are no balls in other tubes
    const isWinningCondition = correctlyFilledTubesCount === expectedCorrectTubes && 
      tubes.filter(tube => tube.balls.length === 0).length === (tubes.length - expectedCorrectTubes);
  
    if (isWinningCondition) {
      // Trigger winning logic
      alert("Congratulations, you've solved the puzzle!");
    }
  };  
    
    const ruleSet = '../assets/ball-sort/2021-KR-02-graphics-1.svg';

      // Function to get the tube image path
    const getTubeImagePath = (id: string) => {
        return '../assets/ball-sort/tube.svg'; // Replace with your actual SVG path
    };

    return (
      <div className={styles.homeContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        <img src={ruleSet} alt="Rule Set" className={styles.ruleSetImage} />
        <div className={styles.tubesContainer}>
          {tubes.map((tube, index) => (
            <StrictModeDroppable droppableId={tube.id} key={tube.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} >
                  <img src={getTubeImagePath(tube.id)} alt="Tube" />
                  {tube.balls.map((ball, index) => (
                    <Draggable draggableId={ball.id} index={index} key={ball.id} isDragDisabled={index !== 0}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`${styles.ball} ${styles[ball.color]}`}>
                          {/* Ball representation */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          ))}
        </div>
      </DragDropContext>
      </div>
      );
    };
    
    export default BallSortGame;
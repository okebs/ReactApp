import React, { useState } from 'react';
import styles from '../Styling/GreedyTrolls.module.css';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

type CoinType = 'copper' | 'gold' | 'silver';

type CoinItem = {
  id: string;
  type: CoinType;
  inTube: boolean;
};

const coins: CoinItem[] = [
  { id: 'copper-1', type: 'copper', inTube:false },
  { id: 'copper-2', type: 'copper', inTube:false },
  { id: 'copper-3', type: 'copper', inTube:false },
  { id: 'silver-1', type: 'silver', inTube:false },
  { id: 'silver-2', type: 'silver', inTube:false },
  { id: 'silver-3', type: 'silver', inTube:false },
  { id: 'gold-1', type: 'gold', inTube:false }, 
  { id: 'gold-2', type: 'gold', inTube:false },
  { id: 'gold-3', type: 'gold', inTube:false }
];

const correctSequences: CoinType[][] = [
    ['silver', 'copper', 'gold', 'copper', 'silver'], // Sequence from the first solution
    ['gold', 'copper', 'silver', 'copper', 'gold'], // Sequence from the second solution
  ];
  

const GreedyTrolls: React.FC = () => {
  // Use useState to manage the coins array
  const [coinsState, setCoinsState] = useState(coins);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {return;}

    const coins = Array.from(coinsState); // Create a new array from the previous coins state
    const [removed] = coins.splice(source.index, 1);  // Remove the coin from its original position
    removed.inTube = destination.droppableId === "tube"; // If the coin is dropped in the tube, set inTube to true, otherwise false
    coins.splice(destination.index, 0, removed); // Insert the coin at its new position

    setCoinsState(coins);

    // Check for winning condition after updating state
    checkWinCondition(coins.filter(coin => coin.inTube).map(coin => coin.type));
  };

  const checkWinCondition = (currentSequence: CoinType[]) => {
    // Check if the current sequence of coins in the tube matches any correct sequence
    const isWinner = correctSequences.some(sequence => 
      sequence.every((type, index) => type === currentSequence[index])
    );
  
    if (isWinner) {
      // Trigger winning logic, like showing a success message or advancing the game
      alert("Congratulations, you've won!");
    }
  };

  const mapImagePath = '../assets/greedy-trolls/2022-CH-04_taskbody.svg';

  const getImagePath = (type: CoinType) => {
    switch (type) {
      case 'copper':
        return '../assets/greedy-trolls/2022-CH-04_copper.svg';
      case 'gold':
        return '../assets/greedy-trolls/2022-CH-04_gold.svg';
      case 'silver':
        return '../assets/greedy-trolls/2022-CH-04_silver.svg';
      default:
        return ''; // Default case or error handling
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <img src={mapImagePath} alt="Troll Map" className={styles.map} />
    <div className="game-container" style={{ display: 'flex', alignItems: 'start' }}>
        {/* Droppable area for the tube */}
        <StrictModeDroppable droppableId="tube" direction="vertical">
            {(provided) => (
            <div
                className={styles.tube}
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
                {coinsState.filter((coin) => coin.inTube).map((coin, index) => (
                <Draggable key={coin.id} draggableId={coin.id} index={index}>
                    {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.coin}
                    >
                        <img src={getImagePath(coin.type)} alt={`${coin.type} coin`} />
                    </div>
                    )}
                </Draggable>
                ))}
                {provided.placeholder}
            </div>
            )}
        </StrictModeDroppable>

        {/* Droppable area for coins outside the tube */}
        <StrictModeDroppable droppableId="outside" direction="vertical">
          {(provided) => (
            <div
              className={styles.outside}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* Render coins in a grid layout */}
              {coinsState.filter((coin) => !coin.inTube).map((coin, index) => (
                <Draggable key={coin.id} draggableId={coin.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.coin}
                    >
                      <img src={getImagePath(coin.type)} alt={`${coin.type} coin`} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
        </div>
    </DragDropContext>
    );
};

export default GreedyTrolls;
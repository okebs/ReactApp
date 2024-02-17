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

const GreedyTrolls: React.FC = () => {
  // Use useState to manage the coins array
  const [coinsState, setCoinsState] = useState(coins);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const coins = Array.from(coinsState);
    const [removed] = coins.splice(source.index, 1);

    // When dropped in the tube, set inTube to true, and vice versa
    removed.inTube = destination.droppableId === "tube";
    
    coins.splice(destination.index, 0, removed);

    setCoinsState(coins);
  };

  const mapImagePath = '/images/greedy-trolls/2022-CH-04_taskbody.svg';

  const getImagePath = (type: CoinType) => {
    switch (type) {
      case 'copper':
        return '/images/greedy-trolls/2022-CH-04_copper.svg';
      case 'gold':
        return '/images/greedy-trolls/2022-CH-04_gold.svg';
      case 'silver':
        return '/images/greedy-trolls/2022-CH-04_silver.svg';
      default:
        return ''; // Default case or error handling
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        {/* <div className="game-container"></div> */}
        <img src={mapImagePath} alt="Troll Map" className={styles.map} />
        {/* Droppable area for coins outside the tube */}
        <StrictModeDroppable droppableId="outside" direction="vertical">
            {(provided) => (
            <div
                className={styles.outside}
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
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
    </DragDropContext>
    );
};

export default GreedyTrolls;
import React, { useState } from 'react';
import './ColoredGrid.css'; // Create this file for styling

const ColoredGrid = () => {
  // Initialize a 2D array to store cell colors
  const [grid, setGrid] = useState(Array(7).fill(Array(52).fill('white')));

  const handleCellClick = (row:number, col:number) => {
    // Create a copy of the grid to avoid mutating state directly
    const newGrid = grid.map(row => row.slice());
    newGrid[row][col] = 'blue'; // Change 'blue' to any color you want

    // Update the state with the new grid
    setGrid(newGrid);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col:number, colIndex: number) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: grid[rowIndex][colIndex] }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColoredGrid;

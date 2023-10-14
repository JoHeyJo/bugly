import React, { useState } from 'react';
import './style/Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState(Array(7).fill(Array(52).fill('white')));

  const handleCellClick = (row:number, col:number) => {
    const newGrid = grid.map(row => row.slice());
    newGrid[row][col] = 'blue';
    setGrid(newGrid);
  };

  return (
    <table className="grid">
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col:number, colIndex:number) => (
              <td key={colIndex}>
                <div
                  className="cell"
                  style={{ backgroundColor: grid[rowIndex][colIndex] }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;

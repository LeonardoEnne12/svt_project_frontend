import React, { useState } from 'react';
import './ClickableTable.css';
import Tooltip from './Tooltip';
import curricularData from '../custom/dados_curriculares_atualizados.json'; 

const ClickableTable = ({lines,columns}) => {
  const [clickedCells, setClickedCells] = useState({});

  const handleClick = (line, column) => {
    const cellContent = matrix[line][column];
    if (!cellContent || column < 1) return;
    const key = `${line}-${column}`;
    setClickedCells(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const matrix = Array.from({ length: lines }, (_, indexLine) =>
    Array.from({ length: columns + 1 }, (_, indexColumn) => {
      if (indexColumn === 0) {
        return `${indexLine + 1}º`;
      }
      return '';
    })
  );

  curricularData.forEach(data => {
    const [line, column] = data.position;
    matrix[line][column + 1] = data.curricular_unit;
  });

  return (
    <div className="table-container">
      <table>
        <tbody>
          {matrix.map((line, indexLine) => (
            <tr key={indexLine}>
              {line.map((cell, indexColumn) => {
                
                const keyCell = `${indexLine}-${indexColumn}`;
                const classCell = clickedCells[keyCell] ? 'clickedCell' : 'standardCell';
                const dataCell = curricularData.find(d => 
                  d.position[0] === indexLine && d.position[1] + 1 === indexColumn);

                return (
                  <td
                    key={indexColumn}
                    className={classCell}
                    onClick={() => handleClick(indexLine, indexColumn)}
                    style={{
                      cursor: (cell && indexColumn > 0) ? 'pointer' : 'default', 
                    }}
                  >
                    {dataCell ? (
                      <Tooltip text={`Pré-requisitos : ${dataCell.prerequisites.join(', ')}\nCarga horária: ${dataCell.workload}\nCréditos: ${dataCell.credit}`}>
                        {cell}
                      </Tooltip>
                    ) : cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClickableTable;

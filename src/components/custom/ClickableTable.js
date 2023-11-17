import React, { useState, useEffect } from 'react';
import './ClickableTable.css';
import Tooltip from './Tooltip';
import curricularData from '../custom/dados_curriculares_atualizados.json';

const ClickableTable = ({ lines, columns }) => {
  const [completedUnits, setCompletedUnits] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const isPrerequisiteCompleted = (prerequisites) => {
    return prerequisites.every(prerequisite => completedUnits.has(prerequisite));
  };

  const isPrerequisiteForCompletedUnit = (unit) => {
    return curricularData.some(data => 
      completedUnits.has(data.curricular_unit) && 
      data.prerequisites.includes(unit)
    );
  };

  const handleClick = (line, column) => {
    const dataCell = curricularData.find(d => 
      d.position[0] === line && d.position[1] + 1 === column);

    if (dataCell) {
      const unit = dataCell.curricular_unit;
      if (completedUnits.has(unit)) {
        if (!isPrerequisiteForCompletedUnit(unit)) {
          setCompletedUnits(prev => new Set([...prev].filter(x => x !== unit)));
        } else {
          setPopupContent(`A unidade ${unit} é pré-requisito de outra unidade já concluída.`);
          setShowPopup(true);
        }
      } else if (isPrerequisiteCompleted(dataCell.prerequisites) || dataCell.prerequisites.toString() === 'Não há') {
        setCompletedUnits(prev => new Set(prev.add(unit)));
      }
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

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
      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <span className="popuptext show">{popupContent}</span>
        </div>
      )}

      <table>
        <tbody>
          {matrix.map((line, indexLine) => (
            <tr key={indexLine}>
              {line.map((cell, indexColumn) => {
                const dataCell = curricularData.find(d => 
                  d.position[0] === indexLine && d.position[1] + 1 === indexColumn);

                let cellColor = 'standardCell';
                if (dataCell) {
                  if (completedUnits.has(dataCell.curricular_unit)) {
                    cellColor = 'approvedCell';
                  } else if (isPrerequisiteCompleted(dataCell.prerequisites) || dataCell.prerequisites.toString() === 'Não há') {
                    cellColor = 'standardCell';
                  } else {
                    cellColor = 'cannotDoCell';
                  }
                }

                return (
                  <td
                    key={indexColumn}
                    className={cellColor}
                    onClick={() => handleClick(indexLine, indexColumn)}
                    style={{
                      cursor: (cell && indexColumn > 0) ? 'pointer' : 'default',
                    }}
                  >
                    {dataCell ? (
                      <Tooltip text={`Pré-requisitos: ${dataCell.prerequisites.join(', ')}\nCarga horária: ${dataCell.workload}\nCréditos: ${dataCell.credit}`}>
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

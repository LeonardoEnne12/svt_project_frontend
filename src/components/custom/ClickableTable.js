import React, { useState, useEffect } from 'react';
import './ClickableTable.css';
import Tooltip from './Tooltip';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ClickableTable = ({ lines, columns, curricularData }) => {
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

  const matrix = Array.from({ length: lines }, (_, indexLine) =>
    Array.from({ length: columns + 1 }, (_, indexColumn) => {
      if (indexColumn === 0) {
        return `${indexLine + 1}º`;
      }
      return '';
    })
  );

  const exportToPdf = () => {
    const element = document.getElementById("table");
    if (element) {
      html2canvas(element).then(originalCanvas => {
        // Criar um novo canvas para rotacionar a imagem
        const rotatedCanvas = document.createElement('canvas');
        const context = rotatedCanvas.getContext('2d');
  
        // Definir as dimensões do novo canvas
        rotatedCanvas.width = originalCanvas.height;
        rotatedCanvas.height = originalCanvas.width;
  
        // Rotacionar e desenhar a imagem original no novo canvas
        context.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
        context.rotate(90 * Math.PI / 180); // Rotação de 90 graus
        context.drawImage(originalCanvas, -originalCanvas.width / 2, -originalCanvas.height / 2);
  
        // Converter o canvas rotacionado para uma imagem em formato de dados
        const imgData = rotatedCanvas.toDataURL('image/png');
  
        // Criar o PDF com a imagem rotacionada
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("tabela.pdf");
      });
    } else {
      console.error("Elemento não encontrado");
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

  curricularData.forEach(data => {
    const [line, column] = data.position;
    matrix[line][column + 1] = data.curricular_unit;
  });

  return (
    <div className="table-container">
       <div className="instructions">
        <p>Interaja com a tabela clicando nas células. Cada cor tem um significado:</p>
        <ul>
          <li><span className="approvedCell"></span> Concluído</li>
          <li><span className="standardCell"></span> Disponível para fazer</li>
          <li><span className="cannotDoCell"></span> Não disponível (pré-requisitos não atendidos)</li>
        </ul>
      </div>
      {showPopup && (
        <div className="popup">
          <span className="popuptext show">{popupContent}</span>
        </div>
      )}

      <table id="table" >
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
      <button className="export-button" onClick={exportToPdf}>Exportar para PDF</button>
    </div>
  );
};

export default ClickableTable;

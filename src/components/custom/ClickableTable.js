import React, { useState } from 'react';
import './ClickableTable.css';
import dadosCurriculares from '../custom/dados_curriculares_atualizados.json'; // Importar dados

const ClickableTable = () => {
  const [celulasClicadas, setCelulasClicadas] = useState({});
  const linhas = 10;
  const colunas = 11;

  const handleClick = (linha, coluna) => {
    const chave = `${linha}-${coluna}`;
    setCelulasClicadas(prev => ({ ...prev, [chave]: !prev[chave] }));
  };

  // Criar matriz para a tabela
  const matriz = Array.from({ length: linhas }, () =>
    Array.from({ length: colunas }, () => '')
  );

  // Preencher a matriz com os dados curriculares
  dadosCurriculares.forEach(dado => {
    const [linha, coluna] = dado.position;
    matriz[linha][coluna] = dado.curricular_unit;
  });

  return (
    <div className="table-container">
      <table>
        <tbody>
          {matriz.map((linha, indiceLinha) => (
            <tr key={indiceLinha}>
              {linha.map((celula, indiceColuna) => {
                const chaveCelula = `${indiceLinha}-${indiceColuna}`;
                const classeCelula = celulasClicadas[chaveCelula] ? 'celulaClicada' : 'celulaPadrao';

                return (
                  <td
                    key={indiceColuna}
                    className={classeCelula}
                    onClick={() => handleClick(indiceLinha, indiceColuna)}
                  >
                    {celula}
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

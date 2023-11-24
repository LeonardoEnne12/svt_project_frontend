import React, { useState, useEffect } from 'react';
import ClickableTable from '../custom/ClickableTable';
import EcompService from '../../services/EcompService';

const Ecomp = () => {
  const [curricularData, setCurricularData] = useState([]);

  useEffect(() => {
    const loadCurricularData = async () => {
      try {
        const data = await EcompService.getCurricularData();
        setCurricularData(data);
      } catch (error) {
        console.error('Erro ao carregar dados curriculares:', error);
      }
    };

    loadCurricularData();
  }, []);

  return (
    <div>
      <ClickableTable lines={10} columns={11} curricularData={curricularData} />
    </div>
  );
}

export default Ecomp;

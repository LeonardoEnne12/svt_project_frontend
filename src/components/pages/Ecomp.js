import React from 'react';
import ClickableTable from '../custom/ClickableTable';
import curricularData from '../custom/dados_curriculares_atualizados.json';

const Ecomp = () => {
  return (
    <div>
       <ClickableTable lines={10} columns={11} curricularData={curricularData} />
    </div>
  );
}

export default Ecomp;

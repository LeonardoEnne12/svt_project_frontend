import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../custom/CustomDropdown';

const HomePage = () => {
  const navigate = useNavigate();
  const options = ['Administrador', 'Estudante'];

  const handleSelect = (option) => {
    if (option === 'Administrador') {
      navigate('/admin');
    } else if (option === 'Estudante') {
      navigate('/estudante');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontFamily: 'Times New Roman' }}>
      <CustomDropdown options={options} onSelect={handleSelect} placeholder="Selecione seu perfil"/>
    </div>
  );
}

export default HomePage;

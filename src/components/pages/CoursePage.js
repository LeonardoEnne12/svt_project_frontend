import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../custom/CustomDropdown';

const CoursePage = () => {
    const navigate = useNavigate();
    const options = ['Engenharia de Computação'];

    const handleSelect = (option) => {
        if (option === 'Engenharia de Computação') {
        navigate('/estudante/ECOMP');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CustomDropdown options={options} onSelect={handleSelect} placeholder="Selecione seu curso"/>
        </div>
    );
    }

export default CoursePage;

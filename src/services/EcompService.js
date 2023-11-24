import api from '../api/Api';

const EcomService = {
  getCurricularData: async () => {
    try {
      const response = await api.get('/subjects_ecomp/getSubjects');
      return response.data;

    } catch (error) {
      console.error('Erro ao buscar dados curriculares:', error);
      throw error;
    }
  }
};

export default EcomService;

import axios from 'axios';

export const checkToken = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/check', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.warn('El usuario no tiene token o es inválido');
    } else {
      console.error('Error verificando el token:', error);
    }
    return null;
  }
};
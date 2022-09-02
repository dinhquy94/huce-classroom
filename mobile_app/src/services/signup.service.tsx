import axios from 'axios';
const baseUrl = 'http://localhost:3000/v1';

// Passing configuration object to axios
export const signUp = async (data) => {
  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/auth/register`,
    data
  };
  try {
    const response = await axios(configurationObject); 
    return { success: true, response }
  } catch (error) {
    return { success: false, response: error.response }
  }
};


// Passing configuration object to axios
export const signIn = async (data) => {
  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/auth/login`,
    data
  };
  try {
    const result = await axios(configurationObject);  
    return { 
      status: 1, 
      data: result.data 
    };
  } catch (error) {
    return { 
      status: 0,
      cancel: false,
      message: 'đã có lỗi xảy ra',
      code: 101,
      data: null
    }
  }
};


import fetchData from '../utils/fetchData';

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const registerResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
    return registerResult;
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
    return userResult;
  };

  return {postUser, getUserByToken};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const fileResult = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
    return fileResult;
  };

  return {postFile};
};

export {useAuthentication, useUser, useFile};

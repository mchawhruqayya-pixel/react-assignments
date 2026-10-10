import {useState, useEffect} from 'react';
import fetchData from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const mediaWithUsernames = await Promise.all(
        json.map(async (item) => {
          const userResult = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          return {...item, username: userResult.username};
        }),
      );

      setMediaArray(mediaWithUsernames);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      filesize: file.filesize,
      media_type: file.media_type,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mediaData),
    };
    const mediaResult = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
    return mediaResult;
  };

  return {mediaArray, postMedia};
};

export default useMedia;

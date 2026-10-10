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

  return {mediaArray};
};

export default useMedia;

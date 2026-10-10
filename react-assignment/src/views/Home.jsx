import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import fetchData from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;

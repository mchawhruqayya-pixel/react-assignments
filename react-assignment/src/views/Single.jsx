import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state.item;

  return (
    <div>
      <h3>{item.title}</h3>
      <p>By: {item.username}</p>
      <p>{item.description}</p>
      {item.media_type.startsWith('video') ? (
        <video src={item.filename} controls width="400" />
      ) : (
        <img src={item.filename} alt={item.title} width="400" />
      )}
      <br />
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;

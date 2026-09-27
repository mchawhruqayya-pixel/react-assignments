import {useRef, useEffect} from 'react';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  const dialogRef = useRef(null);

  useEffect(() => {
    if (item) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [item]);

  return (
    <dialog ref={dialogRef}>
      {item && (
        <>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.media_type.startsWith('video') ? (
            <video src={item.filename} controls width="400" />
          ) : (
            <img src={item.filename} alt={item.title} width="400" />
          )}
          <br />
          <button onClick={() => setSelectedItem(null)}>Close</button>
        </>
      )}
    </dialog>
  );
};

export default SingleView;

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Something went wrong with the request');
  }
  const json = await response.json();
  return json;
};

export default fetchData;

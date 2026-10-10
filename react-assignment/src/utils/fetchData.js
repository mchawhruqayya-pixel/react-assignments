const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Something went wrong with the request');
  }
  const json = await response.json();
  return json;
};

export default fetchData;

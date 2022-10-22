const post = async (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`http://localhost:4000/${url}`, options);
  return res.json();
};

const get = async (url) => {
  const res = await fetch(`http://localhost:4000/${url}`);
  return res.json();
};

  export { post, get };

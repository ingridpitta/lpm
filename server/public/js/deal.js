const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

const postDeal = (user2, travel, userObject) => {
  const deal = { user2, travel, userObject };
  api
    .post("/deal", deal)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

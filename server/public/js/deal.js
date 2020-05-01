const BASE_URL = "https://www.mlab.com/databases/heroku_9bc9z0f8/collections";
const api = axios.create({
  baseURL: BASE_URL
});

//Create Deal
const postDeal = (user2, travel, userObject) => {
  const deal = { user2, travel, userObject };
  api
    .post("/deal", deal)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

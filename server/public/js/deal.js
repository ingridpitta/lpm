const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

const postDeal = data => {
  api
    .post("/deal", data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

document.querySelectorAll(".card-action").forEach(btn => {
  btn.onclick = e => {
    const { id } = e.target;
    const url = window.location.pathname;

    const type = url.split("/")[2];
    const type_id = url.split("/")[3];

    if (type === "object") {
      api
        .get(`/travels/${id}`)
        .then(async res => {
          const data = {
            user2: res.data.user,
            travel: res.data._id,
            userObject: type_id
          };

          await postDeal(data);
          console.log({ data });
        })
        .catch(err => console.log(err));
    }

    if (type === "travel") {
      api
        .get(`/objects/${id}`)
        .then(async res => {
          const data = {
            user2: res.data.user,
            travel: type_id,
            userObject: res.data._id
          };

          await postDeal(data);
          console.log({ data });
        })
        .catch(err => console.log(err));
    }

    console.log({ id, url, type, type_id });
  };
});

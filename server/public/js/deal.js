const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});


document.querySelectorAll(".btn-select").forEach(btn => {
  btn.onclick = async e => {
    const { id } = await e.target;
    console.log({ id, container: container.attributes.data });
  };
});

const postDeal = (user2, travel, userObject) => {
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

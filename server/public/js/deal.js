const BASE_URL = "https://levapramim-lpm.herokuapp.com";
const api = axios.create({
  baseURL: BASE_URL
});

moment.locale("br");
moment.updateLocale("br", {
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    l: "DD/MM/YYYY",
    LL: "MMMM Do YYYY",
    ll: "MMM D YYYY",
    LLL: "MMMM Do YYYY LT",
    lll: "MMM D YYYY LT",
    LLLL: "dddd, MMMM Do YYYY LT",
    llll: "ddd, MMM D YYYY LT"
  }
});

const departures = document.getElementsByClassName("departure");
const arrivals = document.getElementsByClassName("arrival");

if (departures) {
  [...departures].map(content => {
    const date = content.innerText.split("Partida em")[1];
    const format_date = moment(date).format("l");
    content.innerText = `Partida em ${format_date}`;
  });
}

if (arrivals) {
  [...arrivals].map(content => {
    const date = content.innerText.split("Chegada em")[1];
    const format_date = moment(date).format("l");
    content.innerText = `Chegada em ${format_date}`;
  });
}

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
        })
        .catch(err => console.log(err));
    }
  };
});

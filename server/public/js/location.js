const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

const getTravels = async () => {
  await api
    .get("/travels")
    .then(res => {
      const { data } = res;
      const divTravel = document.getElementById("object");
      let content = "";

      if (data.length) {
        console.log({ data });
        data.map(tr => {
          const {
            description,
            origin,
            destination,
            departure,
            arrival,
            space,
            price
          } = tr;

          content += `<div class="travel--container"><h3>${description}</h3>
          <h3 class="travel--origin">${origin}</h3>
          <h3>${destination}</h3>
          <h3>${departure}</h3>
          <h3>${arrival}</h3>
          <h3>${space}</h3>
          <h3>${price}</h3></div>`;
        });
      } else {
        content += "<div><h2>Nenhuma viagem cadastrada</h2></div>";
      }
      divTravel.innerHTML = content;
    })
    .catch(err => console.log(err));
};

getTravels();

const getObjects = async () => {
  await api
    .get("/objects")
    .then(res => {
      const { data } = res;
      const divObject = document.getElementById("travel");
      let content = "";

      if (data.length) {
        console.log({ data });
        data.map(tr => {
          const {
            description,
            origin,
            destination,
            departure,
            arrival,
            size,
            price
          } = tr;

          content += `<div class="object--container"><h3>${description}</h3>
          <h3 class="object--origin">${origin}</h3>
          <h3>${destination}</h3>
          <h3>${departure}</h3>
          <h3>${arrival}</h3>
          <h3>${size}</h3>
          <h3>${price}</h3></div>`;
        });
      } else {
        content += "<div><h2>Nenhum objeto cadastrado</h2></div>";
      }
      divObject.innerHTML = content;
    })
    .catch(err => console.log(err));
};

getObjects();

// Getting User Location [Origin]
const displayLocationInfo = position => {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;

  console.log(`longitude: ${lng} | latitude: ${lat}`);
};

const navigatorObject = window.navigator;

if (navigatorObject.geolocation) {
  navigatorObject.geolocation.getCurrentPosition(displayLocationInfo);
}

// Getting Objects Locations [Destination]
const objectsLocations = () => {
  const objects = document.getElementsByClassName("object--origin");
  console.log({ objects });
  if (objects.length) {
    const objectsLocation = [...objects].map(obj => obj.innerText);
    console.log({ objectsLocation });
  }
};
objectsLocations();

// Getting Travels Locations [Destination]
const travelsLocations = () => {
  const travels = document.getElementsByClassName("travel--origin");
  console.log({ travels });
  if (travels.length) {
    const travelsLocation = [...travels].map(trav => trav.innerText);
    console.log({ travelsLocation });
  }
};
travelsLocations();
// Distance Matrix Requests [Objects]

// Distance Matrix Requests [Travels]

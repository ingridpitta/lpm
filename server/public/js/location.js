/* eslint-disable camelcase */
// Getting User Location [Origin]
const displayLocationInfo = async position => {
  const lng = await position.coords.longitude;
  const lat = await position.coords.latitude;

  console.log(`longitude: ${lng} | latitude: ${lat}`);
  return [lat, lng];
};

const navigatorObject = window.navigator;

if (navigatorObject.geolocation) {
  navigatorObject.geolocation.getCurrentPosition(displayLocationInfo);
}

const calculateDistance = async destination => {
  let user_origin;
  if (navigatorObject.geolocation) {
    const latlng = await displayLocationInfo();
    user_origin = await navigatorObject.geolocation.getCurrentPosition(latlng);
  }

  console.log({ origin: user_origin });
  const service = new google.maps.DistanceMatrixService();
  if (!user_origin) {
    service.getDistanceMatrix(
      {
        origins: ["-46.738349299999996,-23.6215512"],
        destinations: [...destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      },
      (response, status) => {
        if (status !== "OK") {
          console.log(`Error: ${status}`);
        } else {
          const originList = response.originAddresses;
          const destinationList = response.destinationAddresses;

          return { originList, destinationList };
        }
      }
    );
  }
};

const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

const getTravels = async () => {
  await api
    .get("/travels")
    .then(res => {
      const { data } = res;
      const divTravel = document.getElementById("travel");
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

          // const travel_origin = tr.origin;

          // const distances = await calculateDistance(travel_origin);
          // console.log({ travelDistances: distances });

          content += `<div class="row center-cols center-align">
                    <div class="col l3 m4 s10">
                      <div class="card">
                        <div class="card-image">
                          <img src="../../images/dashboard/dark-map.png">
                          <div class="card-title">
                            <div class="card-subtitle">Partida em ${departure}</div>
                            <div class="travel--origin">${origin}</div>
                            <div class="vl"></div>
                            <div class="card-subtitle">Chegada em ${arrival}</div>
                            <div class="travel--destination">${destination}</div>
                          </div>
                        </div>
                        <div class="card-content">
                          <p>${description}</p>
                        </div>
                        <div class="card-content">
                          <p>${space}</p>
                        </div>
                        <div class="card-content">
                          <p>${price}</p>
                        </div>
                        <div class="card-action">
                          <a href="#">Entre em contato</a>
                        </div>
                      </div>
                    </div>
                  </div>`;
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
      const divObject = document.getElementById("object");
      let content = "";

      if (data.length) {
        console.log({ data });
        data.map(obj => {
          const {
            description,
            origin,
            destination,
            departure,
            arrival,
            size,
            price
          } = obj;

          // const object_origin = obj.origin;

          // const distances = await calculateDistance(object_origin);
          // console.log({ objectDistances: distances });

          content += `<div class="row center-cols center-align">
                    <div class="col l3 m4 s10">
                      <div class="card">
                        <div class="card-image">
                          <img src="../../images/dashboard/dark-map.png">
                          <div class="card-title">
                            <div class="card-subtitle">Partida em ${departure}</div>
                            <div class="object--origin">${origin}</div>
                            <div class="vl"></div>
                            <div class="card-subtitle">Chegada em ${arrival}</div>
                            <div class="object--destination">${destination}</div>
                          </div>
                        </div>
                        <div class="card-content">
                          <p>${description}</p>
                        </div>
                        <div class="card-content">
                          <p>${size}</p>
                        </div>
                        <div class="card-content">
                          <p>${price}</p>
                        </div>
                        <div class="card-action">
                          <a href="#">Entre em contato</a>
                        </div>
                      </div>
                    </div>
                  </div>`;
        });
      } else {
        content += "<div><h2>Nenhum objeto cadastrado</h2></div>";
      }
      divObject.innerHTML = content;
    })
    .catch(err => console.log(err));
};

getObjects();

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

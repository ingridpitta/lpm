/* eslint-disable camelcase */
// Getting User Location [Origin]
let all_tr;
let all_obj;

const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

moment.locale("br");
moment.updateLocale('br', {
  longDateFormat : {
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

const calculateDistance = async (org, destinations) => {
  const user_origin = org;
  const dest = destinations.map(x => x.origin);

  const service = new google.maps.DistanceMatrixService();
  if (user_origin) {
    service.getDistanceMatrix(
      {
        origins: [org],
        destinations: [...dest],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      },
      (response, status) => {
        if (status !== "OK") {
          console.log(`Error: ${status}`);
        } else {
          const rows = response.rows[0].elements;
          const result = rows.map((x, index) => ({
            user_origin: response.originAddresses[0],
            destination: response.destinationAddresses[index],
            distance: x.distance ? x.distance.value : undefined,
            data: destinations[index],
            type: destinations[index].type,
            status: x.status
          }));

          console.log({ rows });
          result.sort((a, b) => a.distance - b.distance);

          const objs = result.filter(x => x.type == "obj");
          const trs = result.filter(x => x.type == "tr");

          if (objs.length) {
            const data = objs.filter(x => x.status == "OK");
            const divObject = document.getElementById("object");
            let content_obj = "";

            if (data.length) {
              data.map(obj => {
                const {
                  description,
                  origin,
                  destination,
                  departure,
                  arrival,
                  size,
                  price
                } = obj.data;

                const format_departure = moment(departure).format('l');
                const format_arrival = moment(arrival).format('l');

                content_obj += `<div class="row center-cols center-align">
                                <div class="col l3 m4 s10">
                                  <div class="card">
                                    <div class="card-image">
                                      <img src="../../images/dashboard/dark-map.png">
                                      <div class="card-title">
                                        <div class="card-subtitle">Partida em ${format_departure}</div>
                                        <div class="object--origin">${origin}</div>
                                        <div class="vl"></div>
                                        <div class="card-subtitle">Chegada em ${format_arrival}</div>
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
              content_obj += "<div><h2>Nenhum objeto cadastrado</h2></div>";
            }
            divObject.innerHTML = content_obj;
          }

          if (trs.length) {
            const data = trs.filter(x => x.status == "OK");
            const divTravel = document.getElementById("travel");
            let content_tr = "";

            if (data.length) {
              data.map(tr => {
                const {
                  description,
                  origin,
                  destination,
                  departure,
                  arrival,
                  space,
                  price
                } = tr.data;

                const format_departure = moment(departure).format("l");
                const format_arrival = moment(arrival).format("l");

                content_tr += `<div class="row center-cols center-align">
                    <div class="col l3 m4 s10">
                      <div class="card">
                        <div class="card-image">
                          <img src="../../images/dashboard/dark-map.png">
                          <div class="card-title">
                            <div class="card-subtitle">Partida em ${format_departure}</div>
                            <div class="travel--origin">${origin}</div>
                            <div class="vl"></div>
                            <div class="card-subtitle">Chegada em ${format_arrival}</div>
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
              content_tr += "<div><h2>Nenhuma viagem cadastrada</h2></div>";
            }
            divTravel.innerHTML = content_tr;
          }
          console.log({ objs, trs });
          return result;
        }
      }
    );
  }
};

const tr_data = async () => {
  await api
    .get("/travels")
    .then(async res => {
      const { data } = res;

      if (data.length) {
        all_tr = await data.map(tr => ({
          description: tr.description,
          origin: tr.origin,
          destination: tr.destination,
          departure: tr.departure,
          arrival: tr.arrival,
          space: tr.space,
          price: tr.price,
          type: "tr"
        }));

        return all_tr;
      }
    })
    .catch(err => console.log({ err }));
};

const obj_data = async () => {
  await api
    .get("/objects")
    .then(async res => {
      const { data } = res;

      if (data.length) {
        all_obj = await data.map(obj => ({
          description: obj.description,
          origin: obj.origin,
          destination: obj.destination,
          departure: obj.departure,
          arrival: obj.arrival,
          size: obj.size,
          price: obj.price,
          type: "obj"
        }));
      }

      return all_obj;
    })
    .catch(err => console.log({ err }));
};

const displayLocationInfo = async position => {
  
  const lng = await position.coords.longitude;
  const lat = await position.coords.latitude;

  const loc = `${lat}, ${lng}`;

  await obj_data();
  await tr_data();

  // console.log(`longitude: ${lng} | latitude: ${lat}`);

  await calculateDistance(loc, all_obj);
  await calculateDistance(loc, all_tr);
};

const navigatorObject = window.navigator;

if (navigatorObject.geolocation) {
  
  navigatorObject.geolocation.getCurrentPosition(displayLocationInfo);
}

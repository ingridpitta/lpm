const BASE_URL = "http://localhost:3001";
const api = axios.create({
  baseURL: BASE_URL
});

// Show data (tests)

const test = async () => {
  const objects = await api.get("/objects");
  const travels = await api.get("/travels");

  console.log({ objects, travels });
};

test();

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

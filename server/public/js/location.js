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
    const loc = [...objects].map(obj => obj);
    console.log({ loc });
  }
};
objectsLocations();
// Getting Travels Locations [Destination]

// Distance Matrix Requests [Objects]

// Distance Matrix Requests [Travels]

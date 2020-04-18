// import dotenv from "dotenv";

// dotenv.config();

// document.body.innerHTML = `<script src={https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}}></script>`;

const displayLocationInfo = position => {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;

  console.log(`longitude: ${lng} | latitude: ${lat}`);
};

const navigatorObject = window.navigator;

if (navigatorObject.geolocation) {
  navigatorObject.geolocation.getCurrentPosition(displayLocationInfo);
}

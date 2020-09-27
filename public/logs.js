const mymap = L.map("CheckInMap").setView([0, 0], 1); //making a map
// making tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

getData();

async function getData() {
  const response = await fetch("/api"); // getting the data
  const data = await response.json();
  console.log(data);
  for (item of data) {
    // many num of places have been logged in. it will take each place and its data will be shown on the map
    console.log(item);
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);

    // run the progra and console log the data and then write the path
    const weatherInfo = item.weatherInfo;
    const airInfo = item.airInfo;

    let txt = `latitude : ${item.lat} &deg;<br>
    longitude :  ${item.lon}&deg;<br>
    temperature : ${weatherInfo.temperature}&deg;C<br>
    summary : ${weatherInfo.summary}<br>`;

    if (airInfo.value < 0) {
      txt += `no air quality reading`;
    } else {
      txt += ` concentration of particulate matter : ${airInfo.parameter}&deg;<br>
        value : ${airInfo.value}&deg;<br>
        units : ${airInfo.unit}<br>
        last updated :${airInfo.lastUpdated} `;
    }

    marker.bindPopup(txt);
  }
  console.log(data);
}

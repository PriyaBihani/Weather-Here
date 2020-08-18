const mymap = L.map('CheckInMap').setView([0, 0], 1);//making a map
// making tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicHJpeWEtYmloYW5pIiwiYSI6ImNrMmUzeWhuODA1MHAzY3JhejRtdWt3MWQifQ.Ao9c-sCKQwgsz4tkNO8BTQ'
    }).addTo(mymap);

getData()

async function getData(){
    const response= await fetch('/api');// getting the data
    const data= await response.json()
    console.log(data)
    for(item of data){ // many num of places have been logged in. it will take each place and its data will be shown on the map

    const marker = L.marker([item.lat, item.lon]).addTo(mymap)

    // run the progra and console log the data and then write the path 
    const weatherInfo = item.weatherInfo
    const airInfo = item.airInfo

    let txt = `latitude : ${item.lat} &deg;<br>
    longitude :  ${item.lon}&deg;<br>
    temperature : ${weatherInfo.temperature}&deg;C<br>
    summary : ${weatherInfo.summary}<br>`

    if (airInfo.value<0){
        txt+= `no air quality reading`
    }else{
        txt+=` concentration of particulate matter : ${airInfo.parameter}&deg;<br>
        value : ${airInfo.value}&deg;<br>
        units : ${airInfo.unit}<br>
        last updated :${airInfo.lastUpdated} `
    }

    marker.bindPopup(txt)
    
}
    console.log(data)
}
// we have used many api in it 1. dark sky 2. open air quality 3. leaflet in database section
// okay so first of all we get our own loaction from geolocation in built in chrome and used in data selfie app 
// then we made a request to the server which in turn grab the data from those api-s. This is called making an api request from the sever so that our env variables are safe.
// in data selfie app we didnt use any api. and in iss station we have used leaflet.js api for mapping the station.


let lat, lon, weatherInfo,airInfo;// coz needed to be use everywhere

if('geolocation' in navigator){
    console.log('available')


 navigator.geolocation.getCurrentPosition( async position=>{

    try{

        lat = position.coords.latitude;
        lon = position.coords.longitude;


        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent=lon.toFixed(2); 

        const api_url = `/weather/${lat},${lon}`
        const response = await fetch(api_url)
        const json_string = await response.json()// server send this data acuring from respective apiS
        console.log(json_string)

        // acessing the data from the object send by the server and put it into the DOM elements 
        weatherInfo = json_string.weather.currently
        airInfo = json_string.air_quality.results[0].measurements[0]

        document.getElementById('temp').textContent = weatherInfo.temperature
        document.getElementById('summary').textContent = weatherInfo.summary
        document.getElementById('aq_parameter').textContent = airInfo.parameter
        document.getElementById('aq_value').textContent = airInfo.value
        document.getElementById('aq_units').textContent = airInfo.unit
        document.getElementById('aq_date').textContent = airInfo.lastUpdated

    }catch(error){
        console.log(error);
       
        airInfo = {value:-1}// no air quality reading will be shown in the database if this is -1

        document.getElementById('temp').textContent = weatherInfo.temperature
        document.getElementById('summary').textContent = weatherInfo.summary
        document.getElementById('aq_parameter').textContent = "NOT AVAILABLE"
        document.getElementById('aq_value').textContent = "NOT AVAILABLE"
        document.getElementById('aq_units').textContent ="NOT AVAILABLE"
        document.getElementById('aq_date').textContent = "NOT AVAILABLE"
}
})

}else{
        console.log('not available')
}

// saving it to the database
document.getElementById('check-in').addEventListener('click',async ()=>{
    
    const data = {lat, lon, weatherInfo, airInfo};
    const options = {
    method : 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
};
   const response= await  fetch ('/api', options)// send the data to server which will in turn save it to the database 
   const json = await response.json()
   console.log(json)
})

// it all starts in index.js
const express = require('express')
const dataStore= require('nedb')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()

app.listen(3000,()=>console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({limit:'1mb'}))

let dataBase = new dataStore('dataBase.db')
dataBase.loadDatabase();

app.post('/api',(request,response)=>{

    const data = request.body
    const timeStamp = Date.now()
    data.timeStamp = timeStamp
    dataBase.insert(data)
    response.json(data)// this data gets back
})
app.get('/api',(request,response)=>{
    dataBase.find({},(err,data)=>{// condtions can be passed 
        if(err){
            response.end()
            return
        }
        response.json(data)
    })
})

// It is the request made after geolocating. In this the url was passed with 2 parameters.
// Data was aquired from both the api's and was packed into an another object and send as a response.
// one api has the authentication key 
app.get('/weather/:latlon',async (request,response)=>{
  // breaking up the parameters
    console.log(request.params)
    const latlon = request.params.latlon.split(",")
    console.log(latlon)
    const lat = latlon[0]
    const lon = latlon[1]
    console.log(lat,lon)

  // acquring temperature and summary propertise from the dark sky api using an api key 
    const api_key = process.env.API_KEY
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`
    const weather_response = await fetch(weather_url)
    const weather_data = await weather_response.json()
    
  // other meta data from another api without using an authentication key 
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`
    const aq_response = await fetch(aq_url)
    const aq_data = await aq_response.json()
    const data = {
        air_quality: aq_data,
        weather : weather_data
    }
    response.json(data)
})
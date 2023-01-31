import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import WeatherCard from './components/WeatherCard'
import LoadCard from './components/LoadCard'

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState()
  const [isLoading, setIsLoading] = useState(true)



  useEffect(()=>{
    const success = (pos) =>{
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(()=>{
     if(coords){
      
      const APIKey = '5184b3f2f3913115f00e63fe86edb7f7';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`;
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1) ,
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemperature(obj)
        })
        .catch(err => console.log(err))
        .finally(()=>setIsLoading(false))
    }
  },[coords])

  return (
    <div className = "App">
      {
        isLoading ?
          <LoadCard/>
        :
          <WeatherCard
            weather = {weather}
            temperature = {temperature}
          />
      }
    </div>
  )
}

export default App

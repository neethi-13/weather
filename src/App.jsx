import { useState , useEffect } from 'react'
import rain from './assets/rain.png';
import clear from './assets/clear.png'
import SEARCH from './assets/image.png'
import cloud from './assets/cloud.png'
import humitity from './assets/humitity.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import dizzle from './assets/dizzle.png'
import ICON from './assets/icon.png'
import mist from './assets/mist.png';
import thunder from './assets/thunderstorm.png';
import PropTypes from 'prop-types';
import './App.css'
import { Analytics } from "@vercel/analytics/next"
const WeatherDetails= ({icon ,temp,city ,country , lat ,log , humi ,winds}) => {
  return ( 
    <>
      <div className='image'>
        <img src={icon} alt="fklhj" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude: </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude: </span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humitity} className="humi" alt="Humidity" />
          <div className='data'>
            <div  className='humi-precent'>{humi}%</div>
            <div className="text">Humidity</div>
          </div>

        </div>
        <div className="element">
          <img src={wind} className="wind" alt="wind" />
          <div className='data'>
            <div  className='wind-precent'>{winds}km/h</div>
            <div className="text">Speed</div>
          </div>

        </div>
      </div>
    </>
  );
 };



function App() {
  const [icon ,setIcon] = useState(ICON); 
  const [temp ,setTemp] = useState(0);
  const [city ,setCity] = useState("City");
  const [ inp ,setInp] = useState("SIVAKASI");
  const [country , setCountry] = useState('Country');
  const [lat ,setLat] = useState(0);
  const [log ,setLog] = useState(0);
  const [humi, SetHumi] = useState(0);
  const [winds ,setWinds] = useState(0);
  
  const [loading , setLoading]= useState(false);
  const weatherIconMap ={
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": dizzle,
    "03n": dizzle,
    "04d": dizzle,
    "04n": dizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunder,
    "11n": thunder,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

 const search = async () =>{
  setLoading(true);
  if(inp === ""){
    alert("Please Enter City Name");

  }else{
    
    
    let API_KEY = "bd78b8707808aec013da51f58a61b09e";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${API_KEY}&units=imperial`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod === "404"){
       console.error("City Not Found");
        alert("City Not Found \n OR \n Enter City Name Correctly");
        
        return;
      }
      SetHumi(data.main.humidity);
      const kmh = data.wind.speed * 1.609;
      setWinds(kmh.toFixed(2));
      const celsius = ((data.main.temp) - 32 ) * (5/9);
      setTemp(Math.floor(celsius));
      setCity(data.name);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setCountry(data.sys.country);
      const weatherIconCode  = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode]);
    } catch (error) {
      console.log("An error occued : " + error.message);
      

    }finally{
      setLoading(false);
    }
  }
 }
 function handleKeyDown(e){
   if(e.key == "Enter"){
    if(inp != ""){

      search();
    }else{
    alert("Please Enter City Name");
   }
   }
 }
useEffect( function () {
  search();
},[]);
  return (
    <>
      <div className='container'>
        <div  className='input-container'>
          <input type="text" name="inputcity"  className='inputcity' id="" value={inp} onChange={(e)=>setInp(e.target.value)} onKeyDown={handleKeyDown} placeholder='Enter City'/>
        <div className='serIcon'>
          <img src={SEARCH} alt="Search"  onClick={search} />
        </div>
       
        </div>
        {loading && <p className='p'>Loading ....</p>}
        <WeatherDetails icon ={icon} temp ={temp}  city={city} country ={country} lat = {lat} log={log} humi ={humi} winds={winds} />
      </div>
      
    </>
  )
}

export default App
WeatherDetails.propTypes ={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,
  humi:PropTypes.number.isRequired,
  winds:PropTypes.number.isRequired,

}

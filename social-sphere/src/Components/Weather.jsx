import React, { use } from 'react'
import axios from 'axios';
import './Weather.css';
const Weather = () => {
  const[data, setData] = React.useState({});
  cnst [location, setLocation] = useState('');

  const search = async() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Gurugram&units=Metric&appid=925fb3353a5be703bfd2e717059e968d`
    const response = await axios.get(url);
    setData(response.data)
    setLocation('');
    console.log(data)
  }
  const handleInputhange = (e) => {
    setLocation(e.target.value);
  }
  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className='fa-solid fa-location-dot'></i>
          <div className="location">Gurugram</div>
        </div>
          <div className="search-location">
          <input type="text" placeholder='Enter Location' value = {location} onChange={handleInputhange}/>
          <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
        </div>
      </div>
      <div className="weather-data">
        <i className='bx bxs-sun'></i>
        <div className="weather-type">Clear</div>
        <div className="temp">28°C</div>
      </div>
    </div>
  )
}

export default Weather

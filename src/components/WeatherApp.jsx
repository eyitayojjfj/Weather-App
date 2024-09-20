import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";



const WeatherApp = () => {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const api_key = '2158994ae0b0dc553362abfdcef6d217';

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading(true);
            const defaultLocation = 'Tbilisi';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
            const res = await fetch(url);
            const defaultData = await res.json();
            setData(defaultData);
            setLoading(false);  
        }
        fetchDefaultWeather();
    }, []);

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    }
     
    const search = async () => {
        if(location.trim() !== ''){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
            const res = await fetch(url);
            const searchData = await res.json();
            if(searchData.cod === '404') {
                setData({notFound: true});
            } else {
                setData(searchData);
                setLocation('');
            }
           setLoading(false);
        }
    }
       
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    const weatherImages = {
        Clouds: '/images/clear-sky.png',
        Clear: '/images/sun.png',
        Rain: '/images/rainy.png',
        Haze: '/images/clear-sky.png',
        Snow: '/images/snowy.png',
        Mist: '/images/mist.png',
        Fog: '/images/mist.png',
    };
    const weatherImage = data.weather ? weatherImages[data.weather[0].main]  : null;

    const backgroundImages = {
        Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
        Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Haze: 'linear-gradient(to right, #EEEEEE, #F1EFE9)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff)',
        Fog: 'linear-gradient(to right, #E1D7C6, #CDC2A5)'
    }
    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] :'linear-gradient(to right, #57d6d4, #71eeec)';
   
    const currentDate = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();

    const formattedDate = `${dayOfWeek},${dayOfMonth} ${month} `;
    return (
        <div className='container' style={{ backgroundImage }}>
            <div className='weather-app' style={{ backgroundImage : backgroundImage && backgroundImage.replace ? backgroundImage.replace('to right', 'to top') : null}}>
                <div className='search'>
                    <div className='search-top'>
                        <span><FaLocationDot /></span>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder='Enter location'  
                            value={location}
                            onChange={handleInputChange} 
                            onKeyDown={handleKeyDown} 
                        />
                        <span><FaSearch onClick={search} /></span>
                    </div>
                </div>
                     {loading ? (<img className='loader'
                    src='/public/spin.gif'/>) : data.notFound ? (
                        <div className="not-found">
                            <p>Location not found 😢</p>
                        </div>
                    ) : (
                        <><div className="weather">
                        <img src={weatherImage} alt="" />
                        <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                        <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                    </div>
                    <div className="weather-date">
                        <p>{formattedDate}</p>
                    </div>
                    <div className="weather-data">
                        <div className="humidity">
                            <div className="data-name">Humidity</div>
                            <span><FaDroplet /></span>
                            <div className="data">{data.main ? `${Math.floor(data.main.humidity)}%` : null}</div>
                        </div> 
                        <div className="wind">
                            <div className="data-name">Wind</div>
                            <span><FaWind /></span>
                            <div className="data">{data.wind ? `${Math.floor(data.wind.speed)}km/h` : null}</div>
                        </div>
                    </div></>
                    )}

                
            </div> 
        </div>
    );
}
export default WeatherApp
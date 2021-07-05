import {useState, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSun, faWind, faCloud, faTint} from "@fortawesome/free-solid-svg-icons";
          
function WeatherBox() {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [degrees, setDegrees] = useState("")
    const [temperatureC, setTemperatureC] = useState("");
    const [temperaturef, setTemperatureF] = useState("");
    const [icon, setIcon] = useState();    
    const [weather, setWeather] = useState("");
    const [wind, setWind] = useState("");
    const [clouds, setClouds] = useState("");
    const [humidity, setHumidity] = useState("");
   
    useEffect(() => {
        function success(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        };
        function error() {
            alert("Please turn on your location and reload the page.")
        };
        navigator.geolocation.getCurrentPosition(success, error);       
    }, []);

    useEffect(() => {
        const petition = async () => {  
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f45251d3ea56d5b3855dcf77bcd6d099&units=metric`      
            const data = await fetch(url).then(res => res.json())
            setName(data.name);
            setCountry(data.sys.country);
            setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)
            setTemperatureC(data.main.temp + "°C");            
            setWeather(data.weather[0].description);
            setWind(data.wind.speed);
            setClouds(data.clouds.all);
            setHumidity(data.main.humidity);
            setDegrees(temperatureC)
        }
        petition();             
    }, [latitude, longitude, temperatureC]);

    useEffect(() => {
        const petition = async () => {  
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f45251d3ea56d5b3855dcf77bcd6d099&units=imperial`      
            const data = await fetch(url).then(res => res.json())
            setTemperatureF(data.main.temp + "°F");            
        }
        petition();             
    }, [latitude, longitude]);
        
    const degreesChanger = () => {        
        if (degrees === temperatureC) {
            setDegrees(temperaturef)
        } else if (degrees === temperaturef) {
            setDegrees(temperatureC)
        }
    };

    return (
        <div className="container">            
            <h3 className="text-size">{name}, {country}</h3>
            <div className="container2">
                <div className="sub-container text-size">  
                    <img src={icon} alt="icon" className="icon"></img>                                 
                    <h1>{degrees}</h1>                                                                             
                </div>  
                <div className="sub-container2">
                    <div className="flex">
                        <FontAwesomeIcon icon={faSun}/>
                        <h4>Weather:</h4>
                        <p>"{weather.toUpperCase()}"</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faWind}/>
                        <h4>Wind:</h4>
                        <p>{wind} km/h</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faCloud}/>
                        <h4>Clouds:</h4>
                        <p>{clouds}%</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faTint}/>
                        <h4>Humidity:</h4>
                        <p>{humidity}%</p>
                    </div> 
                </div>                                                                                                                                    
            </div>  
            <button onClick={() => {
                degreesChanger()              
            }}>
            ºF / ºC
            </button>          
        </div>
    )       
};

export default WeatherBox


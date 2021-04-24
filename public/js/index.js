const api={
    key:"4f6ccecc785963c37f7b1521fc8bf6e6",
    // baseURL:"https://api.openweathermap.org/data/2.5/"
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    // baseURL:"https://api.openweathermap.org/data/2.5/"
    baseURL:"https://api.openweathermap.org/data/2.5/"

}


const weather={}
weather.temperature={
  unit:"°C"
}
const Kelvin=273;


let notification=document.querySelector('.notification')
if ('geolocation' in navigator) 
{
  navigator.geolocation.getCurrentPosition(setPosition,showError)
  
}
else
{
  notification.style.display="block"
  notification.innerHTML="<p>browser doesn't support geolocation </p>"
  
}

function setPosition(position)
{
  let latitude=position.coords.latitude;
  let longitude=position.coords.longitude;
  getweather(latitude,longitude)
  
}
function showError(err)
{
  notification.style.display="block"
  notification.innerHTML=`<>${err.messege}</>`
  
}







const searchInput=document.querySelector('.searchinput');
searchInput.addEventListener('keypress',setQuery)


function setQuery(event)
{
    if (event.keyCode==13)
    {
     getResults(searchInput.value);
     console.log(searchInput.value);        
    }
}

function getResults(city)
{
    fetch(`${api.baseURL}weather?q=${city}&appid=${api.key}&units=metric`).then(weather=>
        {
            return weather.json()
        }).then(showResult)
    
}

// function getweather(latitude,longitude)
// {
//     fetch(`${api.baseURL}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`).then(weather=>
//         {
//             return weather.json()
//         }).then(showResult)
    
// }
function getweather(latitude,longitude)
{
    fetch(`${api.baseURL}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`).then(response=>
        {
            // return weather.json()
            let data= response.json();
            return data;
        }).then(data=>
          {
            weather.temperature.value=Math.floor(data.main.temp-Kelvin)
            weather.city=data.name;
            weather.country=data.sys.country;
            weather.feels_like=data.main.feels_like;
            weather.humidity=data.main.humidity;
            weather.temp_max=data.main.temp_max;
            weather.temp_min=data.main.temp_min;
            weather.description=data.weather[0].main


          }).then(()=>
          {
            displayHomeWeather()
          })
    
}



















function displayHomeWeather()
{
  let city=document.querySelector('.location .city');
  city.innerText=`${weather.city},${weather.country}`


  let now =new Date()
  let date=document.querySelector('.location .date')
  date.innerText=dateBuilder(now); 
  
  let time=document.querySelector('.location  .time')
  // time.innerText=setinterval(getTimes(now),500)
  time.innerText=getTimes(now);

  
  let temperature=document.querySelector('.current .temp')
  let mainweather=weather.temperature.value;
  temperature.innerText=`${Math.round(mainweather)}°C`;

  var fahrenheit = Math.round(((parseFloat(weather.temperature.value)*1.8)+32));
  document.querySelector('.current .tempF').innerText=`${fahrenheit}°F`


  var feels_like=document.querySelector('.feels')
  feels_like.innerHTML=`${Math.round(weather.feels_like-Kelvin)}°C`


  var humidity=document.querySelector('.humidity');
  humidity.innerText=`${weather.humidity}%`

  let minmax=document.querySelector('.current .min-max')
  // minmax.innerText=`${Math.floor(weather.main.temp_min)}°C / ${Math.ceil(weather.main.temp_max)}°C`
  minmax.innerHTML=`${Math.floor(weather.temp_min-Kelvin)}°C <img src="../public/svg/down-arrow (1).png" width="10px" height="10px" alt=""> &nbsp; &nbsp; &nbsp; &nbsp; ${Math.ceil(weather.temp_max-Kelvin)}°C<img src="/public/svg/up-arrow.png" width="10px" height="10px" alt="">`
  // minmax.style.fontFamily="Playfair Display', serif"


  let weathertype=document.querySelector('.weather-type')
  weathertype.innerText=`${weather.description}`


  if (weathertype.innerText=="Clear")
  {
   //    document.querySelector('.img')
   document.querySelector('.icon').src="../public/svg/clear-night.png"
      document.body.style.backgroundImage="url(../public/images/clear2.jpg)";
   //    icon.
      
  }
  else if (weathertype.innerText=="Haze")
  {
   // document.body.style.backgroundImage="url(../public/svg/haze.png)"
   // document.querySelector('.img').style.backgroundImage="url(../svg/haze.png)"
   document.querySelector('.icon').src="../public/svg/haze.png"
   document.body.style.backgroundImage="url(../public/images/cloudy.jpg)"
      
  }

  else if (weathertype.innerText=="Clouds")
  {
   document.querySelector('.icon').src="../public/svg/cloudy.png"
   document.body.style.backgroundImage="url(../public/images/haze.jpg)"
 
  }
  else if (weathertype.innerText=="Smoke")
  {
   
   document.querySelector('.icon').src="../public/svg/smog.png"
   document.body.style.backgroundImage="url(../public/images/smog.jpg)"
      
  }
  else if (weathertype.innerText=="Snow")
 {
   document.querySelector('.icon').src="../public/svg/snowfall.png"
   document.body.style.backgroundImage="url(../public/images/snow.jpg)"
 }
 else if (weathertype.innerText=="Sunny")
 {
   document.querySelector('.icon').src="../public/svg/sunny.png"
   document.body.style.backgroundImage="url(../public/images/sunny.jpg)"
 }
}














function showResult(weather)
{
    console.log(weather);

    let city=document.querySelector('.location .city')
    city.innerText=`${weather.name},${weather.sys.country}`;
    // try
    // {
    //     if (searchInput.value!=weather.sys.country) throw "hey its not correct"

    // }catch(err)
    // {
    //    city.err=document.querySelector('.location .city')
    // }


    let now =new Date()
    let date=document.querySelector('.location .date')
    date.innerText=dateBuilder(now); 

    let time=document.querySelector('.location  .time')
    time.innerText=getTimes(now)


    // time.textContent=hours + ":" + minutes + ":" + seconds + " " +daynights 
    // time.textContent=`hours + ":" + minutes + ":" + seconds + " " +daynights`
    

    let temperature=document.querySelector('.current .temp')
    let mainweather=weather.main.temp;
    temperature.innerText=`${Math.round(mainweather)}°C`;
  

    var fahrenheit = Math.round(((parseFloat(weather.main.temp)*1.8)+32));
    document.querySelector('.current .tempF').innerText=`${fahrenheit}°F`
    // var fahrenheit = Math.round(((parseFloat(weather.main.temp)*1.8)+32));
    // document.querySelector('.tempF').innerHTML=`<sup class="tempF">${fahrenheit}&deg; F</sup>`

    var feels_like=document.querySelector('.feels')
    feels_like.innerHTML=`${Math.round(weather.main.feels_like)}°C`
    
    var humidity=document.querySelector('.humidity');
    humidity.innerText=`${weather.main.humidity}%`

    let minmax=document.querySelector('.current .min-max')
    // minmax.innerText=`${Math.floor(weather.main.temp_min)}°C / ${Math.ceil(weather.main.temp_max)}°C`
    minmax.innerHTML=`${Math.floor(weather.main.temp_min)}°C <img src="../public/svg/down-arrow (1).png" width="10px" height="10px" alt="">&nbsp; &nbsp; &nbsp; &nbsp; ${Math.ceil(weather.main.temp_max)}°C  <img src="../public/svg/up-arrow.png" width="10px" height="10px" alt="">`
   

    let weathertype=document.querySelector('.weather-type')
    weathertype.innerText=`${weather.weather[0].main}`
   if (weathertype.innerText=="Clear")
   {
    //    document.querySelector('.img')
    document.querySelector('.icon').src="../public/svg/clear-night.png"
       document.body.style.backgroundImage="url(../public/images/clear2.jpg)";
    //    icon.
       
   }
   else if (weathertype.innerText=="Haze")
   {
    // document.body.style.backgroundImage="url(../public/svg/haze.png)"
    // document.querySelector('.img').style.backgroundImage="url(../svg/haze.png)"
    document.querySelector('.icon').src="../public/svg/haze.png"
    document.body.style.backgroundImage="url(../public/images/cloudy.jpg)"
       
   }

   else if (weathertype.innerText=="Clouds")
   {
    document.querySelector('.icon').src="../public/svg/cloudy.png"
    document.body.style.backgroundImage="url(../public/images/haze.jpg)"
  
   }
   else if (weathertype.innerText=="Smoke")
   {
    
    document.querySelector('.icon').src="../public/svg/smog.png"
    document.body.style.backgroundImage="url(../public/images/smog.jpg)"
       
   }
   else if (weathertype.innerText=="Snow")
  {
    document.querySelector('.icon').src="../public/svg/snowfall.png"
    document.body.style.backgroundImage="url(../public/images/snow.jpg)"
  }
  else if (weathertype.innerText=="Sunny")
  {
    document.querySelector('.icon').src="../public/svg/sunny.png"
    document.body.style.backgroundImage="url(../public/images/sunny.jpg)"
  }

}




function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // let time = d.getTime();
  
  
    return `${day} ${date} ${month} ${year}`;
    // return `${day} ${date} ${month} ${year} ${time}`;
  
  }

  function getTimes(t)
  {
    let hours=t.getHours();
    let minutes=t.getMinutes();
    let seconds=t.getSeconds();
    let daynights;
    if (hours==12)
    {
      hours=12;
      
    }
    if (hours>12) 
    {
      daynights="PM"
      hours=hours-12;
      
    }
    if (hours<10) 
    {
      daynights="AM";
      hours="0"+hours
      
    }
    if (minutes<10) 
    {
      // daynights="AM";

      minutes="0"+minutes
      
    }
    if (seconds<10) 
    {
      // daynights="AM";

      seconds="0"+seconds
      
    }


    // let prepend=hours>=12?"PM":"AM";
    // time.textContent=hours + ":" + minutes + ":" + seconds + " " +daynights 

    return `${hours} : ${minutes} : ${seconds} ${daynights}`
    
  }
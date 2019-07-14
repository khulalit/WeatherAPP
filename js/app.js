window.addEventListener("load", function()
{
    var lat;
    var long;
    let temperaturel = document.querySelector(".temp-val");
    let temperatureDiscription = document.querySelector(".weather-dis");
    let timezne = document.querySelector(".location-timezone");
    let tempSpan = document.querySelector(".temp-span");
  
    //console.log(tempSpan.textContent); 
    
    
    navigator.geolocation.getCurrentPosition(function(position) 
        {
            lat = position.coords.latitude
            long = position.coords.longitude
            const proxy = "https://cors-anywhere.herokuapp.com/";
            var api = `${proxy}https://api.darksky.net/forecast/8e2803bb42f5ca1223a3cb3a219e0b07/${lat},${long}`;
            //console.log(position);
            fetch(api)
               .then (responce => {
                   return responce.json();
               })
            .then(data => {
                //console.log(data);
                const {temperature, summary, icon} = data.currently;
                temperaturel.textContent = temperature;
                temperatureDiscription.textContent = summary;
                timezne.textContent = "Time Zone "+data.timezone;
               // var icons = String(icon).toUpperCase().replace(/-/g,"_");
                //console.log(icons);
                // change temp to celcius
                seticons(icon , document.querySelector(".icon1"));
               
                tempSpan.addEventListener("click", () => {
                    if(tempSpan.textContent === "F") {
                        tempSpan.textContent = "C";
                        temperaturel.textContent = ((temperaturel.textContent - 32)*(5/9)).toFixed(2);
                    }
                    else { 
                        tempSpan.textContent = "F";
                        temperaturel.textContent = ((temperaturel.textContent*1.8)+32).toFixed(2);

                    }
                    
                });
                
                
                
                
            
                
                
                



            });
        });
        function seticons(icon, iconID)
        {
            const skycons = new Skycons({"color": "white"});
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID , Skycons[currentIcon]);
        }   
        
    
});
 
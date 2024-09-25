var search=document.getElementById("search");

var dayName=document.querySelector(".dayName");
var dayNumber=document.querySelector(".dayNumber");
var month1=document.querySelector(".month1");
var country=document.querySelector(".country");
var icon1=document.querySelector(".icon1");
var bigDeg=document.querySelector(".big-deg");
var statu=document.querySelector(".statu");

var newDay=document.querySelectorAll(".newDay");
var newIcon=document.querySelectorAll(".newIcon");
var deg=document.querySelectorAll(".deg");
var smallDeg=document.querySelectorAll(".smallDeg");
var newStatus=document.querySelectorAll(".newStatus");





async function doWheatherDate(countryName){
    var threeDay=await(await fetch(`https://api.weatherapi.com/v1/forecast.json?key=584a77f6ed7a4c81b83142348242409&q=${countryName}&days=3`)).json()
    return threeDay;
    
}

function doToday(dayStatus){
    var todayDate = new Date()
    dayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    dayNumber.innerHTML = todayDate.getDate()
    month1.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    country.innerHTML = dayStatus.location.name
    bigDeg.innerHTML = dayStatus.current.temp_c
    statu.innerHTML = dayStatus.current.condition.text
    icon1.setAttribute("src","https:"+dayStatus.current.condition.icon)
}

function weathernextdaydata(dayStatus){
    for( var i = 0 ; i<2 ; i++){
        var datenextday = new Date(dayStatus.forecast.forecastday[i+1].date)        
        newDay[i].innerHTML = datenextday.toLocaleDateString("en-US",{weekday:"long"})
        deg[i].innerHTML = dayStatus.forecast.forecastday[i+1].day.maxtemp_c
        smallDeg[i].innerHTML = dayStatus.forecast.forecastday[i+1].day.mintemp_c
        newStatus[i].innerHTML = dayStatus.forecast.forecastday[i+1].day.condition.text
        newIcon[i].setAttribute("src","https:"+dayStatus.forecast.forecastday[i+1].day.condition.icon)

    }
}
async function display(countryName="cairo"){
    var dateweathertoday = await doWheatherDate(countryName)
    if(!dateweathertoday.error){
        doToday(dateweathertoday)
        weathernextdaydata(dateweathertoday)
    }
    
 }
display()

search.addEventListener("input",function(){
    display(search.value)
})
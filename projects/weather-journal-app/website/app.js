/* Global Variables */

// const { json } = require("body-parser");
// const { response } = require("express");


// API key
let baseURL= 'https://api.openweathermap.org/data/2.5/weather';
let apiKey= 'aeb02d707c6900b915b06bc105c717b8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate()+'.'+ d.getFullYear();

const userInfo = document.getElementById('userInfo');
// event listener
    document.getElementById('generate').addEventListener('click', makeAction);

 //callback fun.
 function makeAction(e){
    e.preventDefault();
   const newZip= document.getElementById('zip').value;
   const feelings=document.getElementById('feelings').value;
getWeather(baseURL, newZip, apiKey)
.then(function (data){
    postData('/add', 
    {date:newDate, temp: data.main.temp, content: feelings })
updateUserInterface();
})
 }

//postData fun.
const postData= async(url= '', data= {})=>{
console.log('postData', data);
const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'content-type': 'application/json'}
})
body: JSON.stringify({
    temp: data.temp,
    date: data.date,
    content: data.content
});

try {
    const newData = await res.json();
    return newData;
} catch (error) {
    console.log(error)

}
}
// get web api data
const getWeather = async(baseURL, zipCode, apiKey)=>{
    const res = await fetch(`${baseURL}?zip=${zipCode}&appid=${apiKey}`);
try {
    const data = await res.json();
    return data;
} catch (error) {
    console.log(error)
}
};

// update the page (UI)

const updateUserInterface = async ()=>{
const req = await fetch('/getAll');
try {
    const data = await req.json();
    document.getElementById('date').innerHTML=`Date: ${data[0].Date}`;
    document.getElementById('temp').innerHTML=`Temp.: ${data[0].temp }`;
    document.getElementById('content').innerHTML=`I feel: ${data[0].feelings}`;
} catch (error) { 
    console.log(error)   
}
}
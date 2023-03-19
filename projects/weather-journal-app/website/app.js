/* Global Variables */

const { json } = require("body-parser");
const { response } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// API key
let baseURL= 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let key= '&appid=aeb02d707c6900b915b06bc105c717b8';

// event listener
    document.getElementById('generate').addEventListener('click', makeAction);

 //callback fun.
 function makeAction(e){
   const newZip= document.getElementById('zip').value;
   const feeling=document.getElementById('feelings').value;
getWeather(baseURL, newZip, key)
.then(function (data){
    postData('/add', {date:d, temp: data.list[0].main.temp, content: feeling })
updateUserInterface();
})
 }
//postData fun.

const postData= async(url= '', data= {})=>{
console.log('postData', data);
const res = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'content-type': 'application/json'}
})
body: JSON.stringify();
}

try {
    const newData = await response.json();
    return newData;
} catch (error) {
    console.log(error)
}
// get web api data
const getWeather = async(baseURL, zip, key)=>{
const res = await fetch(baseURL+zip+key);
try {
    const data = await res.json();
    return data;
} catch (error) {
    console.log(error)
}
};


// update the page (UI)

const updateUserInterface= async ()=>{
const req = await fetch('/all');
try {
    const data = await req.json();
    document.getElementById('date').innerHTML=`Date: ${data[0].Date}`;
    document.getElementById('temp').innerHTML=`Temp.: ${data[0].temp }`;
    document.getElementById('content').innerHTML=`I feel: ${data[0].feeling}`;
} catch (error) { 
    console.log(error)   
}
}
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey='&appid=15e21ec9d23c83ec1315166bf34f2f05&units=metric';

let d = new Date();

//I added "+1" to d.getMonth() as its value ranges from 0 to 11 which can be confusing for the user
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
/* Function to GET Web API Data*/
function performAction(e){
const newZip= document.getElementById('zip').value;
const content= document.getElementById('feelings').value

const getData = async (baseURL, zip, apiKey)=>{

  const res = await fetch(baseURL+zip+apiKey)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    
  }
}
/* Function to POST data */
const postData= async (url='', data={})=>{
  const response= await fetch(url,{
    method:'POST',
    credentials:'same-origin',
    headers:{
      'Content-type':'application/json',},
    body: JSON.stringify(data),
  });
  try{
    const newData= await response.json();
    return newData;
  }
  catch(error){
    console.log("error",error);
  }
}
/* Function to GET Project Data and add it to the app UI*/
const addToApp= async ()=>{
  const request= await fetch('/all');
  try{
    const allData= await request.json();
    document.getElementById('date').innerHTML= "Date: "+allData.date;
    document.getElementById('temp').innerHTML="Temperature: "+Math.round(allData.temp)+"°C";
    document.getElementById('content').innerHTML="Feelings: "+allData.content;
  }
  catch(error){
    console.log("error",error);
  }
}

//Call the functions in the required order using .then

//First GET Web API Data from user
getData(baseURL, newZip, apiKey)
.then(function (userData) {
  // Then POST Web API Data
  postData('/add', { date: newDate, temp: userData.main.temp, content })
}).then(function (newData) {
  // Then update the App UI
  addToApp()
})
}

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Global Variables
const apiKey = "b9a74a7762c637649bb572e4bc4ae09a";
const generateBtn = document.querySelector('#generate');
const dateHolder = document.querySelector('#date');
const tempHolder = document.querySelector('#temp');
const contentHolder = document.querySelector('#content');


generateBtn.addEventListener('click', callback);

async function callback() {
    const zipCode = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;

    if (zipCode !== "") {

        try {

            const recievedData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`);
            const result = await recievedData.json();
            const temp = result.main.temp;
            
    
            // Send the data to the app endpoint
            await fetch("/setData", {
                method: 'POST',
                credentials: 'same-origin',
                headers:  {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newDate,
                    temp,
                    content
                })
            });
    
            // Fetch the data from the app endpoint
            const response = await fetch("/getData", {credentials: 'same-origin'});
            const validData = await response.json();

            updateUI(validData);
            
        }catch(error) {
            console.log("City NOT Found!", error);
        }

    }else {
        alert('Please, type the zip code of your city!');
    }



}



function updateUI(data) {
    dateHolder.innerHTML = `Date: ${data.newDate}`;
    tempHolder.innerHTML = `Temperature: ${data.temp} °C`;
    contentHolder.innerHTML = `Feeling: ${data.content}`;
}



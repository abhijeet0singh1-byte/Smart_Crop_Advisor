const form = document.querySelector("form");

const weatherBox = document.querySelector(".weather-box");
const alertBox = document.querySelector(".alert p");
const cropCard = document.querySelector(".crop-card");
const bestCrop = document.querySelector(".best-result p");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.querySelector(".location input").value;
    const season = document.querySelector("#Season-select").value;
    const soil = document.querySelector("#Soil-Type").value;
    const area = parseFloat(document.querySelector(".area input").value);

    if (!location || !season || !soil || !area) {
        alert("Please fill all fields");
        return;
    }

    // Fake weather generator
    const rainfall = Math.floor(Math.random() * 300);
    const temperature = Math.floor(Math.random() * 20) + 20;

    weatherBox.innerHTML = `
        <h3>Weather Forecast</h3>
        <p>Rainfall: ${rainfall} mm</p>
        <p>Temperature: ${temperature} °C</p>
    `;

    // Alert logic
    if (rainfall > 200) {
        alertBox.textContent = "⚠️ Heavy rainfall expected!";
    } else if (temperature > 35) {
        alertBox.textContent = "⚠️ High temperature warning!";
    } else {
        alertBox.textContent = "Weather looks good 🌤️";
    }

    // Crop recommendation logic
    let crops = [];

    if (season === "Kharif") {
        crops = [
            { name: "Rice", yield: 2000, price: 20 },
            { name: "Maize", yield: 1500, price: 18 }
        ];
    } 
    else if (season === "Rabi") {
        crops = [
            { name: "Wheat", yield: 1800, price: 22 },
            { name: "Mustard", yield: 900, price: 50 }
        ];
    } 
    else {
        crops = [
            { name: "Potato", yield: 2500, price: 15 },
            { name: "Tomato", yield: 2200, price: 12 }
        ];
    }

    let best = null;
    let bestProfit = 0;

    cropCard.innerHTML = "";

    crops.forEach(crop => {
        const production = crop.yield * area;
        const revenue = production * crop.price;
        const cost = production * 5;
        const profit = revenue - cost;

        cropCard.innerHTML += `
            <div>
                <h4>${crop.name}</h4>
                <p>Expected Production: ${production} kg</p>
                <p>Market Price: ₹ ${crop.price} /kg</p>
                <p>Revenue: ₹ ${revenue}</p>
                <p>Net Profit: ₹ ${profit}</p>
                <hr>
            </div>
        `;

        if (profit > bestProfit) {
            bestProfit = profit;
            best = crop.name;
        }
    });

    bestCrop.textContent = `Best Crop: ${best} (₹ ${bestProfit} expected profit)`;
});
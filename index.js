// http://api.airvisual.com/v2/nearest_city?key=${key}
// ! Changing document.etc to => const element = ...
// TODO: Making the pointer fit the right color
// TODO: Making the code easy to understand as much as possible
// ? Creating a json file for the data

const key = "6a935a55-61aa-4ddb-8ce0-69cf52e9545a";
const cityElement = document.getElementById("city");
const cityNameElement = document.getElementById("city-name");
const airQualityIndexElement = document.getElementById("air-quality-index");
const pollutionInfoElement = document.getElementById("pollution-info");
const scaleBarLevelsElement = document.querySelectorAll(".levels");
let city;
let country;
let airQualityIndex;
let USAQILevel = 0;
let pollutionInfoLevels = [
	"Good",
	"Moderate",
	"Unhealthy for Sensitive Groups",
	"Unhealthy",
	"Very Unhealthy",
	"Hazardous",
];
let pollutionInfoColors = {
	level0: "#abd05f",
	level1: "#f5d462",
	level2: "#fc9a53",
	level3: "#f6666f",
	level4: "#a47dbf",
	level5: "#a07785",
};
let pollutionEmojis = ["😀", "🙁", "😨", "😷", "🤢", "💀"];

fetch(`https://api.airvisual.com/v2/city?city=Lahore&state=Punjab&country=Pakistan&key=${key}`)
	.then((res) => res.json())
	.then((data) => {
		country = data.data.country;
		city = data.data.city;
		airQualityIndex = data.data.current.pollution.aqius;
	})
	.then(() => {
		cityElement.textContent = `Here is ${city} situation.`;
		cityNameElement.textContent = `${city}, ${country}`;
		airQualityIndexElement.textContent = airQualityIndex;

		for (let i = 0; i < pollutionInfoLevels.length; i++) {
			if (airQualityIndex > 300) {
				pollutionInfoElement.textContent = pollutionInfoLevels[5];
				document.body.style.backgroundColor = pollutionInfoColors[`level${5}`];
				document.getElementById("emoji").textContent = pollutionEmojis[5];
				i = pollutionInfoLevels.length;
			} else {
				if (airQualityIndex <= USAQILevel) {
					pollutionInfoElement.textContent = pollutionInfoLevels[i];
					document.body.style.backgroundColor = pollutionInfoColors[`level${i}`];
					document.getElementById("emoji").textContent = pollutionEmojis[i];
					i = pollutionInfoLevels.length;
				} else {
					USAQILevel += 50;
				}
			}
		}
	});

for (const key in pollutionInfoColors) {
	scaleBarLevelsElement[Number(key.slice(key.length - 1, key.length))].style.backgroundColor =
		pollutionInfoColors[key];
}

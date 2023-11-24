const key = ""; // Put your key that you've got from the api
const emojiElement = document.getElementById("emoji");
const cityElement = document.getElementById("city");
const placeElement = document.getElementById("place");
const airQualityIndexElement = document.getElementById("air-quality-index");
const pollutionInfoElement = document.getElementById("pollution-info");
const scaleBarLevelsElement = document.querySelectorAll(".levels");
const pointerElement = document.getElementById("pointer");
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

fetch(`https://api.airvisual.com/v2/nearest_city?key=${key}`)
	.then((res) => res.json())
	.then((data) => {
		country = data.data.country;
		city = data.data.city;
		airQualityIndex = data.data.current.pollution.aqius;
	})
	.then(() => {
		cityElement.textContent = `Here is ${city} situation.`;
		placeElement.textContent = `${city}, ${country}`;
		airQualityIndexElement.textContent = airQualityIndex;
		for (let i = 0; i < pollutionInfoLevels.length; i++) {
			if (airQualityIndex > 300) {
				pollutionInfoElement.textContent = pollutionInfoLevels[5];
				document.body.style.backgroundColor = pollutionInfoColors[`level${5}`];
				emojiElement.textContent = pollutionEmojis[5];
				pointerElement.style.gridArea = `level${5} / level${5} / level${5} / level${5}`;
				i = pollutionInfoLevels.length;
			} else if (airQualityIndex <= USAQILevel) {
				pollutionInfoElement.textContent = pollutionInfoLevels[i - 1];
				document.body.style.backgroundColor = pollutionInfoColors[`level${i - 1}`];
				emojiElement.textContent = pollutionEmojis[i - 1];
				pointerElement.style.gridArea = `level${i} / level${i} / level${i} / level${i}`;
				i = pollutionInfoLevels.length;
			} else {
				USAQILevel += 50;
			}
		}
	});

for (const key in pollutionInfoColors) {
	scaleBarLevelsElement[Number(key.slice(key.length - 1, key.length))].style.backgroundColor =
		pollutionInfoColors[key];
}

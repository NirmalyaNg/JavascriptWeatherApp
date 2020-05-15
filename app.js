window.addEventListener('load', () => {
	let longitude;
	let latitude;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let degreeSection = document.querySelector('.degree-section');
	let degreeSpan = document.querySelector('.degree-section span');

	if (navigator.geolocation) {
		//If location is enabled in the browser
		navigator.geolocation.getCurrentPosition((position) => {
			//Get the latitude and longitude value from coords object inside position object
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			//getCurrentPosition takes a callback function as an argument which takes a position object containing different information
			const proxy = 'https://cors-anywhere.herokuapp.com/';

			//We need a proxy to send cross orogin requests through requests
			const api = `${proxy}https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
			//Get the api from darksky.net

			fetch(api)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					console.log(data);
					const { temperature, summary, icon } = data.currently;
					//Set DOM elements from the api data
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//set Icon
					setIcons(icon, document.querySelector('.icon'));

					//Change temperature to C/F
					let celcius = (temperature - 32) * (5 / 9);
					degreeSection.addEventListener('click', () => {
						let unit = degreeSpan.textContent;
						if (unit == 'F') {
							degreeSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celcius);
						} else {
							degreeSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;
						}
					});
				});
		});

		//Set the Icon through Skycons
		function setIcons (icon, iconID) {
			const skycons = new Skycons({ color: 'white' });
			const currentIcon = icon.replace(/-/g, '_').toUpperCase();
			skycons.play();
			return skycons.set(iconID, Skycons[currentIcon]);
		}
	} else {
	}
}); //After the page loads

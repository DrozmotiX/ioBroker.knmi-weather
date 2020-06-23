const stateAttrb = {
	"plaats": {
		"prefix": "",
		"name": "Ingestelde locatie",
		"type": "string",
		"role": "weather.location",
		"unit": "",

	},
	"temp": {
		"prefix": "current.",
		"name": "actuele temperatuur",
		"type": "number",
		"role": "weather.temperature",
		"unit": "°C",

	},
	"gtemp": {
		"prefix": "current.",
		"name": "gevoelstemperatuur",
		"type": "number",
		"role": "value.temperature.feelslike",
		"unit": "°C",

	},
	"samenv": {
		"prefix": "current.",
		"name": "omschrijving weersgesteldheid",
		"type": "string",
		"role": "weather.sate",
		"unit": "",

	},
	"lv": {
		"prefix": "current.",
		"name": "relatieve luchtvochtigheid",
		"type": "number",
		"role": "weather.humidity",
		"unit": "%",

	},
	"windr": {
		"prefix": "current.",
		"name": "windrichting",
		"type": "string",
		"role": "weather.direction.wind",
		"unit": "",

	},
	"windms": {
		"prefix": "current.",
		"name": "windsnelheid in meter per seconde",
		"type": "number",
		"role": "weather.speed.wind",
		"unit": "m/s",

	},
	"winds": {
		"prefix": "current.",
		"name": "windkracht (Beaufort)",
		"type": "number",
		"role": "weather.force.wind",
		"unit": "bft",

	},
	"windk": {
		"prefix": "current.",
		"name": "Windsnelheid in knopen",
		"type": "number",
		"role": "weather.speed.wind",
		"unit": "kt",

	},
	"windkmh": {
		"prefix": "current.",
		"name": "Windsnelheid in km/h",
		"type": "number",
		"role": "value.temperature",
		"unit": "km/h",

	},
	"luchtd": {
		"prefix": "current.",
		"name": "luchtdruk",
		"type": "number",
		"role": "value.temperature",
		"unit": "hPa",

	},
	"ldmmhg": {
		"prefix": "current.",
		"name": "luchtdruk in mm-kwikdruk",
		"type": "number",
		"role": "value.temperature",
		"unit": "mbar",

	},
	"dauwp": {
		"prefix": "current.",
		"name": "dauwpunt",
		"type": "number",
		"role": "weather.dewpoint",
		"unit": "°C",

	},
	"zicht": {
		"prefix": "current.",
		"name": "zicht in km",
		"type": "number",
		"role": "weather.view.distance",
		"unit": "km",

	},
	"verw": {
		"prefix": "current.",
		"name": "korte dagverwachting",
		"type": "string",
		"role": "weather.expectation",
		"unit": "",

	},
	"sup": {
		"prefix": "current.",
		"name": "zon op",
		"type": "string",
		"role": "weather.sunup",
		"unit": "",

	},
	"sunder": {
		"prefix": "current.",
		"name": "zon onder",
		"type": "string",
		"role": "weather.sununder",
		"unit": "",

	},
	"image": {
		"prefix": "current.",
		"name": "afbeeldingsnaam",
		"type": "string",
		"role": "weather.image",
		"unit": "",

	},
	"d0weer": {
		"prefix": "forecast.d0.",
		"name": "Weericoon vandaag",
		"type": "string",
		"role": "weather.image",
		"unit": "",

	},
	"d0tmax": {
		"prefix": "forecast.d0.",
		"name": "Maxtemp vandaag",
		"type": "number",
		"role": "weather.max.temperature",
		"unit": "°C",

	},
	"d0tmin": {
		"prefix": "forecast.d0.",
		"name": "Mintemp vandaag",
		"type": "number",
		"role": "weather.min.temperature",
		"unit": "°C",

	},
	"d0windk": {
		"prefix": "forecast.d0.",
		"name": "Windkracht vandaag",
		"type": "number",
		"role": "weather.force.wind",
		"unit": "bft",

	},
	"d0windr": {
		"prefix": "forecast.d0.",
		"name": "Windrichting vandaag",
		"type": "number",
		"role": "weather.direction.wind",
		"unit": "",

	},
	"d0windknp": {
		"prefix": "forecast.d0.",
		"name": "Windkracht in knopen vandaag",
		"type": "number",
		"role": "weather",
		"unit": "",

	},
	"d0windms": {
		"prefix": "forecast.d0.",
		"name": "Windsnelheid in ms vandaag",
		"type": "number",
		"role": "weather",
		"unit": "ms",

	},	
	"d0windkmh": {
		"prefix": "forecast.d0.",
		"name": "Windsnelheid in kmh vandaag",
		"type": "number",
		"role": "weather",
		"unit": "km/h",

	},	
	"d0neerslag": {
		"prefix": "forecast.d0.",
		"name": "Neerslagkans vandaag",
		"type": "number",
		"role": "value.precipitation",
		"unit": "%",

	},
	"d0zon": {
		"prefix": "forecast.d0.",
		"name": "Zonkans vandaag",
		"type": "number",
		"role": "weather.image",
		"unit": "%",

	},
	"d1weer": {
		"prefix": "forecast.d1.",
		"name": "Weericoon morgen",
		"type": "string",
		"role": "weather.image",
		"unit": "",

	},
	"d1tmax": {
		"prefix": "forecast.d1.",
		"name": "Maxtemp morgen",
		"type": "number",
		"role": "weather.max.temperature",
		"unit": "°C",

	},
	"d1tmin": {
		"prefix": "forecast.d1.",
		"name": "Mintemp morgen",
		"type": "number",
		"role": "weather.min.temperature",
		"unit": "°C",

	},
	"d1windk": {
		"prefix": "forecast.d1.",
		"name": "Windkracht morgen",
		"type": "number",
		"role": "weather.force.wind",
		"unit": "bft",

	},
	"d1windr": {
		"prefix": "forecast.d1.",
		"name": "Windrichting morgen",
		"type": "number",
		"role": "weather.direction.wind",
		"unit": "",

	},
	"d1windknp": {
		"prefix": "forecast.d1.",
		"name": "Windkracht in knopen morgen",
		"type": "number",
		"role": "weather",
		"unit": "",

	},
	"d1windms": {
		"prefix": "forecast.d1.",
		"name": "Windsnelheid in ms morgen",
		"type": "number",
		"role": "weather",
		"unit": "ms",

	},	

	"d1windkmh": {
		"prefix": "forecast.d1.",
		"name": "Windsnelheid in kmh morgen",
		"type": "number",
		"role": "weather",
		"unit": "km/h",

	},	
	"d1neerslag": {
		"prefix": "forecast.d1.",
		"name": "Neerslagkans morgen",
		"type": "number",
		"role": "value.precipitation",
		"unit": "%",

	},
	"d1zon": {
		"prefix": "forecast.d1.",
		"name": "Zonkans morgen",
		"type": "number",
		"role": "weather.image",
		"unit": "%",

	},
	"d2weer": {
		"prefix": "forecast.d2.",
		"name": "Weericoon overmorgen",
		"type": "string",
		"role": "weather.image",
		"unit": "",

	},
	"d2tmax": {
		"prefix": "forecast.d2.",
		"name": "Maxtemp overmorgen",
		"type": "number",
		"role": "weather.max.temperature",
		"unit": "°C",

	},
	"d2tmin": {
		"prefix": "forecast.d2.",
		"name": "Mintemp overmorgen",
		"type": "number",
		"role": "weather.min.temperature",
		"unit": "°C",

	},
	"d2windk": {
		"prefix": "forecast.d2.",
		"name": "Windkracht overmorgen",
		"type": "number",
		"role": "weather.force.wind",
		"unit": "bft",

	},
	"d2windr": {
		"prefix": "forecast.d2.",
		"name": "Windrichting overmorgen",
		"type": "number",
		"role": "weather.direction.wind",
		"unit": "",

	},
	"d2windknp": {
		"prefix": "forecast.d2.",
		"name": "Windkracht in knopen overmorgen",
		"type": "number",
		"role": "weather",
		"unit": "",

	},
	"d2windms": {
		"prefix": "forecast.d2.",
		"name": "Windsnelheid in ms overmorgen",
		"type": "number",
		"role": "weather",
		"unit": "ms",

	},	
	"d2windkmh": {
		"prefix": "forecast.d2.",
		"name": "Windsnelheid in kmh overmorgen",
		"type": "number",
		"role": "weather",
		"unit": "km/h",

	},		
	"d2neerslag": {
		"prefix": "forecast.d2.",
		"name": "Neerslagkans overmorgen",
		"type": "number",
		"role": "value.precipitation",
		"unit": "%",

	},
	"d2zon": {
		"prefix": "forecast.d2.",
		"name": "Zonkans overmorgen",
		"type": "number",
		"role": "weather.image",
		"unit": "%",

	},
	"alarm": {
		"prefix": "alarm.",
		"name": "Geldt er een weerwaarschuwing",
		"type": "string",
		"role": "weather.alarm",
		"unit": "",

	},
	"alarmtxt": {
		"prefix": "alarm.",
		"name": "Omschrijving van de weersituatie",
		"type": "string",
		"role": "weather.image",
		"unit": "",

	},

};

module.exports = stateAttrb;

'use strict';

/*
 * Created with @iobroker/create-adapter v1.11.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');
const stateAttr = require('./lib/stateAttr.js');

// Load your modules here, e.g.:
const request = require('request-promise-native');

class KnmiWeather extends utils.Adapter {

	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: 'knmi-weather',
		});
		this.on('ready', this.onReady.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {

		this.log.debug(this.name + ' startet using API-Key : ' + this.config['API-Key']);
		// read coordinates from system config
		const sys_conf = await this.getForeignObjectAsync('system.config');
		if (!sys_conf) return;
		

		this.log.debug(JSON.stringify(sys_conf));
		// Build request URL for KNMI API
		const requestUrl = 'http://weerlive.nl/api/json-data-10min.php?key=' + this.config['API-Key'] + '&locatie=' + this.systemConfig.objects.latitude + ',' + this.systemConfig.objects.longitude;

		const loadAll = async () => {
			// Try to call API and get global information
			try {
				const result = await request(requestUrl);
				this.log.debug('Data from KNMI API received : ' + result);
				const values = JSON.parse(result);
				try {
					// Test-Data
					// const data = JSON.parse('{ 'liveweer': [{'plaats': 'Amsterdam', 'temp': '13.4', 'gtemp': '13.4', 'samenv': 'Geheel bewolkt', 'lv': '79', 'windr': 'Oost', 'windms': '1', 'winds': '1', 'windk': '1.9', 'windkmh': '3.6', 'luchtd': '1022.9', 'ldmmhg': '767', 'dauwp': '9', 'zicht': '18', 'verw': 'Wolkenvelden en een enkele lichte bui. Morgen overal zonnig en droog', 'sup': '06:36', 'sunder': '20:44', 'image': 'wolkennacht', 'd0weer': 'halfbewolkt', 'd0tmax': '22', 'd0tmin': '9', 'd0windk': '3', 'd0windknp': '10', 'd0windms': '5', 'd0windkmh': '19', 'd0windr': 'O', 'd0neerslag': '0', 'd0zon': '75', 'd1weer': 'zonnig', 'd1tmax': '21', 'd1tmin': '8', 'd1windk': '3', 'd1windknp': '8', 'd1windms': '4', 'd1windkmh': '15', 'd1windr': 'O', 'd1neerslag': '0', 'd1zon': '90', 'd2weer': 'zonnig', 'd2tmax': '21', 'd2tmin': '9', 'd2windk': '2', 'd2windknp': '6', 'd2windms': '3', 'd2windkmh': '11', 'd2windr': 'O', 'd2neerslag': '10', 'd2zon': '80', 'alarm': '0'}]}');
					for (const key in values) {
						const arr = values[key];
						for (let i = 0; i < arr.length; i++) {
							const obj = arr[i];
							for (const prop in obj) {
								if (obj.hasOwnProperty(prop)) {
									this.doStatehandling(prop, obj[prop]);
								}
							}
						}
					}
				} catch (error) {
					this.log.error(error);
				}
			} catch (error) {
				this.log.error('Connection Failed, check your API key and coordinate settings in Admin configuration !');
			}
		};

		if (this.config.RainRadar === true) {
			await this.doRainradar();
		}

		try {
			await loadAll();
		} catch (e) {
			this.log.error('Unable to reach KNMI API : ' + e);
		}

		// Always terminate at the end
		this.terminate ? this.terminate() : process.exit();

	}

	async doStatehandling(statename, value) {

		// Try to get details from state lib, if not use defaults. throw warning if states is not known in attribute list
		if (stateAttr[statename] === undefined) {
			this.log.warn(`State attribute definition missing for + ${statename}`);
		}
		const state_name = stateAttr[statename] !== undefined ? stateAttr[statename].name || statename : statename;
		const role = stateAttr[statename] !== undefined ? stateAttr[statename].role || 'state' : 'state';
		const type = stateAttr[statename] !== undefined ? stateAttr[statename].type || 'mixed' : 'mixed';
		const unit = stateAttr[statename] !== undefined ? stateAttr[statename].unit || '' : '';

		this.log.debug(statename + ' : ' + value);

		await this.setObjectNotExistsAsync(test[statename]['prefix'] + statename, {
			type: 'state',
			common: {
				name: state_name,
				type: type,
				role: role,
				read: true,
				write: false,
				unit: unit
			},
			native: {},
		});

		await this.setStateAsync(test[statename]['prefix'] + statename, { val: value, ack: true });

	}

	async doRainradar() {
		const sys_conf = await this.getForeignObjectAsync('system.config');
		if (!sys_conf) return;
		const lat = this.system
		const long = this.systemConfig.objects.longitude;

		await this.doRainStates('rainradar.Current.City_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=1&voor=0', '120x220px');
		await this.doRainStates('rainradar.Current.City_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=2&voor=0', '256x256px');
		await this.doRainStates('rainradar.Current.City_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=2b&voor=0', '330x330px');
		await this.doRainStates('rainradar.Current.City_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=3&voor=0', '550x512px');
		await this.doRainStates('rainradar.Current.Region_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=1&voor=0', '120x220px');
		await this.doRainStates('rainradar.Current.Region_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=2&voor=0', '256x256px');
		await this.doRainStates('rainradar.Current.Region_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=2b&voor=0', '330x330px');
		await this.doRainStates('rainradar.Current.Region_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=3&voor=0', '550x512px');
		await this.doRainStates('rainradar.Current.Province_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=1&voor=0', '120x220px');
		await this.doRainStates('rainradar.Current.Province_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=2&voor=0', '256x256px');
		await this.doRainStates('rainradar.Current.Province_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=2b&voor=0', '330x330px');
		await this.doRainStates('rainradar.Current.Province_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=3&voor=0', '550x512px');
		await this.doRainStates('rainradar.Current.Country_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=1&voor=0', '120x220px');
		await this.doRainStates('rainradar.Current.Country_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=2&voor=0', '256x256px');
		await this.doRainStates('rainradar.Current.Country_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=2b&voor=0', '330x330px');
		await this.doRainStates('rainradar.Current.Country_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=3&voor=0', '550x512px');
		await this.doRainStates('rainradar.Forecast_3h.City_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=1&voor=1', '120x220px');
		await this.doRainStates('rainradar.Forecast_3h.City_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=2&voor=1', '256x256px');
		await this.doRainStates('rainradar.Forecast_3h.City_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=2b&voor=1', '330x330px');
		await this.doRainStates('rainradar.Forecast_3h.City_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=13&size=3&voor=1', '550x512px');
		await this.doRainStates('rainradar.Forecast_3h.Region_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=1&voor=1', '120x220px');
		await this.doRainStates('rainradar.Forecast_3h.Region_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=2&voor=1', '256x256px');
		await this.doRainStates('rainradar.Forecast_3h.Region_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=2b&voor=1', '330x330px');
		await this.doRainStates('rainradar.Forecast_3h.Region_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=11&size=3&voor=1', '550x512px');
		await this.doRainStates('rainradar.Forecast_3h.Province_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=1&voor=1', '120x220px');
		await this.doRainStates('rainradar.Forecast_3h.Province_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=2&voor=1', '256x256px');
		await this.doRainStates('rainradar.Forecast_3h.Province_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=2b&voor=1', '330x330px');
		await this.doRainStates('rainradar.Forecast_3h.Province_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=8&size=3&voor=1', '550x512px');
		await this.doRainStates('rainradar.Forecast_3h.Country_small', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=1&voor=1', '120x220px');
		await this.doRainStates('rainradar.Forecast_3h.Country_medium', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=2&voor=1', '256x256px');
		await this.doRainStates('rainradar.Forecast_3h.Country_tall', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=2b&voor=1', '330x330px');
		await this.doRainStates('rainradar.Forecast_3h.Country_huge', 'https://gadgets.buienradar.nl/gadget/zoommap/?lat=' + lat + '&lng=' + long + '&overname=2&zoom=6&size=3&voor=1', '550x512px');
	}

	// Function to handle state creation
	async doRainStates(device, value, name) {

		// Create objects
		await this.setObjectNotExistsAsync(device, {
			type: 'state',
			common: {
				name: name,
				type: 'string',
				role: 'weather.radar.rain',
				read: true,
				write: false,
			},
			native: {},
		});

		// Store links
		await this.setState(device, { val: value, ack: true });

	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			this.log.info(this.name + ' stopped, cleaned everything up...');
			callback();
		} catch (e) {
			callback();
		}
	}
}

if (module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new KnmiWeather(options);
} else {
	// otherwise start the instance directly
	new KnmiWeather();
}
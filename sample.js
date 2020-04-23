const prompt = require('prompt') // importing module for user i/p


//schema for user input type/ 
var schema = {
	properties: {
		tag: {
			message: 'Are you a reward or regular customer',
			required: true
		},
		date: {
			type: 'array',
			maxItems: 3
		}
	}
};
//names of hotels with rates for both weekday and weekend
let regular = {
	weekday: {
		coconutValley: 1100,
		AakulamLake: 1600,
		VeliBeach: 2200
	},
	weekend: {
		coconutValley: 900,
		AakulamLake: 600,
		VeliBeach: 1500
	}

};
let reward = {
	weekday: {
		coconutValley: 800,
		AakulamLake: 1100,
		VeliBeach: 1000
	},
	weekend: {
		coconutValley: 800,
		AakulamLake: 500,
		VeliBeach: 400
	}

};

//object to store the result
let myObj = new Object

function multiple(obj, type, num)  { //function to calculate the rate for both weekday or weekend
	for (var key in obj[type]) {
		let price = num * obj[type][key]
		myObj.hasOwnProperty(key) ? myObj[key] += price : myObj[key] = price
	}
	return myObj;
}

function hasDuplicates(obj)  { // function to check for duplicates in result object of rates
	let valuesSoFar = Object.create(null);
	for (let key in obj) {
		let value = obj[key];
		if (value in valuesSoFar) {
			return true;
		}
		valuesSoFar[value] = true;
	}
	return false;
}

//object store the rating for each hotel
const rating = {
	coconutValley: 3,
	AakulamLake: 4,
	VeliBeach: 5
}

//
// Start the prompt
//
prompt.start();

//getting the user input
//
prompt.get(schema, function(err, result) {
	let countdays = { // object to store number of days in weekday and weekend
		weekday: 0,
		weekend: 0
	}

	//loop through the array of dates to store number of weekday and/or weekend
	for (let i = 0; i < result.date.length; i++) {
		let birth = new Date(result.date[i])
		let day = birth.getDay()
		day >= 1 && day <= 4 ? countdays.weekday++ : countdays.weekend++
	}


	let name = result.tag.toLowerCase(); // store the value of customer type

	if (name == 'regular') {
		for (let key in countdays) { //loop through each weekday and weekend value 
			multiple(regular, key, countdays[key])
		}

	} else {

		for (let key in countdays) {
			multiple(reward, key, countdays[key])
		}
	}
	//console.log(myObj) ------>check if the value is correct


	//check if more than one hotels have same rate and yes then put result based on rating else the lowest rate
	hasDuplicates(myObj) ? console.log(Object.keys(rating).reduce((a, b) => rating[a] > rating[b] ? a : b) + ' will be best based on rating') :
		console.log(Object.keys(myObj).reduce((a, b) => myObj[a] < myObj[b] ? a : b) + ' will be the best option')



});


module.exports = { multiple, hasDuplicates}
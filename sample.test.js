const {
	multiple,
	hasDuplicates
} = require('./sample');


describe("Check if the object have two key with same value", () => {
	it("should return true if duplicates exits else false", () => {
		const test = hasDuplicates({
			a: 1,
			b: 2,
			c: 3,
			d: 1
		})
		
		expect(test).toBe(true)

	})
})


describe("calculate rates for each hotel based on type of customer and number of days to stay as i/p", () => {
	it("should return rates for each hotel", () => {
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

		const test = multiple(regular, 'weekday', 1)

		expect(test).toStrictEqual({
			coconutValley: 1100,
			AakulamLake: 1600,
			VeliBeach: 2200
		})

	})
})
describe("This instance is testing registration function....", function() {
	it('should be able to set and get the entered unique registration number CA 12547, CL 12345 and CK 12345', function() {
		const registrations = regNum();
		registrations.setReg('CA 123-456');
		registrations.setReg('CL 123456');
		registrations.setReg('CK 123 452');
		// console.log(registrations.getReg());
		assert.deepEqual(['CA 123-456', 'CL 123456', 'CK 123 452'], registrations.getReg());
	});

	it('should be able to add a registration from Cape Town successfully', function() {
		const registrations = regNum();
		registrations.setReg('CA 254782');
		assert.equal('CA 254782', registrations.getReg());
	});
	it('should be able to add a registration from Malmesbury successfully', function() {
		const registrations = regNum();
		registrations.setReg('CK 254782');
		assert.equal('CK 254782', registrations.getReg());
	});
	it('should be able to add a registration from Stellenbosch successfully', function() {
		const registrations = regNum();
		registrations.setReg('CL 254782');
		assert.equal('CL 254782', registrations.getReg());
	});
	it('should be able to add a registration number of a lower case and display it as Uppercase', function() {
		const registrations = regNum();
		registrations.setReg('ca 123456');
		assert.equal('CA 123456', registrations.getReg());
	});

    // it('should filter the registrations according to a selected town', function() {
	// 	const registrations = regNum();
	// 	registrations.setReg('CL 254782');
	// 	assert.equal('CL 254782', registrations.getReg());
	// });

	it('should display error messages saying *Please enter a registration number correctly* if a user entered a registration incorrectly and the incorrect registration number wont be added to the list of the entered registrations', function() {
		const registrations = regNum()
		var incorrectRegFormat = "*Please enter reg from these towns in this format [CL 123452] OR [CK 123-321] OR [CL 012 658]*";
		registrations.setReg('ca14578');
		assert.equal(incorrectRegFormat, registrations.addBtnErrors('ca14578'));
	});

	it('should display error messages saying *registration number already exist* if a user is entering a registration more than one time', function() {
		const registrations = regNum()
		var regAlreadyExist = "*Registration number already exist*"
		registrations.setReg('CA 124-570');
		registrations.setReg('CA 124-570');
		assert.equal(regAlreadyExist, registrations.addBtnErrors('CA 124-570'));
	});

	it('should return false if a user enters a registration number that takes less than 6 numbers and return a message saying with an example of the correct format', function() {
		const registrations = regNum();
		registrations.setReg('CA 25478');
		assert.equal(false, registrations.getReg());
	});
    
	it('should display error messages saying *please enter your a registration number* if a user clicked add button without entering registration number', function() {
		const registrations = regNum();
		var noReg = "*Please enter plate number*"
		registrations.setReg('');
		assert.equal(noReg, registrations.addBtnErrors())
	});
})
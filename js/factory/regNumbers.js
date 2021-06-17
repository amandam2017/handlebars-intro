function regNum(storageReigstrations) {
	// console.log(storageReigstrations)
	var regNumberList = storageReigstrations || [];
	// var regListTemplate = storedList || [];

	var localReg = ''
	var pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/;
	var pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
	var pattern2 = /^((CA|CK|CL)\s\d{3}\s\d{3})$/;

	function setReg(plateNumber) {
        plateNumber = plateNumber.toUpperCase();


		if(!regNumberList.includes(plateNumber) && pattern1.test(plateNumber) || pattern2.test(plateNumber) || pattern3.test(plateNumber)) {
			// if (!regNumberList.includes(plateNumber) && plateNumber.match(pattern)) {
			regNumberList.push(plateNumber)
			return localReg = plateNumber
		}
	}

	function getReg() {
		return regNumberList;
	}

	// assign whatever is entered to be equal the array
	function set(plateNumber){
		regNumberList = plateNumber
	}

	function addBtnErrors(plateNumber) {
		var emptyFieldError = '*Please enter plate number*'
		var alreadyExistRegError = '*Registration number already exist*'
		var incorrectPatternError = '*Please enter reg from these towns in this format [CL 123452] OR [CK 123-321] OR [CL 012 658]*'
		if(plateNumber) {
			if(pattern1.test(plateNumber) || pattern2.test(plateNumber) || pattern3.test(plateNumber)) {
				if(regNumberList.includes(plateNumber)) {
					return alreadyExistRegError;
				}
			} else {
				return incorrectPatternError;
			}
		} else {
			return emptyFieldError;
		}
	}


function viewSelectedTownTemp(townChecked) {

	var selectedTwnListTemp = [];
	for(var i = 0; i < storageReigstrations.length; i++) {
		var eachTownOnTemp = storageReigstrations[i]

			if(eachTownOnTemp.startsWith(townChecked)) {
				selectedTwnListTemp.push(eachTownOnTemp)
			}
		
	}
	return selectedTwnListTemp;

}

// function showAllTemp(){
// 	var allRegsStored = [];

// 	// while (printRegNumElem.firstChild) {
//     //     printRegNumElem.removeChild(printRegNumElem.firstChild);
//     // }

// 	for(let i = 0; i < storageReigstrations.length; i++) {
// 	var allRegs = storageReigstrations[i];
// 	if(allRegs){
// 		allRegsStored.push(allRegs);
// 	}
// 	return allRegsStored;
// }
// }

function listErrors(storageReigstrations){
	if(!storageReigstrations){
		return 'the storage is empty'
	}

}

	return {
		setReg,
		getReg,
		addBtnErrors,
		listErrors,
		set,
		viewSelectedTownTemp,
		// showAllTemp
	}
}
var btnAddElem = document.querySelector('.btnAdd');
var btnShowAllElem = document.querySelector('.btnShowAll');
var btnShowElem = document.querySelector('.btnShow');

var regOutputElem = document.querySelector('.regOutput');
var enteredRegTempElemt = document.querySelector('.enteredRegTemp');
var eachTownOutputElem = document.querySelector('.eachTownOutput');
var errorsElem = document.querySelector('.errors');

var successfulElem = document.querySelector('.successful');
var storageClearElem = document.querySelector('.storageClear');
var btnResetElem = document.querySelector('.btnReset');

var storageListTemp = []
if(localStorage['regListTemplate']) {
	storageListTemp = JSON.parse(localStorage.getItem('regListTemplate'));
}

//REFERENCE THE TEMPLATE
const userTemplateElem = document.querySelector('.userTemplate').innerHTML

 //COMPILE THE TEMPLATE
 var userTemplate = Handlebars.compile(userTemplateElem);
 
//an instance for my function
var registrationsTemp = regNum(storageListTemp);

registrationsTemp.set(storageListTemp);
// regOutputElem.innerHTML = userTemplate({eachRegNo: storageListTemp});	


var patternOne = /^((CA|CK|CL)\s([0-9]){6})$/i;
var patternTwo = /^((CA|CK|CL)\s\d{3}\-\d{3})$/i;
var patternThree = /^((CA|CK|CL)\s\d{3}\s\d{3})$/i;


function regDisplay() {

	var carRegNo = enteredRegTempElemt.value
    if (carRegNo != '') {
        carRegNo = carRegNo.toUpperCase();
    }

	if(carRegNo) {
		if(patternOne.test(carRegNo) || patternTwo.test(carRegNo) || patternThree.test(carRegNo)) {

			if(!storageListTemp.includes(carRegNo)) {
				var list = registrationsTemp.setReg(carRegNo)
				// console.log('added reg:',list)
				regOutputElem.innerHTML = userTemplate({eachRegNo: registrationsTemp.getReg()});	
				successfulElem.innerHTML = 'seccessfully added a registration'
				errorsElem.innerHTML = ""

			} else {
				errorsElem.innerHTML = registrationsTemp.addBtnErrors(carRegNo);
				successfulElem.innerHTML = ""

			}
		} else {
			errorsElem.innerHTML = registrationsTemp.addBtnErrors(carRegNo);
			successfulElem.innerHTML = ""

		}
	} else {
		errorsElem.innerHTML = registrationsTemp.addBtnErrors(carRegNo);
		successfulElem.innerHTML = ""

	}
	enteredRegTempElemt.value = ''

	let key = registrationsTemp.getReg();
	localStorage.setItem('regListTemplate', JSON.stringify(key));
	// console.log(key);
	clearBtn();
	setTimeout(function() {
		errorsElem.innerHTML = ""
		successfulElem.innerHTML = ""
	}, 4000)
}

function resetTemplateStorage() {
	localStorage.removeItem('regListTemplate')
	location.reload()
	successfulElem.innerHTML = 'Storage successfully cleared'
}

// function showAllStorageTemp(){

// 	// regOutputElem.innerHTML = '';
// 	var townsOnStorageTemp = JSON.parse(localStorage.getItem('regNumbersList'))
// 	// document.getElementById("selectedTownReg").innerHTML = "";
// 	// var checkedButton = document.querySelector("input[name ='town']:unchecked");
// 	var checkedButton = document.querySelector("input[name ='town']:checked");
// 	if(checkedButton) {
// 		selectedTwn = checkedButton.value
// 	}
// 	regOutputElem.innerHTML = userTemplate({townRegNo: registrationsTemp.getReg()});	
// }

// function viewSelectedTownTemp(startsLettersForTown, storedRegs){
// 	console.log('first',startsLettersForTown)
// 	console.log('2nd',storedRegs)

// 	// regOutputElem.innerHTML = '';
// 	var townsOnStorageTemp = JSON.parse(localStorage.getItem('regNumbersList'))
// 	// document.getElementById("selectedTownReg").innerHTML = "";
// 	// var checkedButton = document.querySelector("input[name ='town']:unchecked");
// 	var checkedButton = document.querySelector("input[name ='town']:checked");
// 	if(checkedButton) {
// 		selectedTwn = checkedButton.value
// 	}
// 	regOutputElem.innerHTML = userTemplate({townRegNo: registrationsTemp.getReg()});	
// }
// view selected towns onlocal storage
var checkedTownTemp = ''

function viewSelectedTownTemp() {
	printRegNumElem.innerHTML = '';
	var townsOnStorageTemplate = JSON.parse(localStorage.getItem('regListTemplate'))
	document.getElementById("selectedTownReg").innerHTML = "";
	var checkedButtonTemp = document.querySelector("input[name ='town']:checked");
	if(checkedButtonTemp) {
		checkedTownTemp = checkedButtonTemp.value
	}
	var selectedTwnListTemp = [];
	for(var i = 0; i < townsOnStorageTemplate.length; i++) {
		var eachTownOnTemp = townsOnStorageTemplate[i]
		if(eachTownOnTemp){
			if(eachTownOnTemp.startsWith(checkedTownTemp)) {
				selectedTwnListTemp.push(eachTownOnTemp);
			}
		}
		
	}

	for(let i = 0; i < selectedTwnListTemp.length; i++) {
		const elementForTown = selectedTwnListTemp[i];
		console.log('what is in here:',selectedTwnListTemp[i])
		//  console.log(selectedTwnListTemp[i])
		// var regLi = document.createElement('Li');
		eachTownOutputElem.innerHTML = userTemplate({townRegNo: elementForTown});	

		//  const newContent = document.createTextNode(elementForTown);
		// printRegNumElem.appendChild(regLi);
	}
	clearBtn();
    // checkedButtonTemp.value = false;
}
// var listRegTemp = registrationsTemp.getReg();

function showAll(){

	// while (printRegNumElem.firstChild) {
    //     printRegNumElem.removeChild(printRegNumElem.firstChild);
    // }

	for(let i = 0; i < listRegTemp.length; i++) {
	const elementForTown = listRegTemp[i];
	// console.log(elementForTown)
	// var displayOnLoad = document.createElement('Li');
	displayOnLoad.innerHTML = elementForTown;
	printRegNumElem.appendChild(displayOnLoad);
	// printRegNumElem.

}
}

function clearBtn() {
	document.getElementById('registrationNumberForm').reset();
}

// window.onload = showAllStorageTemp();

btnAddElem.addEventListener('click', regDisplay);
btnShowElem.addEventListener('click', viewSelectedTownTemp);
// btnShowAllElem.addEventListener('click', showAllStorageTemp);
btnResetElem.addEventListener('click', resetTemplateStorage);
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

//DISPLAYING ADDED REGISTRATIONS
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

//DISPLAYING REGISTRATIONS FROM A TOWN

function viewByTownTemp(){
	var checkedButtonTemp = document.querySelector("input[name ='townTemp']:checked");
	if(checkedButtonTemp) {
		checkedTownTemp = checkedButtonTemp.value
		console.log('checking',checkedTownTemp)

		var towns = registrationsTemp.viewSelectedTownTemp(checkedTownTemp);
		regOutputElem.innerHTML = userTemplate({eachRegNo: towns});	
		errorsElem.innerHTML = ''
	}else{
		errorsElem.innerHTML = registrationsTemp.showErrors();
		regOutputElem.innerHTML = ''

	}

	
	
	clearBtn();
	
}

//SHOW REG FROM STORAGE
function allStorageRegs(displayAllRegOnStorage){
	var allRegsNumbers = registrationsTemp.getReg();
	// console.log(allRegsNumbers)
	if(allRegsNumbers !== ''){
		regOutputElem.innerHTML = userTemplate({eachRegNo: allRegsNumbers});
	}else{
		return 'there is no registrations on storage'
	}	
}

//CLEARING TEMPLATE STORAGE
function resetTemplateStorage() {
	localStorage.removeItem('regListTemplate')
	location.reload()
	successfulElem.innerHTML = 'Storage successfully cleared'
}

//RESETTING FORM FIELDS
function clearBtn() {
	document.getElementById('regTemplateForm').reset();
}

//SHOW STORAGE ON WHEN PAGE IS REFRESHED
window.onload = allStorageRegs();

btnAddElem.addEventListener('click', regDisplay);
btnShowElem.addEventListener('click', viewByTownTemp);
btnShowAllElem.addEventListener('click', allStorageRegs);
btnResetElem.addEventListener('click', resetTemplateStorage);
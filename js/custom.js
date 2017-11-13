// -------------------- Variable -------------------- //

var oldSystem = [
    {
        grade : "A+",
        value : 4
    },
    {
        grade : "A",
        value : 3.7
    },
    {
        grade : "B+",
        value : 3.3
    },
    {
        grade : "B",
        value : 3
    },
    {
        grade : "B-",
        value : 2.7
    },
    {
        grade : "C+",
        value : 2.3
    },
    {
        grade : "C",
        value : 2
    },
    {
        grade : "C-",
        value : 1.7
    },
    {
        grade : "D",
        value : 1
    },
    {
        grade : "F",
        value : 0
    }
];

var newSystem = [
    {
        grade : "A+",
        value : 4
    },
    {
        grade : "A",
        value : 4
    },
    {
        grade : "A-",
        value : 3.7
    },
    {
        grade : "B+",
        value : 3.3
    },
    {
        grade : "B",
        value : 3
    },
    {
        grade : "B-",
        value : 2.7
    },
    {
        grade : "C+",
        value : 2.3
    },
    {
        grade : "C",
        value : 2
    },
    {
        grade : "C-",
        value : 1.7
    },
    {
        grade : "D+",
        value : 1.3
    },
    {
        grade : "D",
        value : 1
    },
    {
        grade : "F",
        value : 0
    }
];

var customSystem = [];

// 0 for old, 1 for new and 2 for custom, will be used to decide which one of the three array to be used in calculation phase
var selectedSystem ;

// number of grades to be included in the custom system
var customNumber = 0;

// empty drop down list to be populated with the systemlater
var dropDownList = document.createElement("select");

var numberOfSemesters = 0;
// first value will be zero, and I'll be using values between position 1 (No. of subjects in semester 1) upto number of semesters e.g. n (No. of subjects in semester n)
var subjectsInSemester = [0];

// -------------------- Variable -------------------- //



// -------------------- Initilizing elements and functions called at beginning -------------------- //

// set the function to be called for all radio buttons when a radio button selection is changed
setRadioButtonOnChangeEvent();

// -------------------- Initilizing elements and functions called at beginning -------------------- //


// -------------------- Options section functions -------------------- //

// set the function to be called for all radio buttons when a radio button selection is changed, this function is called only once at beginning to set the action for all the radio button to be loadTheRadioButtonOptions
function setRadioButtonOnChangeEvent () {
    
    var allRadioButtonsArray = document.getElementsByName("option");
    
    // get by name will return an array of all elements, so have to loop through them all to change the property of all
    for(var i = 0; i < allRadioButtonsArray.length; i++)
        allRadioButtonsArray[i].onchange = loadTheRadioButtonOptions;
}

function loadTheRadioButtonOptions () {

    // get the value of the checked radio (old, new or custom)
    var radios = document.getElementsByName('option');
    var value = "";
    for (var i = 0 ; i < radios.length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
            break;
        }
    }
    
    
    switch (value){
        case "old":
            populateTheGradingScheme(oldSystem);
            document.getElementById("system-scheme").style.display = "block";
            document.getElementById("custom-input-buttons").style.display = "none";
            document.getElementById("custom-input-fields").style.display = "none";
            // when moving from new to old or old to new, I hide first to delete all the previous content present then show it on being clean
            hideSemestersContainer();
            showSemestersContainer();
            selectedSystem = 0;
            break;
            
        case "new":
            populateTheGradingScheme(newSystem);
            document.getElementById("system-scheme").style.display = "block";
            document.getElementById("custom-input-buttons").style.display = "none";
            document.getElementById("custom-input-fields").style.display = "none";
            // when moving from new to old or old to new, I hide first to delete all the previous content present then show it on being clean
            hideSemestersContainer();
            showSemestersContainer();
            selectedSystem = 1;
            break;
            
        case "custom":
            document.getElementById("system-scheme").innerHTML = "Add the custom system details then click Save!";
            document.getElementById("system-scheme").style.display = "block";
            document.getElementById("custom-input-buttons").style.display = "block";
            document.getElementById("custom-input-fields").style.display = "block";
            hideSemestersContainer();
            selectedSystem = 2;
            break;
    }
}

function addCustomGrade () {

    var div = "";
    
    customNumber += 1;
    div += '<div id="custom-' + customNumber + '" class="col-lg-3 col-md-3 col-sm-4 col-xs-6 custom"><input type="text" autocomplete="off" id="custom-grade-' + customNumber + '" placeholder="grade' + customNumber + '" class="field col-lg-6 col-md-6 col-sm-6 col-xs-6"> <input type="number" step="any" autocomplete="off" id="custom-value-' + customNumber + '" placeholder="value' + customNumber + '" class="field col-lg-6 col-md-6 col-sm-6 col-xs-6">';
    
    var inputFieldsDivId = "custom-input-fields";
    document.getElementById(inputFieldsDivId).insertAdjacentHTML ('beforeend' , div);
}

function deleteCustomGrade () {
    
    inputFielId = "custom-" + customNumber;
    
    var element = document.getElementById(inputFielId);
    element.parentNode.removeChild(element);
    customNumber -= 1;
}

function saveCustomScheme () {
    var tempNumber;
    
    var tempGrade;
    var tempValue;
    
    // JSON string and object which will be added repeatedly to the tempArray
    var tempObjString;
    var tempObj;
    
    // tempArray is needed so every time save is clicked, a new empty array is created and replaced with customSystem array
    var tempArray = [] ;
    
    // retrieving all the custom grade  
    for (tempNumber = 1; tempNumber <= customNumber ; ++tempNumber) {
        tempGrade = document.getElementById('custom-grade-' + tempNumber).value ;
        tempValue = document.getElementById('custom-value-' + tempNumber).value;
        
        // in case no grade in the field, I will ignore the field (field will be ignored on calculations too)
        if (tempGrade == "") {
            alert("Grade " + tempNumber + " is empty, we just ignored it. To include it, fix it and click save again!")
            continue;
        }
        // in case no value in the field or the value is not a number, I wil ignore the field (field will be ignored on calculations too)
        else if (tempValue == "") {
            alert("Value " + tempNumber + " is empty or doesn't include a number, we just ignored it. To include it, fix it and click save again!")
            continue;
        }
        
        tempObjString ='{"grade":"' + tempGrade + '", "value":' + tempValue + '}';
        tempObj = JSON.parse(tempObjString);
        tempArray.push (tempObj);
    }
    
    customSystem = tempArray;
    
    if (customSystem.length == 0) {
        document.getElementById("system-scheme").innerHTML = "You should enter at least one grade in the custom system for us to build it. ";
    }
    else {
        populateTheGradingScheme(customSystem);
        showSemestersContainer();
    }
}

function populateTheGradingScheme (system) {
    // the initial sentence
    var content = " Grading Scheme is : "
    
    system.forEach (function(item) {
        content += item.grade + " = " + item.value +" || " ;
    });
    document.getElementById("system-scheme").innerHTML = content;

}

// -------------------- Options section functions -------------------- //


// -------------------- Semester section functions -------------------- //

function showSemestersContainer () {
    document.getElementById("semesters-container").style.display = "block";
    document.getElementById("cgpa-value").innerHTML = "Add your grades then click Calculate!";
}

function hideSemestersContainer () {
    document.getElementById("semesters-container").style.display = "none";
    
    // delete the div content, to be clean on next show time 
    document.getElementById("semesters-row").innerHTML = '';
    
    // clear variables;
    numberOfSemesters = 0;
    subjectsInSemester = [0];
}


function addSemester () {
    
    var div = "";
    
    numberOfSemesters += 1;
    
    
    // this if is assigning class to the semester row, later on the css it will be used to apply clearing so even if the height of the columns are different, adding new odd column will make it without floating and will start from the left of the screen (for example when 5 subjects in 1 semester and 1 subject in 2 semester, without this, 3 semester will be floating to the right of the first semester since there is an empty space due to the less height of the second semester)
    var typeOfSemester;
    if (numberOfSemesters % 2 == 0) {
        typeOfSemester = "even-semester";
    }
    else {
        typeOfSemester = "odd-semester";
    }

        
    div += '<div id="semester-' + numberOfSemesters + '-column" class="' + typeOfSemester + ' semester-column col-lg-6 col-md-6 col-sm-12 col-xs-12"><h3> Semester Number ' + numberOfSemesters + ' :</h3> <button type="button" value="' + numberOfSemesters + '" onclick="addSubject(this.value)" id="semester-' + numberOfSemesters + '-button-add" class="btn btn-info"> + </button> <button type="button" value="' + numberOfSemesters + '" onclick="deleteSubject(this.value)" id="semester-' + numberOfSemesters + '-button-delete" class="btn btn-danger"> - </button> <br> <br></div>';
    
    subjectsInSemester.push(0);
    
    var semestersDivId = "semesters-row";
    document.getElementById(semestersDivId).insertAdjacentHTML ('beforeend' , div);
}

function deleteSemester () {
    
    var semesterDivId = 'semester-' + numberOfSemesters + '-column';

    var element = document.getElementById(semesterDivId);
    element.parentNode.removeChild(element);

    subjectsInSemester.pop();
    numberOfSemesters -= 1;
    

}


function addSubject (semesterNumber) {
    
    ++subjectsInSemester [semesterNumber];
    var div = "";
    
    div +='<div id="semester-' + semesterNumber + '-' + subjectsInSemester [semesterNumber] + '" class="subject-details col-lg-12 col-md-12 col-sm-12 col-xs-12"> <input type="text" id="semester-' + semesterNumber + '-subject-' + subjectsInSemester[semesterNumber] + '" placeholder="subj ' + subjectsInSemester[semesterNumber] + '" class="field col-lg-3 col-md-3 col-sm-3 col-xs-3"> <select id="semester-' + semesterNumber + '-grade-' + subjectsInSemester[semesterNumber] + '" placeholder="grade" class="field col-lg-3 col-md-3 col-sm-3 col-xs-3 "></select><input type="number" id="semester-' + semesterNumber + '-value-' + subjectsInSemester[semesterNumber] + '" disabled="disabled" placeholder="value ' + subjectsInSemester[semesterNumber] + '" class="field col-lg-3 col-md-3 col-sm-3 col-xs-3">    <input type="number" id="semester-' + semesterNumber + '-credits-' + subjectsInSemester[semesterNumber] + '" onChange="validateCreditsField (this.value)" placeholder="Hours" step="1" max="8" min="1" class="field col-lg-3 col-md-3 col-sm-3 col-xs-3"></div>'
    
    var semesterDivId = "semester-" + semesterNumber + "-column";
    document.getElementById(semesterDivId).insertAdjacentHTML ('beforeend' , div);
    
    var selectElementId = "semester-" + semesterNumber + "-grade-" + subjectsInSemester [semesterNumber];
    var valueElementId = "semester-" + semesterNumber + "-value-" + subjectsInSemester [semesterNumber];
    populateList(selectElementId , valueElementId);

}

function deleteSubject (semesterNumber) {
    
    var subjectDivId = 'semester-' + semesterNumber + '-' + subjectsInSemester [semesterNumber];
    
    var element = document.getElementById(subjectDivId);
    element.parentNode.removeChild(element);

    subjectsInSemester [semesterNumber] -= 1;
}


// this will populate the select field with the system scheme, it is called when ever a select is created.
// listId will be select element id, the value id will be the value input field after the select (this is needed to identify it, as I'll be populating the value input field depending on the selected item from the drop down list)
function populateList (listId, valueId) {
    
    var tempSystem;
    switch (selectedSystem){
        case 0:
            tempSystem = oldSystem;
            break;
        case 1:
            tempSystem = newSystem;
            break;
        case 2:
            tempSystem = customSystem;
            break;
    }
    
    // for first item in the select list to be grade with no actual value
    // create element to append to the list later
    var element = document.createElement("option");
    element.textContent = " grade ";
    element.value = "";
    // append the temp element to the list
    document.getElementById(listId).appendChild(element);

        
    // go through all the system items and add to the dropdown list
    for(var i = 0; i < tempSystem.length; i++) {

        // create element to append to the list later
        var element = document.createElement("option");

        element.textContent = tempSystem [i].grade;
        element.value = tempSystem [i].value;
        
        // append the temp element to the list
        document.getElementById(listId).appendChild(element);
        
        // on change even so when a grade is selected, directly fill the value field (non editable field by the user)
        document.getElementById(listId).onchange = function() {
            document.getElementById(valueId).value = document.getElementById(listId).value;
        };
    }
}


function calculate () {
        
    // total numbers collected from all subjects
    var total = 0;
    // total credit hours of the program
    var hoursTotal=0;
    // cgpa calculated
    // cgpg = total / hoursTotal
    var cgpa=0;
    
    // value of specific subject
    var value=0;
    // credit hours of specific subject
    var credit=0;
    // total credits taken from a subject
    // subjectTotal = value * credit
    var subjectTotal
    
    // string to contain the id of the value element of a specific subject
    var subjectValueId;
    // string to contain the id of the credit hours of a specific subject
    var subjectCreditId;
    

    // i will be the semester number
    var semesterNo;
    for (semesterNo = 1 ; semesterNo <= numberOfSemesters ; ++semesterNo) {
        var numberOfSubjects = subjectsInSemester[semesterNo];
        var subjectNo;
        for (subjectNo = 1 ; subjectNo <= numberOfSubjects ; ++subjectNo) {
            
            subjectValueId = "semester-" + semesterNo + "-value-" + subjectNo;
            subjectCreditId = "semester-" + semesterNo + '-credits-' + subjectNo;

            value = document.getElementById(subjectValueId).value;
            credit = document.getElementById(subjectCreditId).value;
            
            // it is necessary to convert the values retreived into numbers
            credit = Number (credit);
            
            if (value != "" && Number.isInteger(credit) && credit > 0 && credit < 9) {
                subjectTotal = value * credit;
                
                hoursTotal += credit;
                total += subjectTotal;
            }
            else if (value == "") {
                alert("You didn't add a grade for subject No." + subjectNo + " in semester No. " + semesterNo + ". We just ignored that subject in calculation, if it was a mistake then please fix it and click Calculate again!");
            }
            else if ( ! Number.isInteger(credit) ) {
                alert ("You entered non-integer number in the credits field for subject No." + subjectNo + " in semester No. " + semesterNo + " , We just ignored that subject in calculation, if it was a mistake then please fix it and click Calculate again!");
            }
            else if (credit > 9 || credit < 1 ) {
                alert ("You entered a wrong value for subject No." + subjectNo + " in semester No. " + semesterNo + ". credit hours value must be between 1 and 8 , We just ignored that subject in calculation, if it was a mistake then please fix it and click Calculate again!");
            }


        }
    }
    
    cgpa = total / hoursTotal;
    cgpa = cgpa.toPrecision (5);
    document.getElementById("cgpa-value").innerHTML = "Your CGPA is :   " + cgpa;
    
    //if ( isNaN(cgpa) ){
    //    document.getElementById("cgpa-value").innerHTML = " There are some errors in your grade inputs, please fix and click Calculate again!";
    //    }
    //else {
    //    document.getElementById("cgpa-value").innerHTML = "Your CGPA is :   " + cgpa;
    //}

}

function validateCreditsField (credit) {
            

}

// -------------------- Semester section functions -------------------- //





/*
function createList () {
    
    var tempSystem;
    
    if (selectedSystem == 0) {
        tempSystem == oldSystem;
    }
    else if (selectedSystem == 1) {
        tempSystem == newSystem;
    }
    else if (selectedSystem == 2) {
        tempSystem == customSystem;
    }
    else {
        alert("Unknown error happened");
    }
    

    for(var i = 0; i < tempSystem.length; i++) {
        var option = tempSystem[i];
        var element = document.createElement("option");
        console.log(tempSystem [i].grade)

        element.textContent = tempSystem [i].grade;
        element.value = option;
        dropDownList.appendChild(el);
    }

}
*/
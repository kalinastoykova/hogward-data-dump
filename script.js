// https://petlatkea.dk/2021/hogwarts/students.json

"use strict"

const dataLink = "https://petlatkea.dk/2021/hogwarts/students.json"

const studentArr = [];
const Student = {
    firstName: "",
    lastName: "",
    middleName: "",
    nickname: "",
    imgFile: "",
    house: ""
}

readData();

function readData() {
    fetch(dataLink)
    .then(response => response.json())
    .then(cleanData)
}

function cleanData(students) {
    students.forEach(student => {
        let splitNames = student.fullname.trim().split(' ');
        
        //variables for all the names
        let fixedHouse = capitalizeName(student.house.trim());
        let fixedFirstName = capitalizeName(splitNames[0]);
        let fixedLastName = capitalizeName(splitNames[splitNames.length-1]);
        let fixedMiddleName = ""
        let fixedNickname = ""

        //for checking if there's a middle name
        if (splitNames.length > 2) {
            fixedMiddleName = capitalizeName(splitNames[splitNames.length-2]);
        }

        //for checking if the middle name is a nickname
        if (fixedMiddleName.charAt(0) == `"`) {
            fixedNickname = `"` + fixedMiddleName.charAt(1).toUpperCase() + fixedMiddleName.slice(2);
            fixedMiddleName = "";
        }


        //creates the new student object
        const studentObj = Object.create(Student);
        studentObj.firstName = fixedFirstName;
        studentObj.lastName = fixedLastName;
        studentObj.middleName = fixedMiddleName;
        studentObj.nickname = fixedNickname;
        studentObj.house = fixedHouse;

        studentArr.push(studentObj);
    });
    console.log(studentArr)
}

//capitalize the student names
function capitalizeName(name) {
    //so it runs with dear leanne :)
    if (name != null) {
        let capitalName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
        return capitalName  
    }
}

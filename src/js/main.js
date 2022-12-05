// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import getData from "./getData.js";

import { fetchStudents, addNewStudent, deleteStudent, getSingleStudent } from './data.js';
import renderAccordionItems from "./renderAccordionItems.js";
import renderStudent from "./renderStudentDetails.js";
/* -------------------------------------------------------------------------------  */



/* let elStudentDetailView = document.querySelectorAll(".student-detail-btn");

console.log(elStudentDetailView); */

//? Form for student information
let form = document.querySelector("#student-form"); 


//// fire rendering
//fetching data fom API
let dataSet = await fetchStudents();
let schoolMap = await getData(dataSet.students);
console.log(schoolMap);
renderAccordionItems(schoolMap);
let elStudentDetailView = document.querySelectorAll(".student-detail-btn");
renderStudent(elStudentDetailView);


//? --------TEST-SECTION---------



// form.addEventListener("input", (evt) => {

//   if (evt.target.value.trim().length > 0 || evt.target.checked) {
//     evt.target.classList.remove("is-invalid");
//     evt.target.classList.add("is-valid");
//   } else {
//     evt.target.classList.remove("is-valid");
//     evt.target.classList.add("is-invalid");

//   }
// })

form.addEventListener("submit", async (evt) => {

    console.log(form);

    let data = {
        address: {
        street: "",
        streetNum: undefined,
        postalCode: undefined,
        city: "",
        },
        name: "",
        classId: "",                               
    }
    
    let firstName = document.querySelector("#validationFirstName")
    let surName = document.querySelector("#validationLastName")
    data.name = `${firstName.value} ${surName.value}`;

    let id = document.querySelector("#validationServerClassname");
    data.classId = id.value;

    let streetName = document.querySelector("#validationServerStreetName");
    data.address.street = streetName.value;

    let streetNumber = document.querySelector("#validationServerStreetNumber");
    data.address.streetNum = streetNumber.value;

    let cityName = document.querySelector("#validationServerCity");
    data.address.city = cityName.value;

    let zipCode = document.querySelector("#validationServerZipCode");
    data.address.postalCode = zipCode.value;


    let schoolDataResponse = await addNewStudent(data);

    console.log("schoolDataResponse   ",schoolDataResponse);
    
    let schoolMap = await getData(schoolDataResponse);
    renderAccordionItems(schoolMap)





});

//? Klassennamen werden dem Formular hinzugefügt
document.querySelector("#add-new-student-btn").addEventListener("click", async () => {
    let classNames = Array.from(schoolMap.keys())
    let dataList = document.querySelector("#datalistOptions");
    classNames.forEach(className => {
        let option = document.createElement("option");
        option.value = className;
        dataList.appendChild(option);
    });
});










// ! TESTING ------------------


// let tableBody = document.querySelector(".table > tbody")
// tableBody.replaceChildren();


async function renderStudentList() {

    let studentResponse = await fetchStudents();
    console.log(studentResponse);

    let students = studentResponse.students;


    students.forEach(student => {
        let row = document.createElement("tr");

        //Namessplate erstellen und befüllen
        let nameCol = document.createElement("td");
        nameCol.textContent = student.name;

        let classIdCol = document.createElement("td");
        classIdCol.textContent = student.classId;

        let cityCol = document.createElement("td");
        cityCol.textContent = student.address.city;

        /* ----- Bedienknöpfe ----- */

        let editCol = document.createElement("td");
        let editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-secondary-outline", "btn-sm" );
        editBtn.textContent = "Edit"
        editCol.appendChild(editBtn);

        let deleteCol = document.createElement("td");
        let delBtn = document.createElement("button");
        delBtn.classList.add("btn", "btn-danger-outline", "btn-sm" );
        delBtn.textContent = "Delete"
        deleteCol.appendChild(delBtn);


        row.appendChild(nameCol);
        row.appendChild(classIdCol);
        row.appendChild(cityCol);
        row.appendChild(editCol);
        row.appendChild(deleteCol);

        tableBody.appendChild(row);

    })

}





// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import getData from "./getData.js";

import { fetchStudents, addNewStudent, deleteStudent, getSingleStudent, putStudent } from './data.js';
import renderAccordionItems from "./renderAccordionItems.js";
import { renderStudent, renderStudentDetails} from "./renderStudentDetails.js";
/* -------------------------------------------------------------------------------  */

const myModalAlternative = new bootstrap.Modal('#modal-formular')



/* let elStudentDetailView = document.querySelectorAll(".student-detail-btn");

console.log(elStudentDetailView); */

//? Form for student information
let form = document.querySelector("#student-form"); 



await renderAccordionItems();


//let elStudentDetailView = document.querySelectorAll(".student-detail-btn");
// renderStudent(allDetailBtn);


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

    let schoolDataResponse;
    let data = getStudentData(evt);

    if (form.dataset.purpose === "edit") {
        let studentId = form.dataset.studentId;
        schoolDataResponse = await putStudent(data, studentId);
        renderStudentDetails(studentId)
    } else {
        schoolDataResponse = await addNewStudent(data);
    }

    let schoolMap = await getData(schoolDataResponse);
    renderAccordionItems(schoolMap);
    myModalAlternative.hide();

});

function getStudentData(evt) {
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
    let studentName = `${firstName.value} ${surName.value}`;
    if (studentName.length > 2) {
        console.log(studentName);
        evt.target.classList.remove("is-invalid");
        evt.target.classList.add("is-valid");
        data.name = studentName;
    } else {
        evt.target.classList.remove("is-valid");
        evt.target.classList.add("is-invalid");
    }

    let id = document.querySelector("#validationServerClassname");
    let classId = id.value;
    if (classId.length > 2) {
        evt.target.classList.remove("is-invalid");
        evt.target.classList.add("is-valid");
        data.classId = classId;
    } else {
        evt.target.classList.remove("is-valid");
        evt.target.classList.add("is-invalid");
    }

    let streetName = document.querySelector("#validationServerStreetName");
    let street = streetName.value;
    if (classId.length > 2) {
        evt.target.classList.remove("is-invalid");
        evt.target.classList.add("is-valid");
        data.address.street = street;
    } else {
        evt.target.classList.remove("is-valid");
        evt.target.classList.add("is-invalid");
    }

    let streetNumber = document.querySelector("#validationServerStreetNumber");
    data.address.streetNum = streetNumber.value;

    let cityName = document.querySelector("#validationServerCity");
    data.address.city = cityName.value;

    let zipCode = document.querySelector("#validationServerZipCode");
    data.address.postalCode = zipCode.value;

    return data;
}












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





// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

import renderAccordionItems from './renderAccordionItems.js';

import { deleteStudent, getSingleStudent } from './data.js';

//?Studenten-Detailansicht
const offcanvasContainer = document.querySelector("#staticBackdrop");
const offcanvas = new bootstrap.Offcanvas(offcanvasContainer);

async function renderStudent(elStudentDetailBtn){
        elStudentDetailBtn.addEventListener("click", (evt) => {
            let studentId = evt.target.dataset.studentid;
            offcanvas.show()
            renderStudentDetails(studentId)
        });
} 

async function renderStudentDetails(evtID) {
    offcanvasContainer.replaceChildren();

    let student = await getSingleStudent(evtID);
    let studentAddress = student[0].address;

    let offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");
    
    let heading = document.createElement("h5");
    heading.classList.add("offcanvas-title");
    heading.id = "staticBackdropLabel";
    heading.textContent = `Student Details:`
    offcanvasHeader.appendChild(heading);

    let dismissBtn = document.createElement("button");
    dismissBtn.type = "button";
    dismissBtn.classList.add("btn-close");
    dismissBtn.setAttribute("data-bs-dismiss", "offcanvas");
    dismissBtn.setAttribute("aria-label", "Close");
    offcanvasHeader.appendChild(dismissBtn);

    offcanvasContainer.appendChild(offcanvasHeader);

    let offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body", "bg-secondary" , "position-relative", "m-3", "rounded");

    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-info", "my-3","float-end");
    editButton.type = "button";

    let editIcon = document.createElement("i");
    editIcon.classList.add("bi", "bi-pencil-square");
    editButton.setAttribute("data-bs-toggle","modal");
    editButton.setAttribute("data-bs-target", "#modal-formular");
    editButton.appendChild(editIcon)

    editButton.addEventListener("click",  () => {
        editStudent(student ,student[0]._id);
    });

    offcanvasBody.appendChild(editButton);

    let studentName = document.createElement("h5");
    studentName.classList.add("text-center", "my-4");
    studentName.textContent = `${student[0].name}`;

    offcanvasBody.appendChild(studentName)

    let studentId = document.createElement("h6");
    studentId.classList.add("mt-5")
    studentId.textContent = `Student-ID: ${student[0]._id}`;
    offcanvasBody.appendChild(studentId);

    let studentDetailList = document.createElement("ul");
    studentDetailList.classList.add("mt-5")
    let streetItem = document.createElement("li");
    streetItem.textContent = studentAddress.street+" "+studentAddress.streetNum;
    studentDetailList.appendChild(streetItem);

    let cityItem = document.createElement("li");
    cityItem.textContent = studentAddress.postalCode+" "+studentAddress.city;
    studentDetailList.appendChild(cityItem);
    offcanvasBody.appendChild(studentDetailList);

    let deleteBtnContainer = document.createElement("div");
    deleteBtnContainer.classList.add("d-flex", "justify-content-center", "m-5")

    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn-outline-danger", "btn");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async () => {
        delStudent(student[0]._id) 
    });

    deleteBtnContainer.appendChild(deleteButton);

    offcanvasContainer.appendChild(offcanvasBody);
    offcanvasContainer.appendChild(deleteBtnContainer)
}

async function delStudent(studentId) {
    await deleteStudent(studentId);
    await renderAccordionItems();
    setTimeout(() => {
        offcanvas.hide()
    }, 300)
}

async function editStudent(student){

    let modalHeading = document.querySelector(".modal-title");
    modalHeading.textContent = "Edit Student"

    let form = document.querySelector("#student-form");
    form.setAttribute("data-purpose", "edit");
    form.setAttribute("data-student-id", `${student[0]._id}`);

    let inputs = document.querySelectorAll("input")

    let studentDetails = student[0];
    let splitName = studentDetails.name.split(" ");
    let firstName = splitName[0];
    let surName = splitName[1];

    inputs.forEach(input => {
        let currentId = input.id

        switch (currentId) {
            case "validationFirstName":
                    input.value = firstName;
                break;
            case "validationLastName":
                    input.value = surName;
                break;
            case "validationServerClassname":
                    input.value = studentDetails.classId;
                break;
            case "validationServerStreetName":
                    input.value = studentDetails.address.street;
                break;
            case "validationServerStreetNumber":
                input.value = studentDetails.address.streetNum;
                break;
            case "validationServerCity":
                input.value = studentDetails.address.city;
                break;
            case "validationServerZipCode":
                input.value = studentDetails.address.postalCode;
                break;
            default:
                break;
        }
    });

}

export { renderStudent, renderStudentDetails };
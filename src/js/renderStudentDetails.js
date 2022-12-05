// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import getData from './getData.js';

import renderAccordionItems from './renderAccordionItems.js';

import { deleteStudent, getSingleStudent } from './data.js';



//?Studenten-Detailansicht
const offcanvasContainer = document.querySelector("#staticBackdrop");
const offcanvas = new bootstrap.Offcanvas(offcanvasContainer);


async function renderStudent(elStudentDetailView){
    //? Btn on every Student - showing details of student

    elStudentDetailView.forEach(async student => {

        student.addEventListener("click", (evt) => {
            let studentId = evt.currentTarget.dataset.studentid;
        
            offcanvas.show()
            renderStudentDetails(studentId, offcanvasContainer)


        });
    });
} 

async function renderStudentDetails(evtID) {

    // const offcanvasContainer = document.querySelector("#staticBackdrop");
    // let offcanvas = new bootstrap.Offcanvas(offcanvasContainer);
    // offcanvasContainer.replaceChildren();

    

    let student = await getSingleStudent(evtID);

    console.log(student);
   
    let studentAddress = student[0].address;

    let offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");
    
    let heading = document.createElement("h5");
    heading.classList.add("offcanvas-title");
    heading.id = "staticBackdropLabel";
    heading.textContent = `Studentdetails:`
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

    let studentName = document.createElement("h5");
    studentName.classList.add("text-center", "my-3");
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

    deleteButton.addEventListener("click", async (evt) => {

        let schoolDataResponse = await deleteStudent(student[0]._id);

        console.log("imdelete   ",schoolDataResponse);

        let schoolMap = await getData(schoolDataResponse);

        console.log("imdelete   ",schoolMap);

        renderStudentDetails(evtID)

        offcanvas.hide()

        renderAccordionItems(schoolMap);



        // setTimeout(() => {

        //     offcanvas.hide()

        // }, 500)


        
    });

    deleteBtnContainer.appendChild(deleteButton);

    offcanvasContainer.appendChild(offcanvasBody);
    offcanvasContainer.appendChild(deleteBtnContainer)
}

function delStudent(studentId) {
    
}

export default renderStudent;
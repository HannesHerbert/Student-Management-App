// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our custom JS
import { fetchStudents, addNewStudent, deleteStudent } from './data.js';
/* -------------------------------------------------------------------------------  */
//const elClassSelectionInput = document.querySelector("#datalistOptions");

//?Studenten-Detailansicht
const offcanvasContainer = document.querySelector("#staticBackdrop");



//? AccordionContainer
const elAccordion = document.querySelector("#accordionExample");

await getData();

//? --------TEST-SECTION---------

let form = document.querySelector("form");

form.addEventListener("input", (evt) => {
  if (evt.target.value.trim().length > 0 || evt.target.checked) {
    evt.target.classList.remove("is-invalid")
    evt.target.classList.add("is-valid");
  } else {
    evt.target.classList.remove("is-valid");
    evt.target.classList.add("is-invalid");

  }
})

form.addEventListener("submit", async (evt) => {


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

    console.log(data);

    await addNewStudent(data);


    await getData();



    if (!form.checkValidity()) {
        console.log("nicht valid");
        evt.preventDefault()
        evt.stopPropagation()
      }
      form.classList.add('was-validated')


}, false);






//let testAdd = 

//let testDelete = await deleteStudent("638a0f3e14ad8fee27c12ab9")


//! ---------Approved------------

async function getData() {
    //fetching data fom API
    let dataSet = await fetchStudents();
    //creating a new Map
    let dataMap = new Map();
    //Iterating over all Students
    dataSet.students.forEach(async student => {
        //Extracting class name of every student 
        let className = student.classId;
        //
        if (dataMap.has(className)) {
            let theClass = dataMap.get(className);
            theClass.push(student);
            dataMap.set(className, theClass);
        } else {
            let classArray = [student];
            dataMap.set(className, classArray);
        }
    });
    let map = new Map([...dataMap].sort());
    renderAccordionItems(map);
    return map;
};


//?Add New Student Button
document.querySelector("#add-new-student-btn").addEventListener("click", async (evt) => {
    let map = await getData();
    let classNames = Array.from(map.keys())
    let dataList = document.querySelector("#datalistOptions");
    classNames.forEach(className => {
        let option = document.createElement("option");
        option.value = className;

        dataList.appendChild(option);
    });
});


function renderAccordionItems(map) {
    let index = 1;

    for (const [key, value] of map) {

        let accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
    
        let accordionHeading = document.createElement("h2");
        accordionHeading.classList.add("accordion-header");
        accordionHeading.id = `heading${index}`;
    
        let accordionBtn = document.createElement("button");
        accordionBtn.classList.add("accordion-button");
        accordionBtn.type = "button";
        accordionBtn.setAttribute("data-bs-toggle","collapse");
        accordionBtn.setAttribute("data-bs-target", `#collapse${index}`);
        accordionBtn.setAttribute("aria-expanded", "true");
        accordionBtn.setAttribute("aria-controls", `collapse${index}`);
        accordionBtn.textContent = key;

        let classSizeBadge = document.createElement("span");
        // classSizeBadge.classList.add("badge", "bg-primary", "rounded-pill", "position-absolute", "top-50", "start-60", "translate-middle");
        classSizeBadge.classList.add("badge", "text-bg-secondary", "float-end")
        classSizeBadge.textContent = value.length;
        accordionBtn.appendChild(classSizeBadge);
    
        accordionHeading.appendChild(accordionBtn);
        accordionItem.appendChild(accordionHeading);
    
        let accordionShowContainer = document.createElement("div");
        accordionShowContainer.id = `collapse${index}`;
        accordionShowContainer.classList.add("accordion-collapse" ,"collapse");
        accordionShowContainer.setAttribute("aria-labelledby", `heading${index}`);
        accordionShowContainer.setAttribute("data-bs-parent", "#accordionExample");
    
        let accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        let orderedList = document.createElement("ul");
        orderedList.classList.add("list-group");

        value.forEach((student, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            let btn = document.createElement("button")
            btn.classList.add("btn", "btn-light", "text-start", "w-100", "student-detail-btn");
            btn.type = "button";
            btn.setAttribute("data-bs-toggle","offcanvas");
            btn.setAttribute("data-bs-target", "#staticBackdrop");
            btn.setAttribute("aria-controls", "staticBackdrop");
            btn.textContent = `${index+1}. ${student.name}`;
            btn.id = student._id;

            listItem.appendChild(btn)

            orderedList.appendChild(listItem);
        });

        accordionBody.appendChild(orderedList);
        accordionShowContainer.appendChild(accordionBody);
        accordionItem.appendChild(accordionShowContainer);

        elAccordion.appendChild(accordionItem);

        index++;
    }

}



const elStudentDetailView = document.querySelectorAll(".student-detail-btn");
elStudentDetailView.forEach(student => {
    student.addEventListener("click", renderStudentDetails);
});

function renderStudentDetails(evt) {


    offcanvasContainer.replaceChildren()

    console.log(evt.target.id);

    console.log(evt.target.innerHTML);


    let offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");

    let heading = document.createElement("h5");
    heading.classList.add("offcanvas-title");
    heading.id = "staticBackdropLabel";
    heading.textContent = `Student: ${evt.target.innerHTML}`
    offcanvasHeader.appendChild(heading);

    let dismissBtn = document.createElement("button");
    dismissBtn.type = "button";
    dismissBtn.classList.add("btn-close");
    dismissBtn.setAttribute("data-bs-dismiss", "offcanvas");
    dismissBtn.setAttribute("aria-label", "Close");
    offcanvasHeader.appendChild(dismissBtn);

    offcanvasContainer.appendChild(offcanvasHeader);

    let offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body");

    offcanvasContainer.appendChild(offcanvasBody);
}









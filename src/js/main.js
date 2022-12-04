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




const elAccordion = document.querySelector("#accordionExample");



//? --------TEST-SECTION---------
let dataSet1 = await fetchStudents();
console.log(dataSet1);







let data = {
    address: {
       street: "Übelst-Str",
       streetNum: 3,
       postalCode: 94315,
       city: "Hoierswerda",
    },
    name: "Heribert Pappenheimer",
    classId: "CS-2022",                               
 }

//let testAdd = await addNewStudent(data);

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
    return dataMap
}

let map = await getData();
console.log(map);

function renderClassNames() {
    //Extrahiere KlassenStrings
    let classNames = Array.from(map.keys());
    classNames.forEach(className => {
        let classOption = document.createElement("option");
        classOption.value = className;
        elClassSelectionInput.appendChild(classOption)
    });
}
//renderClassNames();


function renderAccordionItems() {
    // elAccordion.replaceChildren();
    /* 
        <div class="accordion-item"> ok
          <h2 class="accordion-header" id="headingOne"> ok
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
              plugin
              adds the appropriate classes that we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom
              CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the
              <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
    */
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

        //let classSizeBadge = document.createElement("span");
        //classSizeBadge.classList.add("badge", "bg-primary", "rounded-pill", "position-absolute", "top-50", "start-60", "translate-middle");
        //classSizeBadge.classList.add("badge", "text-bg-secondary", "float-end")
        // classSizeBadge.textContent = value.length;
        // accordionBtn.appendChild(classSizeBadge);
    
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


renderAccordionItems()

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









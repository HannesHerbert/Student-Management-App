// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our custom JS
import { fetchStudents, addNewStudent, deleteStudent } from './data.js';
/* -------------------------------------------------------------------------------  */
//const elClassSelectionInput = document.querySelector("#datalistOptions");


const elAccordion = document.querySelector("#accordionExample");



//? --------TEST-SECTION---------
let dataSet1 = await fetchStudents();
console.log(dataSet1);

// Ansichtauswahl mit nur einem Selector
let inputGroup = document.querySelector("#view-selection");
inputGroup.addEventListener("click", (evt) => {
    console.log(evt.target, evt.target.checked);
})





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
    
        accordionHeading.appendChild(accordionBtn);
        accordionItem.appendChild(accordionHeading);
    
        let accordionShowContainer = document.createElement("div");
        accordionShowContainer.id = `collapse${index}`;
        accordionShowContainer.classList.add("accordion-collapse" ,"collapse");
        accordionShowContainer.setAttribute("aria-labelledby", `heading${index}`);
        accordionShowContainer.setAttribute("data-bs-parent", "#accordionExample");
    
        let accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");
        accordionBody.textContent = `Number of Students: ${value.length}`;
    
        accordionShowContainer.appendChild(accordionBody);
        accordionItem.appendChild(accordionShowContainer);

        elAccordion.appendChild(accordionItem);

        index++;
    }

}


renderAccordionItems()









// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our custom JS
import { fetchStudents, addNewStudent, deleteStudent } from './data.js';
/* -------------------------------------------------------------------------------  */
const elClassSelectionInput = document.querySelector("#datalistOptions");
const display = document.querySelector("#display");
const inputGroup = document.querySelector("#view-selection");
const paginationArea = document.querySelector("#pagination-area");
const maxViewItems = 10;

let currStartItemNum = 1;




//? --------Initialisierung---------
let dataSet = await fetchStudents();
console.log(dataSet);

renderClassNameOptions();

let sortedStudents = sortStudents(dataSet);

renderAccordion(sortedStudents, 1, 10)




//---------------------Click-Handler-------------------------

//Studenten-/Klassenansicht
inputGroup.addEventListener("click", async (evt) => {
    console.log(evt.target, evt.target.checked);

    if (evt.target.id === 'radio-studentview-input') {
        console.log('studs');

        let dataSet = await fetchStudents();
        sortedStudents = sortStudents(dataSet);

        renderAccordion(sortedStudents, 1, 10);

        renderPagination(sortedStudents)

    }

    if (evt.target.id === 'radio-classview-input') {
        console.log('classes');
    }
});

//Pagination
/* function  */


//! ---------Approved------------

async function getClassesMap() {
    //fetching data fom API
    let dataSet = await fetchStudents();
    //creating a new Map
    let dataMap = new Map();
    //Iterating over all Students
    dataSet.students.forEach(student => {
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


async function renderClassNameOptions() {

    let classesMap = await getClassesMap();
    console.log(classesMap);

    //Extrahiere KlassenStrings
    let classNames = Array.from(classesMap.keys());

    classNames.forEach(className => {
        let classOption = document.createElement("option");
        classOption.value = className;
        elClassSelectionInput.appendChild(classOption)
    });
}




/* 
function renderAccordionItems() {
    
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
        accordionBtn.setAttribute("data-bs-toggle", "collapse");
        accordionBtn.setAttribute("data-bs-target", `#collapse${index}`);
        accordionBtn.setAttribute("aria-expanded", "true");
        accordionBtn.setAttribute("aria-controls", `collapse${index}`);
        accordionBtn.textContent = key;

        accordionHeading.appendChild(accordionBtn);
        accordionItem.appendChild(accordionHeading);

        let accordionShowContainer = document.createElement("div");
        accordionShowContainer.id = `collapse${index}`;
        accordionShowContainer.classList.add("accordion-collapse", "collapse");
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


renderAccordionItems() */


function renderAccordion(array, start, end) {

    display.replaceChildren();

    let heading = document.createElement('h2');
    heading.textContent = 'Students:';
    display.appendChild(heading);

    let accordionContainer = document.createElement('div');
    accordionContainer.classList.add('d-flex')
    display.appendChild(accordionContainer);

    let accordionWrapper = document.createElement('div');
    accordionWrapper.classList.add('w-50', 'accordion');
    accordionWrapper.id = 'accordionExample';
    accordionContainer.appendChild(accordionWrapper);

    for (let index = start - 1; index < end; index++) {

        let accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        accordionWrapper.appendChild(accordionItem);

        let accordionHeading = document.createElement("h2");
        accordionHeading.classList.add("accordion-header");
        accordionHeading.id = `heading${index}`;
        accordionItem.appendChild(accordionHeading);

        let accordionBtn = document.createElement("button");
        accordionBtn.classList.add("accordion-button", "collapsed");
        accordionBtn.type = "button";
        accordionBtn.setAttribute("data-bs-toggle", "collapse");
        accordionBtn.setAttribute("data-bs-target", `#collapse${index}`);
        accordionBtn.setAttribute("aria-expanded", "true");
        accordionBtn.setAttribute("aria-controls", `collapse${index}`);
        accordionBtn.textContent = array[index].name.split(' ')[1] + ', ' + array[index].name.split(' ')[0];
        accordionHeading.appendChild(accordionBtn);

        let accordionShowContainer = document.createElement("div");
        accordionShowContainer.id = `collapse${index}`;
        accordionShowContainer.classList.add("accordion-collapse", "collapse");
        accordionShowContainer.setAttribute("aria-labelledby", `heading${index}`);
        accordionShowContainer.setAttribute("data-bs-parent", "#accordionExample");
        accordionItem.appendChild(accordionShowContainer);

        let accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");
        accordionShowContainer.appendChild(accordionBody);

        let table = document.createElement('table');
        table.classList.add('table', 'table-striped');
        accordionBody.appendChild(table);

        let tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        let idRow = document.createElement('tr');
        tableBody.appendChild(idRow);

        let idHead = document.createElement('th');
        idHead.textContent = 'Stud.-ID:'
        idRow.appendChild(idHead);

        let idCell = document.createElement('td');
        idCell.textContent = array[index]._id;
        idRow.appendChild(idCell);

        let classRow = document.createElement('tr');
        tableBody.appendChild(classRow);

        let classHead = document.createElement('th');
        classHead.textContent = 'Class:'
        classRow.appendChild(classHead);

        let classCell = document.createElement('td');
        classCell.textContent = array[index].classId;
        classRow.appendChild(classCell);

        let addressRow = document.createElement('tr');
        tableBody.appendChild(addressRow);

        let addressHead = document.createElement('th');
        addressHead.textContent = 'Address:'
        addressRow.appendChild(addressHead);

        let addressCell = document.createElement('td');
        let addressString = array[index].address.street + ' ' +
            array[index].address.streetNum + ', ' +
            array[index].address.postalCode + ' ' +
            array[index].address.city;
        addressCell.textContent = addressString;
        addressRow.appendChild(addressCell);

    }

};


//Erzeuge dynamische Seitennavigation
function renderPagination(array) {

    paginationArea.replaceChildren();

    let uList = document.createElement('ul');
    uList.classList.add('pagination');
    paginationArea.appendChild(uList);

    let leftArrowLI = document.createElement('li');
    leftArrowLI.classList.add('pageItem', 'disabled');
    uList.appendChild(leftArrowLI);

    let leftArrowAnchor = document.createElement('a');
    leftArrowAnchor.classList.add('page-link');
    leftArrowAnchor.setAttribute('aria-label', 'Previous');
    leftArrowLI.appendChild(leftArrowAnchor);

    let leftArrowIcon = document.createElement('span');
    leftArrowIcon.setAttribute('aria-hidden', 'true');
    leftArrowIcon.innerHTML = '&laquo';
    leftArrowAnchor.appendChild(leftArrowIcon);

    let pagesCount = Math.ceil(array.length / maxViewItems);
    console.log(array.length, pagesCount);

    for (let i = 0; i < pagesCount; i++) {

        let pageLI = document.createElement('li');
        pageLI.classList.add('page-item', 'page-number');
        uList.appendChild(pageLI);

        let pageBtn = document.createElement('button');
        pageBtn.classList.add('page-link');
        if (i != pagesCount - 1) {
            pageBtn.addEventListener('click', (evt) => {renderAccordion(sortedStudents, 1 + (i * 10), (i * 10) + 10)});
        }
        else {pageBtn.addEventListener('click', (evt) => {renderAccordion(sortedStudents, 1 + (i * 10), array.length)});}
        pageBtn.textContent = i + 1;
        pageLI.appendChild(pageBtn);
    };

    let rightArrowLI = document.createElement('li');
    rightArrowLI.classList.add('pageItem');
    uList.appendChild(rightArrowLI);

    let rightArrowAnchor = document.createElement('a');
    rightArrowAnchor.classList.add('page-link');
    rightArrowAnchor.setAttribute('aria-label', 'Next');
    rightArrowLI.appendChild(rightArrowAnchor);

    let rightArrowIcon = document.createElement('span');
    rightArrowIcon.setAttribute('aria-hidden', 'true');
    rightArrowIcon.innerHTML = '&raquo';
    rightArrowAnchor.appendChild(rightArrowIcon);


}


//Sortiere alle Studenten alphabetisch nach Nachnamen
function sortStudents(array) {

    let sortedStudents = dataSet.students.sort((a, b) => {
        if (a.name.split(' ')[1] < b.name.split(' ')[1]) { return -1 }
        if (a.name.split(' ')[1] > b.name.split(' ')[1]) { return 1 }
        return 0
    });

    return sortedStudents;
}


function getPageNumEls() {
    pageNumEls = document.querySelectorAll('.page-number');
    return pageNumEls;
}





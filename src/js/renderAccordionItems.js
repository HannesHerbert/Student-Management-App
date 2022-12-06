//? AccordionContainer
const elAccordion = document.querySelector("#accordionExample");

import { fetchStudents } from './data.js';
import getData from "./getData.js";
import { renderStudent } from './renderStudentDetails.js';


async function renderAccordionItems() {

    let dataSet = await fetchStudents();
    let schoolMap = await getData(dataSet.students);

    //? Klassennamen werden dem Formular hinzugefügt - weil hier die Map geladen wird
    document.querySelector("#add-new-student-btn").addEventListener("click", async () => {
    let classNames = Array.from(schoolMap.keys())
    let dataList = document.querySelector("#datalistOptions");
    classNames.forEach(className => {
        let option = document.createElement("option");
        option.value = className;
        dataList.appendChild(option);
        });
    });

    elAccordion.replaceChildren();
    let index = 1;

    for (const [key, value] of schoolMap) {

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
        classSizeBadge.classList.add("badge", "text-bg-secondary", "translate-middle")
        classSizeBadge.id = "class-size-badge";
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

        let unorderedList = document.createElement("ul");
        unorderedList.classList.add("list-group");

        value.forEach((student, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            let btn = document.createElement("button");
            btn.classList.add("btn", "btn-light", "text-start", "w-100", "student-detail-btn");
            btn.type = "button";
            btn.setAttribute("data-bs-toggle","offcanvas");
            btn.setAttribute("data-bs-target", "#staticBackdrop");
            btn.setAttribute("aria-controls", "staticBackdrop");
            btn.setAttribute("data-studentid", `${student._id}`);
            btn.textContent = `${index+1}. ${student.name}`;

            renderStudent(btn);

            listItem.appendChild(btn);
            unorderedList.appendChild(listItem);
        });

        accordionBody.appendChild(unorderedList);
        accordionShowContainer.appendChild(accordionBody);
        accordionItem.appendChild(accordionShowContainer);

        elAccordion.appendChild(accordionItem);

        index++;
    }
}

export default renderAccordionItems;
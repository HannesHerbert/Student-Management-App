//? AccordionContainer
const elAccordion = document.querySelector("#accordionExample");

function renderAccordionItems(map) {
    elAccordion.replaceChildren();
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

        let orderedList = document.createElement("ul");
        orderedList.classList.add("list-group");

        value.forEach((student, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");

            let btn = document.createElement("button");
            btn.classList.add("btn", "btn-light", "text-start", "w-100", "student-detail-btn");
            btn.type = "button";
            btn.setAttribute("data-bs-toggle","offcanvas");
            btn.setAttribute("data-bs-target", "#staticBackdrop");
            btn.setAttribute("aria-controls", "staticBackdrop");
            btn.setAttribute("data-studentId", `${student._id}`);

            btn.textContent = `${index+1}. ${student.name}`;

            listItem.appendChild(btn);

            orderedList.appendChild(listItem);
        });

        accordionBody.appendChild(orderedList);
        accordionShowContainer.appendChild(accordionBody);
        accordionItem.appendChild(accordionShowContainer);

        elAccordion.appendChild(accordionItem);

        index++;
    }

}

export default renderAccordionItems;
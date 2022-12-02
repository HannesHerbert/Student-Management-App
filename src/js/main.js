// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import { fetchStudents, addNewStudent, deleteStudent } from './data.js';
/* -------------------------------------------------------------------------------  */

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

async function renderMainPage(amountOfShownEntries, currentPage) {
    let skip = 0;

    skip = amountOfShownEntries * currentPage;


    if (currentPage > 1) {
    }

    console.log(skip);

    // limit, skip, classId
    let dataSet = await fetchStudents(amountOfShownEntries, skip, "");

    // console.log(dataSet);
    
}

// renderMainPage(5, 1)





function sortArrayByAlphabet(unsortedArray) {
    
}








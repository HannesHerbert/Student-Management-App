// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import { fetchStudents } from './data.js';
/* -------------------------------------------------------------------------------  */
let classArray = [];


let students = await fetchStudents("");

console.log(students);

students.students.forEach(async element => {
    console.log(element.classId);
    if (! classArray.includes(element.classId)) {
        
    }
});

console.log(students);

console.log('Hallo Martin');






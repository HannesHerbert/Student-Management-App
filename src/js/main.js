// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import our custom JS
import { fetchStudents } from './data.js';
/* -------------------------------------------------------------------------------  */

async function getData() {
 let dataSet = await fetchStudents();

    let dataMap = new Map();

    dataSet.students.forEach(async student => {
        let className = student.classId;
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



console.log( );







const API_BASE_URL = 'https://test.100best.guide/locations/dci-students';
const API_STUDENT_ENDPOINT = 'student';

// Bsp.: https://test.100best.guide/locations/dci-students/student?skip=10&limit=20
async function fetchStudents(limit = "", skip = "", classId ="") {

    let url = `${API_BASE_URL}/${API_STUDENT_ENDPOINT}/?limit=${limit}&skip=${skip}&classId=${classId}`

    return performFetch(url, `GET`, null)
}


async function addNewStudent(newStudent) {
    // Bilde Options-Objekt fuer fetch
    let options = {
        // HTTP Methode
        method: 'POST',
        headers: {
            // Angabe der Form des Bodys (JSON)
            'Content-Type': 'application/json'
        },
        // Der gesendete Body (auch Payload genannt)
        body: JSON.stringify(newStudent)
    };

    let res = await fetch(`https://test.100best.guide/locations/dci-students/student`, options);
    let body = await res.json();


    // Wenn POST-Antwort Statuscode 2XX hat
    if (res.ok) {
        // Loese den Promise positiv auf und gebe die Payload vom Server zurueck
        console.log();
        return Promise.resolve(body);
    
    } else if (res.status === 409) {
        console.log("student bereits vorhanden");
    } else {

        return Promise.reject('fehler');
    }

}

async function deleteStudent(studentId) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let response = await fetch(`https://test.100best.guide/locations/dci-students/student/${studentId}`, options);
    let body = await response.json();

    if (response.status === 200) {
        console.log("deleted Student");
        return Promise.resolve(body);
    } else {
        console.log("not deleted, error");
        return Promise.reject(body);
    }

}

async function getSingleStudent(id) {
    let res = await fetch(`https://test.100best.guide/locations/dci-students/student/${id}`);
    let body = await res.json();

    console.log(res.status);

    // Wenn POST-Antwort Statuscode 2XX hat
    if (res.ok) {
        // Loese den Promise positiv auf und gebe die Payload vom Server zurueck
        return Promise.resolve(body);
    
    } else if (res.status === 409) {
        console.log("student bereits vorhanden");
    } else {

        return Promise.reject('fehler');
    }

    return body;
}

async function performFetch(url, option) {

    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    let response = await fetch(url, options);
    let body = response.json();

    if (response.status === 500) {
        console.log("Internal Server Error - Check URL");
        return Promise.reject(body);
    }

    if (response.ok) {
        return Promise.resolve(body);
    }

    return Promise.reject(body);
}

async function putStudent(data, studentId) {

    console.log(data);



    let options = {
        // HTTP Methode
        method: 'PUT',
        headers: {
            // Angabe der Form des Bodys (JSON)
            'Content-Type': 'application/json'
        },
        // Der gesendete Body (auch Payload genannt)
        body: JSON.stringify(data)
    };

    let res = await fetch(`https://test.100best.guide/locations/dci-students/student/${studentId}`, options);
    let body = await res.json();


    // Wenn POST-Antwort Statuscode 2XX hat
    if (res.ok) {
        // Loese den Promise positiv auf und gebe die Payload vom Server zurueck
        return Promise.resolve(body);
    } else {

        return Promise.reject('fehler');
    }


}

export { fetchStudents, addNewStudent, deleteStudent, getSingleStudent, putStudent };
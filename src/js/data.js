const API_BASE_URL = 'https://test.100best.guide/locations/dci-students';
const API_STUDENT_ENDPOINT = 'student';

// Bsp.: https://test.100best.guide/locations/dci-students/student?skip=10&limit=20
async function fetchStudents(limit, skip, classId) {

    let reqUrl = `https://test.100best.guide/locations/dci-students/student?`;

    let res = await fetch(reqUrl);

    let body = await res.json();

    if (res.ok) {

        return Promise.resolve(body);
    
    } else {

        return Promise.reject(body);
    }
   
}

export { fetchStudents };
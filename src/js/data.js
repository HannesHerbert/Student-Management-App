const API_BASE_URL = 'https://test.100best.guide/locations/dci-students';
const API_STUDENT_ENDPOINT = 'student';

// Bsp.: https://test.100best.guide/locations/dci-students/student?skip=10&limit=20
async function fetchStudents(limit, skip, classId) {

    let response;
    let data;

    if(limit === undefined) limit = "";
    if(skip === undefined) skip = "";
    if(classId === undefined) classId = "";


    response = await fetch(`https://test.100best.guide/locations/dci-students/student?limit=${limit}&skip=${skip}&classId=${classId}`);
    data = response.json();


    if (response.ok) {

        return Promise.resolve(data);
    
    } else {

        return Promise.reject(data);
    }
   
}

export { fetchStudents };
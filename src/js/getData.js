
async function getData(dataSet) {

    //creating a new Map
    let dataMap = new Map();
    //Iterating over all Students
    dataSet.forEach(student => {
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
    let map = new Map([...dataMap].sort());
    return map;
};

export default getData;
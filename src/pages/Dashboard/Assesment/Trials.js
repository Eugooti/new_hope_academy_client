const assessment = [
    {name: "Eugene", Math: 80, Kis: 80, Eng: 80, Sci: 50},
    {name: "Kev", Math: 80, Kis: 70, Eng: 40, Sci: 50},
    {name: "Joy", Math: 80, Kis: 70, Eng: 88, Sci: 50},
    {name: "June", Math: 80, Kis: 70, Eng: 80, Sci: 50},
    {name: "Tom", Math: 85, Kis: 71, Eng: 82, Sci: 50},
    {name: "Tim", Math: 80, Kis: 70, Eng: 84, Sci: 50},
    {name: "Ken", Math: 82, Kis: 73, Eng: 80, Sci: 50},
    {name: "Hope", Math: 80, Kis: 70, Eng: 85, Sci: 50},
    {name: "John", Math: 80, Kis: 77, Eng: 80, Sci: 50},
    {name: "Paul", Math: 82, Kis: 70, Eng: 80, Sci: 50},
    {name: "Shaz", Math: 80, Kis: 90, Eng: 81, Sci: 70},
    {name: "Purity", Math: 87, Kis: 70, Eng: 70, Sci: 50},
];

// Step 1: Calculate total scores
const studentsWithTotals = assessment.map(student => ({
    ...student,
    total: student.Math + student.Kis + student.Eng + student.Sci
}));

// Step 2: Sort the array by total score in descending order
studentsWithTotals.sort((a, b) => b.total - a.total);

// Step 3: Assign positions
let position = 1;
let previousTotal = null;
let rank = 1;

studentsWithTotals.forEach((student) => {
    if (student.total !== previousTotal) {
        rank = position;
    }
    student.position = rank;
    previousTotal = student.total;
    position++;
});

console.log(studentsWithTotals);


const total = assessment.reduce((add,item)=>add+item.total,0)
const average = total/assessment.length
console.log(total)
console.log(average)
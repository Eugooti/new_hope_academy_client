export const transformOutcome = (outcome) => {
    // Create a map to aggregate scores by learner
    const learnerMap = {};

    // Iterate through each subject in the outcome array
    outcome?.forEach((subjectData) => {
        const subject = subjectData.subject; // e.g., "Mathematics"
        subjectData.learners.forEach((learner) => {
            const { name, admNo, marks } = learner;

            // If the learner is not already in the map, initialize their record
            if (!learnerMap[admNo]) {
                learnerMap[admNo] = { name, admNo };
            }

            // Add the subject score to the learner's record
            learnerMap[admNo][subject] = marks;
        });
    });

    // Convert the map to an array of learners
    return Object.values(learnerMap);
};

export const calculateSubjectAverages = (learners, subjects) => {
    const outcome = [];

    subjects?.forEach((subject) => {
        const subjectData = {
            subject, // e.g., "Mathematics"
            total: 0, // Placeholder for total marks
            meanscore: 0, // Placeholder for mean score
            learners: [], // Array to store learners' data for this subject
        };

        let totalMarks = 0;

        learners?.forEach((learner) => {
            if (learner[subject] !== undefined) {
                const marks = learner[subject];
                subjectData.learners.push({
                    name: learner.name,
                    admNo: learner.admNo,
                    marks,
                });

                totalMarks += marks; // Add marks to the total
            }
        });

        // Calculate total and mean score
        subjectData.total = totalMarks;
        subjectData.meanscore =
            subjectData.learners.length > 0
                ? parseFloat((totalMarks / subjectData.learners.length).toFixed(2))
                : 0;

        outcome.push(subjectData);
    });

    return outcome;
};

// Example usage
const learners = [
    { name: "John Smith", admissionNumber: "UP12345", Mathematics: 80, English: 75 },
    { name: "Jane Doe", admissionNumber: "UP67890", Mathematics: 70, English: 65 },
    { name: "Jane Doe", admissionNumber: "UP67890", Mathematics: 70, English: 65 },
];

const subjects = ["Mathematics", "English"]; // List of subjects
const reformattedOutcome = calculateSubjectAverages(learners, subjects);

console.log(reformattedOutcome);


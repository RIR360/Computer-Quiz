const report = (answers, database) => {
    
    const result = [];

    for (index in answers) {
        result.push(answers[index]);
    }

    return result;
};

module.exports = report;
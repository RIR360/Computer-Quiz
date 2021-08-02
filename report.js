const report = (answers, database) => {

     /**
      * Response Prototype
      * result = {
      *     score: 50,
      *     correct: 5,
      *     wrong: 5,
      *     inputs: ['opt_a', 'opt_b', 'opt_c']
      * }
      */

    let 
        i = 0,
        correct = 0, 
        wrong = 0,
        score;

    for (index in answers)
    {
        let a = answers[index];
        let b = database[i]['ans'];
    
        if (a == b) {
            correct++;
        } else {
            wrong++;
        }
        i++;
    }
    score = Math.round((correct / (i + 1)) * 100);

    const result = {
        score: score,
        correct: correct,
        wrong: wrong
    };

    return result;
};

module.exports = report;
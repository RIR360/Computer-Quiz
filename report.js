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
     
     const user_inputs = [];
     let 
        i = 0,
        correct = 0,
        wrong = 0,
        score;

    let len = database.length;
    for (; i < len; i++) {
        
        let a = answers[`q${i}`];
        let b = database[i]['ans'];
    
        if (!a) {
            wrong++;
        } else {
            user_inputs.push(a);

            if (a == b) {
                correct++;
            }
            else {
                wrong++;
            }
        }
    }
    score = Math.round((correct / i) * 100);

    const result = {
        score: score,
        correct: correct,
        wrong: wrong,
        inputs: user_inputs
    };
    return result;
};

module.exports = report;
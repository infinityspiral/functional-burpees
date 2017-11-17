const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18';
fetch(BASE_URL)
.catch(e => console.log(e))
.then(data => data.json())
.then(data => data.results)
.then(results => {
  console.log('TASK: 1');
  const cleanQuotes = results.map(result => {
    const matcher = new RegExp(/&quot;, '\"'/g);
    const cleanedQuestion = result.question.replace(matcher, '"');
    const newResult = {...result};
    newResult.question = cleanedQuestion;
    return {
      ...newResult
    }
  })
  console.log(cleanQuotes);
  console.log('TASK: 2');
  const easyQuestions = cleanQuotes.filter(result => result.difficulty === 'easy');
  console.log(easyQuestions);
  console.log('TASK: 3');
  const sortedDifficulty = cleanQuotes.map(result => {
    let difficultyNum = 0;
    if(result.difficulty === 'easy') difficultyNum = 0;
    if(result.difficulty === 'medium') difficultyNum = 1;
    if(result.difficulty === 'hard') difficultyNum = 2;
    return {
      difficultyNum,
      ...result
    }
  })
  .sort((a,b) => a.difficultyNum > b.difficultyNum);
  console.log(sortedDifficulty);
  console.log('TASK: 4');
  const questionTotals = {
    easy: sortedDifficulty.filter(result => result.difficultyNum===0).length,
    medium: sortedDifficulty.filter(result => result.difficultyNum===1).length,
    hard: sortedDifficulty.filter(result => result.difficultyNum===2).length
  }
  console.log(questionTotals);
  console.log('TASK: 5');
  console.log(cleanQuotes.every(result => result.category === 'Science: Computers'))
  console.log('BONUS');
  const sortedByChoiceTypeMedium = cleanQuotes.filter(result => {
    return result.difficulty === 'medium'
  })
  .sort((a,b) => a.type > b.type)
  console.log(sortedByChoiceTypeMedium);
})

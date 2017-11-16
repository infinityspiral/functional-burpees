//Good luck! Maybe start by making that fetch request ;)
const getData = () => {
  const DATA_URL = 'https://opentdb.com/api.php?amount=10&category=18';
  return fetch(DATA_URL)
  .catch(e => console.log(e))
  .then(res => res.json())
  .then(data => data.results);
}

getData()
.then(results => {
  // task 1
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

  // task 2
  const easyQuestions = cleanQuotes.filter(result => result.difficulty === 'easy');
  console.log(easyQuestions);

  // task 3
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

  // task 4
  const questionTotals = {
    easy: sortedDifficulty.filter(result => result.difficultyNum===0).length,
    medium: sortedDifficulty.filter(result => result.difficultyNum===1).length,
    hard: sortedDifficulty.filter(result => result.difficultyNum===2).length
  }
  console.log(questionTotals);

  // task 5
  console.log(cleanQuotes.every(result => result.category === 'Science: Computers'))

  // bonus
  const sortedByChoiceTypeMedium = cleanQuotes.filter(result => {
    return result.difficulty === 'medium'
  })
  .sort((a,b) => a.type > b.type)
  console.log(sortedByChoiceTypeMedium);
})
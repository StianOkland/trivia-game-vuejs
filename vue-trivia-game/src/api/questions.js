export async function apiFetchQuestions(category, difficulty, questionsNum) {
    try {
        const apiURL = `https://opentdb.com/api.php?amount=${questionsNum}&category=${category}&difficulty=${difficulty}`;

        console.log(apiURL)
        const response = await fetch(apiURL)
        
        if(!response.ok) {
            throw new Error('Could not find questions')
        }
        
        const data = await response.json()
        console.log(data.results)

        return [null, data.results]
    }
    catch(e) {
        return [e.message, []]
    }
}
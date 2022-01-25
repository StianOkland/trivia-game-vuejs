export async function apiFetchQuestions(category, difficulty, questionsNum) {
    let apiURL = `https://opentdb.com/api.php?amount=${questionsNum}`
    try {
        if (category){
            apiURL += `&category=${category}`
        }
        if(difficulty){
            apiURL += `&difficulty=${difficulty}`
        }

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
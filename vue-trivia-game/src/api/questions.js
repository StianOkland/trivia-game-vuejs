export async function apiFetchQuestions(category, difficulty, questionsNum) {
    let apiURL = `https://opentdb.com/api.php?amount=${questionsNum}`

    try {
        if (category != 'Any'){
            apiURL += `&category=${category}`
        }
        if(difficulty && difficulty != 'Any difficulty'){
            apiURL += `&difficulty=${difficulty}`
        }

        const response = await fetch(apiURL)

        const data = await response.json()

        if(data.response_code != '0') {
            return ['Not enough questions for your settings.', []]
        }

        return [null, data.results]
    }
    catch(e) {
        return [e.message, []]
    }
}
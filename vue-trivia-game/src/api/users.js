export async function apiFetchAllUsers() {
    try {
        const response = await fetch('so-noroff-api.herokuapp.com/trivia')
        
        console.log(response.json())
        if(!response.ok) {
            throw new Error('Could not find users')
        }
        
        const data = await response.json()

        return [null, data]
    }
    catch(e) {
        return [e.message, []]
    }
}
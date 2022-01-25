const apiURL = "https://so-noroff-api.herokuapp.com"
const apiKey = "vuCBnrhCOEWMwEKoE5I0Aw=="

export async function apiFetchAllUsers() {
    try {
        const response = await fetch(`${apiURL}/trivia`)
        
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

export async function apiFetchUser(username){
    //fetches user info given username

    try {
        const response = await fetch(`${apiURL}/trivia?username=${username}`)
        
        if(!response.ok) {
            throw new Error('Could not find user')
        }
        
        const data = await response.json()

        return [null, data]
    }
    catch(e) {
        return [e.message, []]
    }
}

export async function apiRegisterUser(username){

    const requestOptions = {
        method: 'POST',
        headers: {
            'x-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            highScore: 0
        })
    }
    try {
        const response = await fetch(`${apiURL}/trivia`, requestOptions)
        
        if(!response.ok) {
            throw new Error('Could not create new user')
        }
        
        const data = await response.json()

        return [null, data]
    }
    catch(e) {
        return [e.message, []]
    }
}

export async function apiUpdateHighScore(userId, newScore){
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            highScore : newScore
        })
    }
    try {
        const response = await fetch(`${apiURL}/trivia/${userId}`, requestOptions)
        
        if(!response.ok) {
            throw new Error('Could not update score')
        }
        
        const data = await response.json()

        return [null, data]
    }
    catch(e) {
        return [e.message, []]
    }
}
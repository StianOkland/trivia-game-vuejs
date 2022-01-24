export async function apiFetchAllCategories() {
    try {
        const response = await fetch('https://opentdb.com/api_category.php/')
        
        if(!response.ok) {
            throw new Error('Could not find categories')
        }
        
        const data = await response.json()

        return [null, data]
    }
    catch(e) {
        return [e.message, []]
    }
}
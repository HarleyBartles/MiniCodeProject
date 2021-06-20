
// ToDo: extend for external api requests as required
export const localGetRequest = (url = '', data = {}) => {
    const params = new URLSearchParams(data).toString();
    const path = url + '?' + params

    return fetch(path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
}

export const localPostRequest = async (url = '', data = {}) => {
    var formBody = []

    for (var key in data) {
        var encodedKey = encodeURIComponent(key)
        var encodedValue = encodeURIComponent(data[key])
        formBody.push(encodedKey + "=" + encodedValue)
    }

    formBody = formBody.join("&")

    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
}
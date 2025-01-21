const host = 'https://wedev-api.sky.pro/api/v1/alexandr-perevoz'
export const fetchComments = () => {
    return fetch(`${host}/comments`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
}

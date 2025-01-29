const host = 'https://wedev-api.sky.pro/api/v1/alexandr-perevoz'
const formattedDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
export const fetchComments = () => {
    return fetch(`${host}/comments`)
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: formattedDate(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
}

export const postComments = (text, name) => {
    return fetch(`${host}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    }).then(() => {
        return fetchComments()
    })
}

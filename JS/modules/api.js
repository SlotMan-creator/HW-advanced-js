const host = 'https://wedev-api.sky.pro/api/v1/alexandr-perevoz'
const formattedDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export const fetchComments = async () => {
    const response = await fetch(`${host}/comments`)
    const responseData = await response.json()
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
}

export const postComments = async (text, name) => {
    await fetch(`${host}/comments`, {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    })
    return await fetchComments()
}

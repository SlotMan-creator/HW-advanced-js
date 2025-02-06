const host = 'https://wedev-api.sky.pro/api/v1/alexandr-perevoz'
const formattedDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

const formState = {
    name: '',
    text: '',
}

export const fetchComments = async () => {
    try {
        const response = await fetch(`${host}/comments`)
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
        }
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
    } catch (error) {
        if (error.message.includes('5')) {
            alert('Сервер сломался, попробуй позже')
        }
        console.error('Не удалось загрузить комментарии:', error)
        throw error
    }
}

export const postComments = async (text, name) => {
    if (text.length < 3 || name.length < 3) {
        alert('Имя и комментарий должны быть не короче 3 символов')
        return
    }
    try {
        const response = await fetch(`${host}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                text,
                name,
                forceError: true,
            }),
        })

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
        }

        return await fetchComments()
    } catch (error) {
        if (!navigator.onLine) {
            alert('Кажется, у вас сломался интернет, попробуйте позже')
        } else if (error.message.includes('5')) {
            alert('Извините сервер упал, попробуйте позже')
        } else {
            alert('Ошибка при добавлении комментария')
        }
        console.error('Не удалось отправить комментарий:', error)
        throw error
    }
}

const onInputChange = (event) => {
    const { name, value } = event.target
    formState[name] = value
}

document.querySelector('.add-form-name').addEventListener('input', (event) => {
    onInputChange(event)
})

const submitComment = async () => {
    await postComments(formState.text, formState.name)
}

submitComment()

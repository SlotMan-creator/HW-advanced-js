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
    try {
        const response = await fetch(`${host}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                text,
                name,
                forceError: true,
            }),
        })

        if (response.status === 500) {
            throw new Error('Сервер сломался')
            // return await postComments(text, name)
            // ---  это условие для дополнительного дз,где после появления 500й ошибки,
            // повторно отправляется запрос к АПИ для успешной отправки комментов
            // для его включения раскомментировать 'return await postComments(text, name)' и
            // закомментировать 'throw new Error('Сервер сломался')'
        }

        if (response.status === 400) {
            throw new Error(
                'Ошибка в запросе пользователя,исправьте и повторите',
            )
        }

        return await fetchComments()
    } catch (error) {
        let internetError = false
        if (error.message === 'Сервер сломался') {
            alert('Извините сервер упал, попробуйте позже')
        } else if (
            error.message ===
            'Ошибка в запросе пользователя,исправьте и повторите'
        ) {
            alert(
                'Текст имени или комментария должен содержать хотя бы 3 символа',
            )
        } else {
            alert('Кажется,у вас пропал интернет,попробуйте позже')
            internetError = true
        }
        if (!internetError) {
            alert(`Не удалось отправить комментарий: ${error.message}`)
        }
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

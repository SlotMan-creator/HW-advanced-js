const host = 'https://wedev-api.sky.pro/api/v2/alexandr-perevoz'
const authHost = 'https://wedev-api.sky.pro/api/user'
const formattedDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

let token = ''

export const setToken = (newToken) => {
    token = newToken
}

const formState = {
    name: '',
    text: '',
}

export const fetchComments = async () => {
    try {
        const response = await fetch(`${host}/comments`)
        if (response.status >= 500 && response.status < 600) {
            throw new Error('Сервер сломался')
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
        if (error.message === 'Сервер сломался') {
            alert('Извините сервер упал, попробуйте позже')
        }
        alert(`Не удалось загрузить комментарии: ${error.message}`)
        throw error
    }
}
export const postComments = async (text, name) => {
    try {
        const response = await fetch(`${host}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                text,
                name,
                forceError: true,
            }),
        })

        if (response.status >= 500 && response.status < 600) {
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

        if (response.status === 401) {
            throw new Error(
                'Добавление нового комментария доступно только для зарегистрированных пользователей',
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
        } else if (
            error.message ===
            'Добавление нового комментария доступно только для зарегистрированных пользователей'
        ) {
            alert('Войдите в аккаунт или зарегистрируйтесь')
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

document.querySelectorAll('.add-form-name').forEach((input) => {
    input.addEventListener('input', onInputChange)
})

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}

export function saveUserToLocalStorage(user) {
    window.localStorage.setItem('user', JSON.stringify(user))
}

export function getUserFromLocalStorage(user) {
    try {
        return JSON.parse(window.localStorage.getItem(user))
    } catch (error) {
        console.error('Ошибка анализа пользователя из localStorage:', error)
        return null
    }
}

export function removeUserFromLocalStorage(user) {
    window.localStorage.removeItem(user)
}

export function escapeHtml(html) {
    if (typeof html !== 'string') {
        return ''
    }
    return html
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
}

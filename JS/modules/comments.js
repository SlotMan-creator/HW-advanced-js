export let comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        liked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        liked: true,
    },
]

export function addComment(name, text) {
    const currentDate = new Date()
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`

    const newComment = {
        name: name,
        date: formattedDate,
        text: text,
        likes: 0,
        liked: false,
    }

    comments.push(newComment)
}

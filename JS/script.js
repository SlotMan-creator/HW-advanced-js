const comments = [
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

const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

function escapeHtml(html) {
    return html
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;')
}

function renderComments() {
    commentsList.innerHTML = ''
    comments.forEach((comment, index) => {
        const commentEl = `
        <li class="comment">
          <div class="comment-header">
            <div>${escapeHtml(comment.name)}</div>
            <div>${escapeHtml(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${escapeHtml(comment.text)}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.liked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
        commentsList.innerHTML += commentEl
    })

    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', toggleLike)
    })
    commentsList.querySelectorAll('.comment').forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            textareaEl.value =
                ' > ' +
                escapeHtml(comments[index].name) +
                ':' +
                '\n*' +
                escapeHtml(comments[index].text) +
                '*'
        })
    })
}

function toggleLike(event) {
    const index = event.target.dataset.index
    // console.log(event.target);
    comments[index].liked = !comments[index].liked
    comments[index].liked ? comments[index].likes++ : comments[index].likes--

    renderComments()
}

addButton.addEventListener('click', () => {
    const name = inputEl.value.trim()
    const text = textareaEl.value.trim()

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля!')
        return
    }

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

    inputEl.value = ''
    textareaEl.value = ''

    renderComments()
})

renderComments()

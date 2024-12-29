import { addComment } from './comments.js'
import { renderComments } from './renderComments.js'
import { escapeHtml } from './escapeHtml.js'
import { comments } from './comments.js'

const inputEl = document.querySelector('.add-form-name')
export function setupEventListeners(addButton, commentsList, textareaEl) {
    addButton.addEventListener('click', () => {
        const name = inputEl.value.trim()
        const text = textareaEl.value.trim()

        if (!name || !text) {
            alert('Пожалуйста, заполните все поля!')
            return
        }

        addComment(name, text)
        inputEl.value = ''
        textareaEl.value = ''
        renderComments(commentsList)
    })

    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const index = event.target.dataset.index
            if (comments[index]) {
                const comment = comments[index]
                comment.liked = !comment.liked
                comment.liked ? comment.likes++ : comment.likes--
                renderComments(commentsList)
            }
        }

        const commentElement = event.target.closest('.comment')
        if (commentElement) {
            const index = Array.from(commentsList.children).indexOf(
                commentElement,
            )
            if (comments[index]) {
                textareaEl.value = ` > ${escapeHtml(comments[index].name)}:\n*${escapeHtml(comments[index].text)}*`
            }
        }
    })
}

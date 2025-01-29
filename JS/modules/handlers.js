import { postComments } from './api.js'
import { renderComments } from './renderComments.js'
import { escapeHtml } from './escapeHtml.js'
import { comments, updateComments } from './comments.js'

const inputEl = document.querySelector('.add-form-name')
export function setupEventListeners(addButton, commentsList, textareaEl) {
    addButton.addEventListener('click', () => {
        const name = textareaEl.value.trim()
        const text = inputEl.value.trim()

        if (!name || !text) {
            alert('Пожалуйста, заполните все поля!')
            return
        }

        postComments(escapeHtml(name), escapeHtml(text)).then((data) => {
            updateComments(data)
            renderComments(commentsList)
            inputEl.value = ''
            textareaEl.value = ''
        })
    })

    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const index = event.target.dataset.index
            if (comments[index]) {
                const comment = comments[index]
                comment.isLiked = !comment.isLiked
                comment.isLiked ? comment.likes++ : comment.likes--
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

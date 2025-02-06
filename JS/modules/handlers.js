import { postComments } from './api.js'
import { renderComments } from './renderComments.js'
import { escapeHtml } from './escapeHtml.js'
import { comments, updateComments } from './comments.js'

export const inputEl = document.querySelector('.add-form-name')
export function setupEventListeners(addButton, commentsList, textareaEl) {
    addButton.addEventListener('click', () => {
        const name = textareaEl.value.trim()
        const text = inputEl.value.trim()

        if (!name || !text) {
            alert('Пожалуйста, заполните все поля!')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComments(escapeHtml(name), escapeHtml(text)).then((data) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'
            updateComments(data)
            renderComments(commentsList)
            inputEl.value = ''
            textareaEl.value = ''
        })
    })

    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }

    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            event.stopPropagation()
            const index = event.target.dataset.index
            if (comments[index]) {
                event.target.classList.add('-loading-like')
                setTimeout(() => {
                    event.target.classList.remove('-loading-like')
                }, 1500)
                const comment = comments[index]
                comment.isLikeLoading = true
                delay(1500).then(() => {
                    comment.isLiked = !comment.isLiked
                    comment.isLiked ? comment.likes++ : comment.likes--
                    comment.isLikeLoading = false
                    renderComments(commentsList)
                    event.target.classList.toggle(
                        '-active-like',
                        comment.isLiked,
                    )
                })
            }
            return
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

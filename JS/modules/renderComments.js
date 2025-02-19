import { escapeHtml } from './escapeHtml.js'
import { comments } from './comments.js'
import { renderLogin } from './renderLogin.js'
import { token } from './api.js'
import { setupEventListeners } from './handlers.js'

export function renderComments(commentsList) {
    const container = document.querySelector('.container')
    const commentsHtml = comments
        .map((comment, index) => {
            return `
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
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
        })
        .join('')

    // Нужно подставить переменную имени в первый инпут,где "введите ваше имя"
    // атрибут.value
    const formCommentsHtml = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 25px;">
                Подождите,комментарий добавляется...
            </div>`
    const linkToLoginText = `<p>Чтобы отправить комментарий, <span class='link-login'>войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>

    ${token ? formCommentsHtml : linkToLoginText}`

    container.innerHTML = baseHtml

    if (!token) {
        document.querySelector('.link-login').addEventListener('click', () => {
            renderLogin()
        })
    }

    if (token) {
        const textareaEl = document.querySelector('.add-form-text')
        const addButton = document.querySelector('.add-form-button')
        setupEventListeners(addButton, commentsList, textareaEl)
    }
}

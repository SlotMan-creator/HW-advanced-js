import { escapeHtml } from './escapeHtml.js'
import { comments } from './comments.js'
import { renderLogin } from './renderLogin.js'

export function renderComments(commentsList) {
    const container = document.querySelector('.container')
    const commentsHtml = (commentsList.innerHTML = '')
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
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`
        commentsList.innerHTML += commentEl
    })
    const addCommentsHtml = `
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
    const linkToLoginText = `<p>Чтобы отправить комментарий, <span
    class='link-login>войдите</span></p>`

    const baseHtml = `< class="comments">${commentsHtml}
    ${linkToLoginText}`

    container.innerHTML = baseHtml

    document.querySelector('.link-login').addEventListener('click', () => {
        renderLogin()
    })
}

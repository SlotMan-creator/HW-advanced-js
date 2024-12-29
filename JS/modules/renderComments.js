import { escapeHtml } from './escapeHtml.js';
import { comments } from './comments.js';

export function renderComments(commentsList) {
    commentsList.innerHTML = '';
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
        </li>`;
        commentsList.innerHTML += commentEl;
    });
}
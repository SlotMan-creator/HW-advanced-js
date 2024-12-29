import { toggleLike } from "./comments.js";

export function setupEventListeners(addButton, commentsList, textareaEl) {
    addButton.addEventListener('click', () => {
        const name = inputEl.value.trim();
        const text = textareaEl.value.trim();

        if (!name || !text) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        addComment(name, text);
        inputEl.value = '';
        textareaEl.value = '';
        renderComments(commentsList);
    });

    commentsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const index = event.target.dataset.index;
            toggleLike(index);
            renderComments(commentsList);
        }

        if (event.target.closest('.comment')) {
            const index = Array.from(commentsList.children).indexOf(event.target.closest('.comment'));
            textareaEl.value = ` > ${escapeHtml(comments[index].name)}:\n*${escapeHtml(comments[index].text)}*`;
        }
    });
}
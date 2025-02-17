import { renderComments } from './modules/renderComments.js'
import { setupEventListeners } from './modules/handlers.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

const textareaEl = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

commentsList.innerHTML = 'Пожалуйста,подождите,идет загрузка комментариев...'

fetchComments().then((data) => {
    updateComments(data)
    renderComments(commentsList)
})

setupEventListeners(addButton, commentsList, textareaEl)

import { renderComments } from './modules/renderComments.js'
import { setupEventListeners } from './modules/handlers.js'

const textareaEl = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

renderComments(commentsList)
setupEventListeners(addButton, commentsList, textareaEl)

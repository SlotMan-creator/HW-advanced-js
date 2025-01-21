import { renderComments } from './modules/renderComments.js'
import { setupEventListeners } from './modules/handlers.js'
import { fetchComments } from './modules/api.js'

const textareaEl = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

fetchComments()
renderComments(commentsList)
setupEventListeners(addButton, commentsList, textareaEl)

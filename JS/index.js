import { comments, addComment } from './comments.js'
import { escapeHtml } from './modules/escapeHtml.js'
import { renderComments } from './renderComments.js'
import { setupEventListeners } from './handlers.js'

const inputEl = document.querySelector('.add-form-name')
const textareaEl = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')

renderComments(commentsList)
setupEventListeners(addButton, commentsList, textareaEl)

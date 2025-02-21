import { renderComments } from './modules/renderComments.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

export const fetchRenderComments = () => {
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}

fetchRenderComments()

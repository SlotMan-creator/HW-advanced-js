import { renderComments } from './modules/renderComments.js'
import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'

const commentsList = document.querySelector('.comments')

// commentsList.innerHTML = 'Пожалуйста,подождите,идет загрузка комментариев...'

// document.querySelector('.container').innerHTML = `<ul class="comments">
//             </ul>
//         <div class="add-form">
//                 <input
//                     type="text"
//                     class="add-form-name"
//                     placeholder="Введите ваше имя"
//                 />
//                 <textarea
//                     type="textarea"
//                     class="add-form-text"
//                     placeholder="Введите ваш коментарий"
//                     rows="4"
//                 ></textarea>
//                 <div class="add-form-row">
//                     <button class="add-form-button">Написать</button>
//                 </div>
//             </div>
//             <div class="form-loading" style="display: none; margin-top: 25px;">
//                 Подождите,комментарий добавляется...
//             </div>

//     <p>Чтобы отправить комментарий, <span
//     class='link-login'>войдите</span></p>`
export const fetchRenderComments = () => {
    fetchComments().then((data) => {
        updateComments(data)
        renderComments(commentsList)
    })
}

fetchRenderComments()

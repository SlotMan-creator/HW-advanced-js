import { renderUploadImageComponent } from './upload-image-component.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
        // @TODO: Реализовать страницу добавления поста
        const uploadImageContainer = appEl.querySelector(
            '.upload-image-container',
        )
        if (uploadImageContainer) {
            renderUploadImageComponent({
                element: uploadImageContainer,
                onImageUrlChange(newImageUrl) {
                    imageUrl = newImageUrl
                },
            })
        }
        const appHtml = `
    <div class="header-container"></div>
        <h1>Страница добавления поста</h1>
    
        <textarea id="post-description" placeholder="Введите описание поста..." rows="4" cols="50"></textarea>
    
        <div>
            <label for="image-upload">Загрузить изображение:</label>
            <input type="file" id="image-upload" accept="image/*">
        </div>
    
        <button class="button" id="add-button">Добавить</button>
    </div>
  `
        appEl.innerHTML = appHtml
        document.getElementById('add-button').addEventListener('click', () => {
            onAddPostClick({
                description: 'Описание',
                imageUrl: 'https://image.png',
            })
        })
    }

    render()
}

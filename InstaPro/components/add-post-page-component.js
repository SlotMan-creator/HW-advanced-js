const baseHost = 'https://wedev-api.sky.pro'
export function renderAddPostPageComponent({ appEl }) {
    const render = () => {
        // @TODO: Реализовать страницу добавления поста
        const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <h1>Страница добавления поста</h1>
    
        <textarea id="post-description" placeholder="Введите описание поста..." rows="4" cols="50"></textarea>
    
        <div>
            <label for="image-upload">Загрузить изображение:</label>
            <input type="file" id="image-upload" accept="image/*">
        </div>
    
        <button class="button" id="add-button">Добавить</button>
    </div>`

        appEl.innerHTML = appHtml

        document.getElementById('add-button').addEventListener('click', () => {
            const description =
                document.getElementById('post-description').value
            const imageInput = document.getElementById('image-upload')
            const file = imageInput.files[0]

            if (file) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    const imageUrl = event.target.result // Получаем URL изображения
                    sendPostToApi({ description, imageUrl })
                }
                reader.readAsDataURL(file) // Читаем файл как Data URL
            } else {
                // Если изображение не выбрано, можно вызвать sendPostToApi без imageUrl
                sendPostToApi({ description, imageUrl: null })
            }
        })
    }

    const sendPostToApi = async (postData) => {
        try {
            const response = await fetch(baseHost + '/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            console.log('Post added successfully:', data)
            // Здесь вы можете вызвать onAddPostClick или выполнить другие действия
        } catch (error) {
            console.error('Error adding post:', error)
        }
    }

    render()
}

import { fetchRenderComments } from '../index.js'
import { login, setToken, setUserName } from './api.js'
export const renderLogin = () => {
    const container = document.querySelector('.container')
    const loginHtml = `
    <section class="add-form">
       <h1>Форма входа</h1>
      <input 
        type="text"
        class="add-form-name"
        placeholder="Введите логин"
        id="login"
        required
      />
      <input 
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        id="password"
        required
      ></input>
      <fieldset class="add-form-registry">
          <button class="add-form-button-main button-main" id="login-button" type="submit">Войти</button>
          <u class="add-form-button registry" id="registration">Зарегистрироваться</u>
      </fieldset>
    </section>`

    container.innerHTML = loginHtml

    const loginEl = document.getElementById('login')
    const passwordEl = document.getElementById('password')
    const loginButtonEl = document.getElementById('login-button')
    loginButtonEl.addEventListener('click', () => {
        if (loginEl.value && passwordEl.value) {
            login(loginEl.value, passwordEl.value)
                .then((response) => {
                    return response.json()
                })
                .then((userData) => {
                    console.log(userData)
                    setToken(userData.user.token)
                    setUserName(userData.user.name)
                    fetchRenderComments()
                })
        }
    })
}

import { postAuth } from "../services/auth.service.js"

const login = document.createElement('form')
login.setAttribute('id', 'p-login')

const eventos = () => {
    login.addEventListener('submit', (e) => {
        e.preventDefault()

        const mensagemSpan = login.querySelector('span')

        const fd = new FormData(login)
        const dados = Object.fromEntries(fd)

        postAuth(dados)
            .then(({data}) => { // desestruturação
                const{token, ...dadosUsuarios} = data
                window.sessionStorage.setItem('@user', JSON.stringify(dadosUsuarios))
                window.sessionStorage.setItem('@token', token)
                window.location.href = '/#contacts'
            })
            .catch((erro) => {
                mensagemSpan.innerText = 'Verifique suas informações'
                console.log(erro)
            })
    })
}

export const Login = () => {

    login.innerHTML = `
        <label for="email">E-mail</label>
        <input type="email" name="email" required>

        <label for="senha">Senha</label>
        <input type="password" name="senha" required>

        <button type="submit">Entrar</button>
        <span></span>

        <p>Não tem conta?<a href="/#signup">Clique aqui</a></p>
    `
    eventos()
    return login
}
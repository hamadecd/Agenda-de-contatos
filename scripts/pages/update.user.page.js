import { deleteUser, patchUser } from "../services/user.service.js"
import { Header } from "../components/header.component.js"

const root = document.querySelector('#root')
const update = document.createElement('form')
update.setAttribute('id', 'p-signup')

const eventos = () => {

    update.addEventListener('submit', (e) => {
        e.preventDefault()

        const fd = new FormData(update)
        const dados = Object.fromEntries(fd)

        patchUser(dados)
            .then(({ data }) => {
                if (data.email !== "") {
                    dados.email = data.email
                }
                if (data.nome !== "") {
                    dados.nome = data.nome
                }
                if (data.senha !== "") {
                    dados.senha = data.senha
                }

                window.alert("Dados alterados com sucesso!")
                window.location.href = "/#contacts"
            })
            .catch((erro) => {
                window.alert('Nenhuma alteração feita')
                console.log(erro)
            })
    })

    const delUser = update.querySelector('#btn-delete')

    delUser.addEventListener('click', (e) => {
        const usuario = JSON.parse(sessionStorage.getItem('@user'))
        e.preventDefault()

        const confirm = window.confirm('Deseja realmente deletar usuário?')
        if (confirm) {
            deleteUser(usuario)
                .then(() => {
                    window.alert(`Usuário ${usuario.nome} deletado com sucesso!`)
                    sessionStorage.removeItem('@user')
                    sessionStorage.removeItem('@token')
                    window.location.reload()
                })
                .catch((erro) => {
                    console.log(`${erro} deu errado`)
                })
        }

    })

}

export const Update = () => {
    root.append(Header())

    update.innerHTML = `
        <label for="email">E-mail</label>
        <input type="email" name="email">

        <label for="senha">Senha</label>
        <input type="password" name="senha">

        <label for="nome">Nome</label>
        <input type="text" name="nome">

        <button id="btn-salvar" type="submit">Salvar Alterações</button>
        <button type="button" id='btn-delete'>Excluir usuário</button>
        <a id="voltar" href="/#contacts">
            <button type="button" id="btn-voltar">Voltar</button>
        </a>
    `
    eventos()
    return update
}
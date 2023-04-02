const header = document.createElement('header')
header.setAttribute('id', 'c-header')

const eventos = () => {
    const sair = header.querySelector('#btn-sair')
    sair.addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.removeItem('@user')
        sessionStorage.removeItem('@token')
        window.location.href = '/#login'
        window.location.reload()
    })

    const updateUser = header.querySelector('#btn-update')
    updateUser.addEventListener('click', (e) => {
        e.preventDefault()
        window.location.href = '/#update'
        window.location.reload()
    })

}

export const Header = () => {
    const usuario = JSON.parse(sessionStorage.getItem('@user'))
    header.innerHTML = `
        <span>${usuario?.nome}</span>
        <a href="/#update" id='btn-update'>Editar/Excluir usuário</a>
        <a href="/#login" id='btn-sair'>Sair</a>
    `
    
    eventos()
    return header
}
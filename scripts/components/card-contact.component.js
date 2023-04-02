import { deleteContact } from "../services/contact.service.js"

const cardContact = document.createElement('div')
cardContact.classList.add('c-card-contact')

const eventos = (contato, clonedCardContact) => {
    const [clonedAnchorDelete] = clonedCardContact.querySelectorAll('a')

    clonedAnchorDelete.addEventListener('click', (e) => {
        e.preventDefault()
        const confirm = window.confirm(`Deseja deletar o contato ${contato.nome}?`)
            
            if(confirm) {
                deleteContact(contato.id)
                    .then(() => {
                        clonedCardContact.remove()
                        window.location.reload()
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
            }
    })
}

export const CardContact = (contato) => {
    cardContact.innerHTML = `
        <p>${contato.nome}
            <a id="deletar" href="/#contacts">Deletar</a>
            <a id="detalhes" href="/?id-contact=${contato.id}#contact-details">Visualizar</a>
        </p>
    `
    /* 
    Quando você retorna cardContact.cloneNode(true), você está criando uma cópia do 
    elemento cardContact com todos os seus filhos e atributos. Isso significa que a 
    cópia não terá nenhum evento de clique anexado ao elemento "a" dentro dela.
    */
    const clonedCardContact = cardContact.cloneNode(true)
    // Capturando todos elementos "a" para poder adicionar o evento de click a cópia do cardContact
    
    eventos(contato, clonedCardContact)
    return clonedCardContact
}
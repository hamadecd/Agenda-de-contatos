import { CardContact } from "../components/card-contact.component.js"
import { Header } from "../components/header.component.js"
import { getAllContacts } from "../services/contact.service.js"

const root = document.querySelector('#root')
const contacts = document.createElement('div')
contacts.setAttribute('id', 'p-contacts')

const eventos = () => {
    getAllContacts()
        .then(({data}) => {
            const divContatos = contacts.querySelector('#contatos')
            // data é um array de contatos então eu tenho contato como item
            data.forEach(contato => {
                const cardContact = CardContact(contato)
                divContatos.appendChild(cardContact)
            });
            //console.log(sucesso)
        })
        .catch((erro) => {
            console.log(erro)
        })
}

export const Contacts = () => {
    window.location.href = '/#contacts'

    const componenteHeader = Header()
    root.append(componenteHeader)

    contacts.innerHTML = `
        <h1>Contatos</h1>
        <div id="contatos"></div>
    `

    eventos()
    return contacts
}
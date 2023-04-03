import { Header } from "../components/header.component.js"
import { patchContact } from "../services/contact.service.js"

const root = document.querySelector('#root')
const atualizaContato = document.createElement('form')
atualizaContato.setAttribute('id', 'p-update-contact')

const eventos = (e) => {
    atualizaContato.addEventListener('submit', (e) => {
        e.preventDefault()
        
    })
}

export const updateContact = () => {
    root.append(Header())

    atualizaContato.innerHTML = `
        <div id="cabecalho">
            <h1>Alterar Contato</h1>
            <a href="/#contacts">Voltar para contatos</a>
        </div>

        <fieldset>
            <legend>Dados pessoais</legend>
            <input placeholder="Nome" name="nome" type="text" required/>
            <input placeholder="Apelido" name="apelido" type="text" />
            <input placeholder="E-mail" name="email" type="email" />
            <textarea placeholder="Nota" name="notas" /></textarea>
        </fieldset>
        <fieldset>
            <legend>Endereço</legend>
            <input placeholder="Logradouro" name="logradouro" type="text" />
            <input placeholder="Cidade" name="cidade" type="text" />
            <input placeholder="Estado" name="estado" type="text" />
            <input placeholder="CEP" name="cep" type="text" />
            <input placeholder="País" name="pais" type="text" />
        </fieldset>
            
        <fieldset>
            <legend>Telefones</legend>
            <select name="tipo-telefone-1">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>
            <input name="numero-1" placeholder="Insira o número aqui..." type="phone" />

            <select name="tipo-telefone-2">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>            
            <input name="numero-2" placeholder="Insira o número aqui..." type="phone" />

            <select name="tipo-telefone-3">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>
            <input name="numero-3" placeholder="Insira o número aqui..." type="phone" />
        </fieldset>

        <button>Cadastrar</button>
    `
    eventos()
    return atualizaContato
}
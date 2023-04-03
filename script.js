import { NotFound } from './scripts/pages/404.page.js'
import {Login} from './scripts/pages/login.page.js'
import { Signup } from './scripts/pages/signup.page.js'
import { Update } from './scripts/pages/update.user.page.js'
import { Contacts } from './scripts/pages/contacts.page.js'
import { AddContact } from './scripts/pages/add-contact.page.js'
import { ContactDetails } from './scripts/pages/contact-details.page.js'
import { updateContact } from './scripts/pages/update.contact.page.js'

const ROUTER = {
    "#login": { component: Login, private: false},
    "#404": { component: NotFound, private: undefined},
    "#signup": {component: Signup, private: false},
    "#update": {component: Update, private: true},
    "#update-contact": {component: updateContact, private: true},
    "#add-contact": { component: AddContact, private: true },
    "#contact-details": { component: ContactDetails, private: true },
    "#contacts": {component: Contacts, private: true}
}

function isTokenExpired(token) {
    if(!token) return true
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
    return (Math.floor((new Date).getTime() / 1000)) >= expiry
}

function redirectPage() {
    const route = ROUTER[window.location.hash] || ROUTER['#404']
    const root = document.querySelector('#root')

    const token = sessionStorage.getItem('@token')
    const ehTokenExpirado = isTokenExpired(token)
    const ehRotaPrivada = route.private === true
    const ehRotaPublica = route.private === false
    const ehRotaPublicaPrivada = route.private === undefined
    
    if(!ehRotaPublicaPrivada) {    
            if(ehRotaPrivada && ehTokenExpirado) {
                sessionStorage.removeItem('@token')
                sessionStorage.removeItem('@user')
                window.location.href = '/#login'
                return
            }
            
            if(ehRotaPublica && !ehTokenExpirado) {
                window.location.href = '/#contacts'
                window.location.reload()
                return
            }
        }

    root.innerHTML = null
    root.append(route.component())
}

window.addEventListener('load', () => {

    if(!window.location.hash) {
        window.location.href = '/#login'
    }
    
    redirectPage()
    window.addEventListener('hashchange', redirectPage)
})
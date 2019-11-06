/* eslint-disable */

import '@babel/polyfill'
import login from './login'
import logout from './logout'
import updateSettings from './updateSettings'
import displayMap from './mapbox'
import bookTour from './stripe'

// DOM ELEMENTS
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const logoutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')
const bookBtn = document.getElementById('book-tour')

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    e.preventDefault()
    login(email, password)
  })
}

if (logoutBtn) logoutBtn.addEventListener('click', logout)

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])

    e.preventDefault()

    updateSettings(form, 'data')
  })

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', e => {
    document.querySelector('.btn--save-password').textContent = 'Updateing...'
    const passwordCurrent = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value

    e.preventDefault()

    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password')
  })

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing..'
    const { tourid } = e.target.dataset
    bookTour(tourid)
  })
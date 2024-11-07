'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function selectAll(selector, scope = document) {
    return scope.querySelectorAll(selector);
}

const form = select('.inputs');
const countDiv = select('.total-div');
const shapeGrid = select('.shape-grid');
const createButton = select('.create-button');
const message = select('.message');


class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() { return this.#name; }
    get city() { return this.#city; }
    get email() { return this.#email; }
}

window.addEventListener('load', () => {
    clearInputs();
});

function deleteContact(contact) {
    const index = contacts.indexOf(contact);
    if (index !== -1) {
        contacts.splice(index, 1);
        listContacts();
        updateTotalContacts();
    }
}

function updateTotalContacts() {
    countDiv.textContent = `Saved Contacts: ${contacts.length}`;
}

function clearInputs() {
    select('.name').value = '';
    select('.city').value = '';
    select('.email').value = '';
}

const contacts = [];

function isEmailValid(email) {
    const emailRegex = /^(?=.*[a-zA-Z])(?=.*@)(?=.*\.).{8,}$/;
    return emailRegex.test(email);
}

function isAlphabet(str) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(str);
}

function validation() {
    const nameInput = select('.name');
    const cityInput = select('.city');
    const emailInput = select('.email');

    const nameValue = nameInput.value.trim();
    const cityValue = cityInput.value.trim();
    const emailValue = emailInput.value.trim();

    const values = [nameValue, cityValue, emailValue];

    let errorMessage = '';

    if (!values[0] || !/^[a-zA-Z\s]+$/.test(values[0])) {
        message.textContent = 'Please enter a valid name.';
        nameInput.focus();
        return false;
    } else if (!values[1] || !isAlphabet(values[1])) {
        message.textContent = 'Please enter a valid city name.';
        cityInput.focus();
        return false;
    } else if (!values[2] || !isEmailValid(values[2])) {
        message.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return false;
    }

    if (errorMessage) {
        message.textContent = errorMessage;
        message.style.display = 'block'; 
        return false; 
    }

    message.textContent = ''; 
    return true;
}

createButton.addEventListener('click', () => {
    const nameInput = select('.name');
    const cityInput = select('.city');
    const emailInput = select('.email');

    const nameValue = nameInput.value.trim();
    const cityValue = cityInput.value.trim();
    const emailValue = emailInput.value.trim();

    if (!validation()) {
        return;
    }
    const newContact = new Contact(nameValue, cityValue, emailValue);
    contacts.unshift(newContact);

    if (contacts.length > 0) {
        countDiv.style.display = 'block';
    }

    listContacts();
    updateTotalContacts();
    clearInputs();
});

function listContacts() {
    shapeGrid.innerHTML = ''; 

    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact-card');

        const contactObject = {
            name: contact.name,
            city: contact.city,
            email: contact.email
        };

        contactDiv.innerHTML = `
        <div>Name: ${contactObject.name}</div>
        <div>City: ${contactObject.city}</div>
        <div>Email: ${contactObject.email}</div>
        `;
        contactDiv.addEventListener('click', () => {
            deleteContact(contact);
        });
        shapeGrid.appendChild(contactDiv);
    });
}

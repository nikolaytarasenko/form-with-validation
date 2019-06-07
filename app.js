const inputs = document.querySelectorAll('.form__input');
const submit = document.querySelector('.form__submit');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', inputFocusHandler);
    inputs[i].addEventListener('blur', validate);
}

submit.addEventListener('click', submitHandler);

function inputFocusHandler(e) {
    e.target.previousElementSibling.classList.add('js-active');
    e.target.parentElement.classList.add('js-active');
    let rule = e.target.getAttribute('data-rule');
    e.target.parentElement.dataset.after = rule;
}

function validate(e) {
    const target = e.target;
    // Hide tooltip
    target.parentElement.classList.remove('js-active');

    // First name and last name validation
    if (target.name === 'firstName' || target.name === 'lastName') {
        if (target.value.length < 3) {
            validationError(target);
        } else {
            validationSuccess(target);
        }
    }

    // Email validation
    if (target.name === 'email') {
        if (!validateEmail(target.value)) {
            validationError(target);
        } else {
            validationSuccess(target);
        }
    }

    // Address validation
    if (target.name === 'address') {
        if (target.value.length < 10) {
            validationError(target);
        } else {
            validationSuccess(target);
        }
    }

    // Phone validation
    if (target.name === 'tel') {
        try {
            let x = target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
            target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
            if (target.value) validationSuccess(target);
        
        } catch(e) {
            validationError(target);
        }
    }

    // Password validation
    if (target.name === 'password') {
        if (target.value.length < 8) {
            validationError(target);
        } else {
            validationSuccess(target);
        }
    }

    // Confirm password validation
    if (target.name === 'passwordConfirm') {
        const password = document.forms.register.elements.password;

        if (target.value === password.value && !(target.value.length < 8)) {
            validationSuccess(target);
        } else {
            validationError(target);
        }
    }

}

// Email validation function
function validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;

    return email.search(pattern) < 0 ? false : true;
}

// Submit handler function
function submitHandler(e) {
    e.preventDefault();
    const inputsToSubmit = document.querySelectorAll('.form__input');

    [...inputsToSubmit].forEach(item => {
        if (item.value.length < 3) {
            validationError(item);
            item.previousElementSibling.classList.add('js-active');
        };
    });

    const errors = document.querySelectorAll('.js-red');
    
    if (errors.length === 0) {
        document.querySelector('.app__inner').classList.add('flip');
    }
    
}

// Additional functions
function validationError(target) {
    target.className = '';
    target.classList.add('form__input', 'js-red');
    target.previousElementSibling.classList.remove('form__label--success');
}

function validationSuccess(target) {
    target.classList.remove('js-red');
    target.classList.add('js-green');
    target.previousElementSibling.classList.add('form__label--success');
}

//Reset input values after page reload
window.onload = function() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}
const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    if (error === 0) {
        let response = await fetch('http://localhost:8080/api/sneakers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brand: form.elements['brand'].value,
                model: form.elements['model'].value,
                size: form.elements['size'].value,
                color: form.elements['color'].value
            })
        });

        if (response.ok) {
            let result = await response.json();
            alert("Кросівки успішно додано!");
            form.reset();
        } else {
            alert('Помилка збереження на сервері');
        }
    } else {
        alert('Заповніть неодмінні поля');
    }
}


function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let email_flag = false;
let pass_flag = false;

// EMAIL

const email_exr = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
const email_test = document.getElementById('testEmail');
const email = document.getElementById("email");

function validarEmail(campo) {
  let input = campo.value.trim();
  if (!input.match(email_exr) && input) {
    email_test.innerHTML = "<mark>Ingrese una dirección de correo válida</mark>"
    email_flag = false;
  } else {
    email_test.innerHTML = ""
    email_flag = true;
  }
}

email.addEventListener('input', (e) => {
  validarEmail(e.target);
})

// PASS

//const pass_exr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/g
const pass_test = document.getElementById('testPass');
const pass = document.getElementById("pass");

function validarPass(campo) {
  let input = campo.value.trim();
  let inputSize = input.length;

  if ((inputSize > 64 || inputSize < 8) && input) {
    pass_test.innerHTML = "<mark>La contraseña debe tener entre 8 y 64 caracteres</mark>"
    pass_flag = false;
  } else {
    pass_test.innerHTML = ""
    pass_flag = true
  }
}

pass.addEventListener('input', (e) => {
  validarPass(e.target);
})

// VALIDAR FORM

function validar() {

  validarEmail(email);
  validarPass(pass);

  if(email_flag && pass_flag) {
    return true
  }

  alert("Revisa los campos");
  return false;
}
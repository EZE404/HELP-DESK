let email_flag = false;
let pass_flag = false;

// EMAIL

const email_exr = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
const email_test = document.getElementById('testEmail');
const email = document.getElementById("email");

email.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  if (!input.match(email_exr) && input) {
    email_test.innerHTML = "<mark>Ingrese una dirección de correo válida</mark>"
    email_flag = false;
  } else {
    email_test.innerHTML = ""
    email_flag = true;
  }
})

// PASS

//const pass_exr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/g
const pass_test = document.getElementById('testPass');
const pass = document.getElementById("pass");

pass.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  let inputSize = e.target.value.trim().length;

  if ((inputSize > 64 || inputSize < 8) && input) {
    pass_test.innerHTML = "<mark>La contraseña debe tener entre 8 y 64 caracteres</mark>"
    pass_flag = false;
  } else {
    pass_test.innerHTML = ""
    pass_flag = true
  }
})

function validar() {
  const email_ok = (email_flag && email.value.trim()) ? true : false;
  const pass_ok = (pass_flag && pass.value.trim()) ? true : false;

  if (email_ok && pass_ok) {
    return true;
  }
  alert("Revisa los campos");
  return false;
}
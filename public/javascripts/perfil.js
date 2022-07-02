// FLAGS

let nombre_flag = false;
let apellido_flag = false;
let tel_flag = false;
let email_flag = false;

// NOMBRE

//const nombre_exp = new RegExp(/^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/, 'g');
const nombre_exr = /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g;
const nombre_test = document.getElementById('testNombre');
const nombre = document.getElementById("nombre");

nombre.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  if (!input.match(nombre_exr) && input) {
    nombre_test.innerHTML = "<mark>El nombre solo puede contener letras y sin espacios dobles</mark>"
    nombre_flag = false;
  } else {
    nombre_test.innerHTML = ""
    nombre_flag = true;
  }
})

// APELLIDO

//const apellido_exp = new RegExp(/^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/, 'g');
const apellido_exr = /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g;
const apellido_test = document.getElementById('testApellido');
const apellido = document.getElementById("apellido");

apellido.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  if (!input.match(apellido_exr) && input) {
    apellido_test.innerHTML = "<mark>El apellido solo puede contener letras y sin espacios dobles</mark>"
    apellido_flag = false;
  } else {
    apellido_test.innerHTML = ""
    apellido_flag = true;
  }
})

// TELEFONO

const tel_exr = /^[0-9]*$/g
const tel_test = document.getElementById('testTelefono');
const tel = document.getElementById("telefono");

tel.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  let inputSize = e.target.value.trim().length;
  if (((inputSize > 14 || inputSize < 10) || !input.match(tel_exr)) && input) {
    tel_test.innerHTML = "<mark>El teléfono solo puede contener números y tener entre 10 y 14 dígitos</mark>"
    tel_flag = false;
  } else {
    tel_test.innerHTML = ""
    tel_flag = true;
  }
})

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

function validar() {
  const nombre_ok = (nombre_flag && nombre.value.trim()) ? true : false;
  const apellido_ok = (apellido_flag && apellido.value.trim()) ? true : false;
  const tel_ok = (tel_flag && tel.value.trim()) ? true : false;
  const email_ok = (email_flag && email.value.trim()) ? true : false;

  if (nombre_ok && apellido_ok && tel_ok && email_ok) {
    return confirm("Confirmar");
  }
  alert("Revisa los campos");
  return false;
}
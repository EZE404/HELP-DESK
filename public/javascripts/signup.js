// FLAGS

let nombre_flag = false;
let apellido_flag = false;
let dni_flag = false;
let tel_flag = false;
let email_flag = false;
let pass_flag = false;

// NOMBRE

const nombre_exp = new RegExp(/^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/, 'g');
const nombre_exr = /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g;
const nombre_test = document.getElementById('testNombre');
const nombre = document.getElementById("nombre");

function validarNombre(campo) {
  let input = campo.value.trim();
  if (!input.match(nombre_exr) && input) {
    nombre_test.innerHTML = "<mark>El nombre solo puede contener letras y sin espacios dobles</mark>"
    nombre_flag = false;
  } else {
    nombre_test.innerHTML = ""
    nombre_flag = true;
  }
}

nombre.addEventListener('input', (e) => {
  validarNombre(e.target);
})

// APELLIDO

const apellido_exp = new RegExp(/^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/, 'g');
const apellido_exr = /^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/g;
const apellido_test = document.getElementById('testApellido');
const apellido = document.getElementById("apellido");

function validarApellido(campo) {
  let input = campo.value.trim();
  if (!input.match(apellido_exr) && input) {
    apellido_test.innerHTML = "<mark>El apellido solo puede contener letras y sin espacios dobles</mark>"
    apellido_flag = false;
  } else {
    apellido_test.innerHTML = ""
    apellido_flag = true;
  }
}

apellido.addEventListener('input', (e) => {
  validarApellido(e.target);
})

// DNI

const dni_exr = /^[0-9]*$/g
const dni_test = document.getElementById('testDni');
const dni = document.getElementById("dni");

function validarDni(campo) {
  let input = campo.value.trim();
  let inputSize = input.length;
  if (((inputSize > 10 || inputSize < 8) || !input.match(dni_exr)) && input) {
    dni_test.innerHTML = "<mark>El DNI solo puede contener números y tener entre 8 y 10 dígitos</mark>"
    dni_flag = false;
  } else {
    dni_test.innerHTML = ""
    dni_flag = true;
  }
}

dni.addEventListener('input', (e) => {
  validarDni(e.target)
})

// TELEFONO

const tel_exr = /^[0-9]*$/g
const tel_test = document.getElementById('testTelefono');
const tel = document.getElementById("telefono");

function validarTelefono(campo) {
  let input = campo.value.trim();
  let inputSize = input.length;
  if (((inputSize > 14 || inputSize < 10) || !input.match(tel_exr)) && input) {
    tel_test.innerHTML = "<mark>El teléfono solo puede contener números y tener entre 10 y 14 dígitos</mark>"
    tel_flag = false;
  } else {
    tel_test.innerHTML = ""
    tel_flag = true;
  }
}

tel.addEventListener('input', (e) => {
  validarTelefono(e.target);
})

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
/*   const nombre_ok = (nombre_flag && nombre.value.trim()) ? true : false;
  const dni_ok = (dni_flag && dni.value.trim()) ? true : false;
  const tel_ok = (tel_flag && tel.value.trim()) ? true : false;
  const email_ok = (email_flag && email.value.trim()) ? true : false;
  const pass_ok = (pass_flag && pass.value.trim()) ? true : false;

  if (nombre_ok && dni_ok && tel_ok && email_ok && pass_ok) {
    return confirm("Confirmar");
  } */
  validarNombre(nombre);
  validarApellido(apellido);
  validarDni(dni);
  validarTelefono(tel);
  validarEmail(email);
  validarPass(pass);

  if(nombre_flag && apellido_flag && dni_flag && tel_flag && email_flag && pass_flag) {
    return confirm("Confirmar");
  }

  alert("Revisa los campos");
  return false;
}
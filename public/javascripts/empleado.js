// FLAGS

let nombre_flag = false;
let apellido_flag = false;
let dni_flag = false;
let tel_flag = false;

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

//const apellido_exp = new RegExp(/^[a-zA-ZÀ-ÿ]+([\s][a-zA-ZÀ-ÿ]+)*$/, 'g');
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
  validarDni(e.target);
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

// VALIDAR FORM

function validar() {

  validarNombre(nombre);
  validarApellido(apellido);
  validarDni(dni);
  validarTelefono(tel);

  if (nombre_flag && apellido_flag && tel_flag && dni_flag) {
    return confirm("Confirmar");
  }

  alert("Revisa los campos");
  return false;
}
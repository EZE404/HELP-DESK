let pass_flag = false;
let pass_flag2 = false;

// PASS

//const pass_exr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/g
const pass_test = document.getElementById('testPass');
const pass = document.getElementById("pass");

function validarPass(campo, aviso) {
  let input = campo.value.trim();
  let inputSize = input.length;

  if ((inputSize > 64 || inputSize < 8) && input) {
    aviso.innerHTML = "<mark>La contraseña debe tener entre 8 y 64 caracteres</mark>"
    return false;
  } else {
    aviso.innerHTML = ""
    return true;
  }
}

pass.addEventListener('input', (e) => {
  validarPass(e.target, pass_test);
})

// PASS2

//const pass_exr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/g
const pass_test2 = document.getElementById('testPass2');
const pass2 = document.getElementById("pass2");

pass2.addEventListener('input', (e) => {
  validarPass(e.target, pass_test2);
})

function validar() {

  pass_flag = validarPass(pass, pass_test)
  pass_flag2 = validarPass(pass2, pass_test2)

  if (pass_flag && pass_flag2) {
    return confirm("Confirmar");
  }

  alert("Revisa los campos");
  return false;
}
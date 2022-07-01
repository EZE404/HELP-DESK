let pass_flag = false;
let pass2_flag = false;
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

// PASS2

//const pass_exr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/g
const pass_test2 = document.getElementById('testPass2');
const pass2 = document.getElementById("pass2");

pass2.addEventListener('input', (e) => {
  let input = e.target.value.trim();
  let inputSize = e.target.value.trim().length;

  if ((inputSize > 64 || inputSize < 8) && input) {
    pass_test2.innerHTML = "<mark>La contraseña debe tener entre 8 y 64 caracteres</mark>"
    pass_flag2 = false;
  } else {
    pass_test2.innerHTML = ""
    pass_flag2 = true
  }
})
function validar() {
  const pass_ok = (pass_flag && pass.value.trim()) ? true : false;
  const pass2_ok = (pass_flag2 && pass2.value.trim()) ? true : false;
  if (pass2_ok && pass_ok) {
    return confirm("Confirmar");
  }
  alert("Revisa los campos");
  return false;
}
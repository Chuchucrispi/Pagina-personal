/* =========================================================
   script.js — se carga en las 5 páginas.
   1. Menú móvil   2. Año del pie de página   3. Formulario de contacto
   Cada bloque comprueba que sus elementos existan, porque no todas
   las páginas los contienen (el formulario solo está en contacto.html).
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Menú móvil ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var abierto = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }

  /* ---------- 2. Año actual en el pie ---------- */
  var anio = document.getElementById('year');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- 3. Formulario de contacto ---------- */
  var form = document.getElementById('contactForm');
  if (!form) return; // en las demás páginas no hay formulario

  var estado = document.getElementById('estado');
  var boton = document.getElementById('enviar');
  var mensaje = document.getElementById('mensaje');
  var contador = document.getElementById('contador');

  var reglas = {
    nombre: function (v) { return v.trim().length >= 3; },
    correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
    asunto: function (v) { return v !== ''; },
    mensaje: function (v) { return v.trim().length >= 10; }
  };

  function validar(id) {
    var campo = document.getElementById(id);
    var valido = reglas[id](campo.value);
    campo.closest('.field').classList.toggle('is-invalid', !valido);
    return valido;
  }

  Object.keys(reglas).forEach(function (id) {
    var campo = document.getElementById(id);
    campo.addEventListener('blur', function () { validar(id); });
    campo.addEventListener('change', function () { validar(id); });
  });

  // Contador de caracteres del mensaje
  mensaje.addEventListener('input', function () {
    contador.textContent = mensaje.value.length + ' / ' + mensaje.maxLength;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var todoValido = true;
    Object.keys(reglas).forEach(function (id) {
      if (!validar(id)) todoValido = false;
    });

    if (!todoValido) {
      estado.textContent = 'Revisa los campos marcados.';
      estado.className = 'status fail';
      return;
    }

    // Simulación de envío por POST (no hay servidor real)
    var datos = {
      nombre: document.getElementById('nombre').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      asunto: document.getElementById('asunto').value,
      mensaje: mensaje.value.trim()
    };
    console.log('Simulación POST /api/contacto ->', datos);

    boton.disabled = true;
    boton.textContent = 'Enviando...';

    setTimeout(function () {
      estado.textContent = '¡Mensaje enviado! Te responderé pronto.';
      estado.className = 'status ok';
      boton.disabled = false;
      boton.textContent = 'Enviar mensaje';
      form.reset();
      contador.textContent = '0 / ' + mensaje.maxLength;
    }, 800);
  });
});

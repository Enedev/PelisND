"use strict";
// Obtener referencia a los elementos
const loader = document.getElementById('loader');
const content = document.getElementById('content');
// Mostrar pantalla de carga
loader.style.display = 'block';
// Ocultar resto del contenido
content.style.display = 'none';
// Esperar 1 segundo
setTimeout(() => {
    // Ocultar pantalla de carga
    loader.style.display = 'none';
    // Mostrar resto del contenido
    content.style.display = 'block';
}, 2000);

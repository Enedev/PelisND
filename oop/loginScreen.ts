// Obtener referencia a los elementos
const loader = document.getElementById('loader') as HTMLElement;
const content = document.getElementById('content') as HTMLElement;

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

## Instrucciones de uso
Para poder correr el programa necesita:
- abrir la terminar y poner el comando `git clone https://github.com/NightSS-01/Mascotas_Perdidas.git`
- dar segundo click en la carpeta abierta de Mascotas_Perdidas y ejecutar la terminal, luego escribir en la terminar `code .`
#### Abrir terminal de vscode en bash y poner los siguientes comandos
- npm install (ya que en el repositorio no se sube node_modules)
- npm install bootstrap
- npm install axios
- npm install react-router-dom
- npm run dev (para correr la pagina en modo local) y darle **ctrl + click** al link que te sale resaltado

## IAs Utilizadas (Claude, Gemini y GitHub Copilot)

Para el desarrollo de este proyecto se contó con el apoyo de distintas herramientas de Inteligencia Artificial como asistentes durante el proceso de programación, arquitectura y diseño. Las IAs actuaron únicamente como asistentes de sugerencia y consultores técnicos. Cada propuesta fue evaluada, entendida y adaptada al código base original antes de incorporarla.

### 1. Claude (Anthropic)
Claude se utilizó principalmente para el diseño visual de la interfaz, la estructuración modular de componentes y la resolución de advertencias además de aplicar buenas prácticas en React.

#### Diseño de interfaz
Se utilizó para diseñar visualmente las vistas de listar, crear y ver detalle de mascotas, apoyándonos en la librería **Bootstrap**. A partir de imágenes de referencia (como formularios de reporte de mascotas perdidas reales) y descripciones del estilo buscado, propuso:
- Estructuras de layout responsivas con clases de Bootstrap (grid `row`/`col`, `card`, `form-control`, `form-select`, etc.).
- Elementos decorativos e interactivos, como la zona de carga de imagen tipo *dropzone* (clickeable y con vista previa) y el modal de CrearMascota con fondo semi-transparente.

#### Lógica y buenas prácticas
- **Estructura modular:** Ayudó a estructurar el código y dividir la lógica en componentes reutilizables; por ejemplo, separar el formulario de creación (`MascotasForm`) del listado (`MascotasList`), y luego convertir la página de creación (`CrearMascotas`) en un modal en vez de una ruta aparte, coordinando el paso de props (`onClose`, `onCreated`) entre componentes.
- **Manejo de errores:** Apoyó en la implementación del manejo de errores diferenciando distintos códigos de estado HTTP (400, 401, 403, 404, 500+), mostrando mensajes claros y específicos al usuario en vez de errores técnicos crudos.
- **Corrección de advertencias de ESLint y React Hooks:**
  - Importación faltante de `useRef` para controlar el input de archivo oculto.
  - Limpieza de variables y props declaradas pero no usadas (como la prop `onAdd` en `MascotasList` o la variable `mensaje`).
  - Resolución del warning de *"llamado a setState dentro de un efecto"* (`react-hooks` / renders en cascada): se resolvió separando, en los componentes que hacían *fetch* de datos al montar (`ListarMascotas`, `MascotasForm`, `MascotasDetail`), la función de carga inicial declarada dentro del propio `useEffect` con una bandera de cancelación (`ignore`), dejando una función reutilizable para refrescar datos tras acciones del usuario (crear, actualizar, comentar, eliminar).
- **Consistencia:** Ayudó a mantener el proyecto ordenado, sugiriendo cómo conservar la lógica y el estilo coherentes entre componentes a medida que el código creció.

---

### 2. Gemini (Google)
Gemini funcionó como consultor técnico y arquitecto de software enfocado en la reestructuración y ampliación del componente `MascotasDetail.jsx` y la creación de la página `MascotaDetalles.jsx`.

- **Arquitectura y Estructuración por Módulos:** Ayudó a definir la disposición visual de la vista de detalles, sugiriendo una distribución en dos columnas para separar la imagen principal de la ficha descriptiva de la mascota.
- **Componentes de Interfaz y UX:** Propuso elementos clave como la tarjeta de administración para actualizar el estado (`PATCH`) mediante selects estilizados, los botones de eliminación (`DELETE`) con diálogos de confirmación, y un área dedicada para la interacción con comentarios.
- **Manejo de Errores y Validaciones:** Brindó los patrones para capturar códigos de estado HTTP específicos (404 para recursos inexistentes y 400 para errores de validación), permitiendo transformar respuestas técnicas de la API en alertas visuales amigables para el usuario.

---

### 3. GitHub Copilot
GitHub Copilot actuó como asistente de programación en tiempo real integrado directamente en el editor (Visual Studio Code), enfocado en la optimización y escritura fluida de código.

- **Generación y Limpieza de Código:** Asistió en la redacción fluida de las funciones de comunicación con la API mediante Axios (`mascotasApi`), asegurando la correcta manipulación de promesas dentro de bloques `try...catch...finally`.
- **Prevención de Errores de Sintaxis:** Permitió detectar al instante inconsistencias en el nombrado de estados de React, importaciones faltantes y tipos de datos en los parámetros de los eventos.
- **Estructuración de `MascotaDetalles.jsx`:** Desempeñó un papel fundamental en la creación del contenedor general de la vista, acelerando el autocompletado del maquetado en Bootstrap y la vinculación de props entre el componente padre y los subcomponentes.

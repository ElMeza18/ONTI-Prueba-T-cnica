## ONTI - Prueba técnica

## Organización

Está organizado como un proyecto Vite + React, organizado de manera independiente los recursos de lógica, estilos, assets y documentación.
- Código principal
    src: carpeta principal de la app.
    main.jsx: punto de entrada de React.
    App.jsx: lógica principal de la UI, estados, notas, búsquedas, recordatorios y CRUD.
    App.css: estilos visuales, glassmorphism, responsive y layout.
    index.css: estilos base globales.
    storage.js: manejo de persistencia con localStorage.
    storage.test.js: pruebas de almacenamiento.
- Configuración y dependencias
    package.json: scripts, dependencias y configuración del proyecto.
    vite.config.js: configuración de Vite.
    index.html: plantilla HTML base.
    README.md: documentación general del proyecto.
- Recursos visuales y diseño
    assets: fuentes e iconos usados por la app.
    public: archivos públicos como favicon y SVG base.
    references: capturas de referencia visual y pantallas del diseño/Figma.
    documentación: documentos y prompts de trabajo, por ejemplo prompts.md.
- Instrucciones y despliegue
    .github: contiene las instrucciones del proyecto y la configuración de despliegue.
    deploy.yml: workflow para publicar en GitHub Pages.
    Archivos como Instrucciones de proyecto.md y otros .instructions.md sirven como guía para las funcionalidades.

## Cómo correrlo

Para poder correr la app, basta con entrar al siguiente link:
https://elmeza18.github.io/ONTI-Prueba-T-cnica/

## Decisiones clave de diseño y código

- Se buscó un diseño sin elementos visuales innecesarios, botones claros y puntuales. 
- La visualización de las notas aparecen como un elemento que se combina con el fondo y la forma; sin necesidad de desplegar menús. Siempre dispoibles.
- Para evitar re trabajos o conflictos en código, las notas se crean desde un modal que aparece en la misma pantalla del home.
- Se buscó mantener una sola responsabilidad por archivo:
    El almacenamiento no mezcla lógica visual,
    El CSS no define la lógica,
    La app central no hace tareas de “infraestructura” ajenas a la UI.
- Evité datos dummy permanentes:
    La app está pensada para funcionar como CRUD real con almacenamiento local, no como una maqueta con contenido fijo.
- Mantuve la documentación y las instrucciones en .github para que el contexto no se pierda.

## Qué quedó fuera

- Dejamos fuera el tema oscuro, ya que el background se pensó con una mezcla de colores saturados combinados con partes oscuras. Los componentes los trabajamos bajo la linea del glassmorph y no fue necesario crear una segunda versión con otro tema.
- Las notificaciones se manejaron como "Notificaciones Pull" y no "Push"
- Tratamos de que las animaciones fueran sutiles para que no interfieran o compitan con la simplicidad de la app.

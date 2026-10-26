# Prompts del proyecto

Para evitar el uso excesivo de tokens, errores y retrabajos, los prompts fueron usados para dar inicio a etapas de desarrollo especificas, comenzando por pedir a la IA leer la documentación, instrucciones, funcionalidades y entender el flujo. 

Se usó la IA Copilot

## Historial

- [ ] Prompt 1
    - Fecha: 23/10/2026
    - Objetivo: Configurar la estructura del proyecto
    - Prompt: Crea un proyecto React usando la última versión estable y usando vite
    - Resultado esperado: Copilot crearía las carpetas y archivos necesarios para comenzar un proyecto React.
    - Observaciones: Todo en orden

- [ ] Prompt 2:
    - Fecha: 23/10/2026
    - Objetivo: Crear el espacio especifico donde VSC puediera leer la documentación, instrucciones, funcionalidades y acceder a diseños de Figma
    - Prompt: Antes de empezar, crea una carpeta .github para poder agregar un archivo copilot-instructions.m
    - Resultado esperado: Espacio creado apto para conectar, posteriormente, con Github
    - Observaciones: Todo en orden

- [ ] Prompt 3:
    - Fecha: 23/10/2026
    - Objetivo: Tener un espacio especifico para las referencias de diseño y un espacio para cargar material gráfico específico. 
    - Prompt: Crea una carpeta donde te pueda cargar pantallas de Figma para que las uses como referencias. Adicionalmente, crea una carpeta donde te pueda dejar las imagenes de los iconos necesarios
    - Resultado esperado: Espacio creado apto para obtener referencias visuales
    - Observaciones: Todo en orden

- [ ] Prompt 4:
    - Fecha: 23/10/2026
    - Objetivo: Rectificar que la IA entiende lo que pido, funcionalidades, estilos, etc.
    - Prompt: Vamos a empezar. Primer paso, lee los documentes "Instruciones de proyecto.md" y "Home.instructions.md". Dime si queda claro y si puedes acceder al proyecto de Figma
    - Resultado esperado: Los documentos pueden leerse y entenderse
    - Observaciones: Todo en orden

- [ ] Prompt 5:
    - Fecha: 23/10/2026
    - Objetivo: Comenzar el desarrollo del proyecto con un primer Sprint, trabajamos de inicio una pantalla de Home
    - Prompt: Vamos a iniciar el proyecto con esta vista Home
    - Observaciones: Copilot ejecutó las instrucciones y desarrollo un primer Home apegado a los diseños. Se importaron tipografías faltantes.
     
- [ ] Prompt 6:
    - Fecha: 23/10/2026
    - Objetivo: Importar tipografías para el resto del proyecto
    - Prompt: Comprueba de nuevo, si ya las tienes disponibles; el siguiente paso es cambiar la tipografia y ajustar los tamaños de los textos.
    - Observaciones: Las tipografías fueron actualizadas correctamente

- [ ] Prompt 7:
    - Fecha: 23/10/2026
    - Objetivo: Mantener la consistencia con los componentes
    - Prompt: Crea una carpeta para componentes, acomoda toda esta página en componentes reutilizables
    - Observaciones:
     
- [ ] Prompt 8:
    - Fecha: 23/10/2026
    - Objetivo: Implementar funciones a los componentes.
    - Prompt: Continuamos con la lógica de interacción del botón de crear nota y buscar. Revisa "Funcionalidadeshome.instructions.md"
    - Observaciones: Todo en orden
     
- [ ] Prompt 9:
    - Fecha: 23/10/2026
    - Objetivo: Corregir un error en la interacción con el botón buscar.
    - Prompt: Vuelve a revisar el archivo "Funcionalidadeshome.instructions.md" y revisa el link de referencia para el botón buscar. Adicionalmente, revisa la referencia Home Desplegado.png que se encuentra en references/screenshots. Esto con la finalidad de entender como deberia comportarse el componente
    - Observaciones: Una corrección rápida para una funcion que no se ejecutó correctamente.

- [ ] Prompt 10:
    - Fecha: 23/10/2026
    - Objetivo: Comenzar el desarrollo de un segundo Sprint de trabajo, implementar la funcion de crear una nota
    - Prompt: Acabo de agregar un archivo llamado "Crearnota.instructions.md" con todas las especificaciones para la creación de notas. Revisalos y dime si entiendes las instrucciones y si puedes acceder a los links.
    - Observaciones: Todo en orden
     
- [ ] Prompt 11:
    - Fecha: 23/10/2026
    - Objetivo: Comenzar el desarrollo de un tercer Sprint de trabajo, implementar la funcion de notificaciones
    - Prompt: Vamos con la siguiente funcionalidad, notificaciones. Acabo de crear el archivo "Notificaciones.instructions.md", revisalo y dime si entiendes lo que se pide. Agregué referencias visuales en la carpeta references/screenshots y los iconos necesarios.
    - Observaciones: Todo en orden.
     
- [ ] Prompt 12:
    - Fecha: 23/10/2026
    - Objetivo: Corregir un error en el funcionamiento de las notificaciones
    - Prompt: Actualmente esta mostrando el "próximo recordatorio" y "sucediendo ahora" sin importar que no sea el horario. Recuerda que "Próximo recordatorio" SOLO manda notificacion cuando estes a 10 minutos de la hora establecida en la nota. La notificación "Sucediendo ahora" SOLO manda notificación cuando ya llegó la hora y fecha indicada en la nota.
    - Observaciones: El error se corrigió sin necesidad de entrar a código personalmente

- [ ] Prompt 13:
    - Fecha: 24/10/2026
    - Objetivo: Comenzar el desarrollo de un cuarto Sprint de trabajo, implementar la funcion de ver notas.
    - Prompt: El siguiente paso es poder ver las notas creadas anteriormente. Te deje instrucciones en el archivo "Vernotas.instructions.md", revisalo y confirma que entendiste.
    - Observaciones: Todo en orden
     
- [ ] Prompt 14:
    - Fecha: 24/10/2026
    - Objetivo: Comenzar el desarrollo de un quinto Sprint de trabajo, implementar la funcion de eliminar nota.
    - Prompt: El siguiente paso es generar la función de eliminar nota. Acabo de dejarte un archivo llamado "Eliminarnota.instructions.md". Revisalo y confirmame si entiendes todo.
    - Observaciones: Todo en orden

- [ ] Prompt 15:
    - Fecha: 24/10/2026
    - Objetivo: Comenzar el desarrollo de un sexto Sprint de trabajo, ordenar notas creadas.
    - Prompt: Nuestro siguiente paso es acomodar las notas. Te deje un archivo llamado Acomodovisual.instructions.md; revisalo y confirmame si entiendes todos. Si lo entiendes, implementamos
    - Observaciones: Copilot mostró las notas creadas de forma erronea y se deformo el layout. En este punto, la IA no pudo arreglar o revertir los cambios así que tocó corregir estos errores de manera manual.

- [ ] Prompt 15:
    - Fecha: 24/10/2026
    - Objetivo: Limpiar la información dummy y preparar la implementación en Github
    - Prompt: Remueve toda la informacion dummy, configura el código para que funcione como un CRUD con local storage
    - Observaciones: Todo en orden.

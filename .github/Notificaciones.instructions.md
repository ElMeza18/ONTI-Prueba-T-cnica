---
description: 'Funcionamiento de las notificaciones'
---

## Acceso al módulo o pantalla

Desde el Home, en la esquina superior izquierda, existe un botón que usa el archivo "notificacion" o "notificacionweb". Este componente nos dirá cuando exista un recordatorio activo. 

## Elementos y funcionalidades

- Si no existen notificaciones, el componente se mantendrá en el estado actual que definiremos como "Default"
- Si un usuario crea una nota y, a esta nota le marca el recordatorio, la aplicacion nos avisara cuando el día y la hora exacta haya llegado. 
- Cuando tengamos una notificación sin leer, el icono debera cambiar y se estará usando el icono llamado "Notificacion 2" alojado en la carpeta assets/icons
- Las notificaciones se pueden acumular pero se puede borrar haciendo

## Tipo de notificaciones

Existen 3 tipos de notificaciones

- Próximo recordatorio: Cuando un usuario guarde una nota con recordatorio, la aplicación debera mandar una notificacion de próximo recordatorio 10 minutos antes de la hora y fecha guardada.
- Recordatorio sucediendo: Cuando un usuario guarde una nota con recordatorio, la aplicación deberá mandar una notificación cuando la hora y fecha hayan llegado.

## Formato de notificaciones

- Al hacer clic en el icono de notificaciones, la aplicación desplegara un componente donde se verán todas las notificaciones que están sucediento, las próximas a suceder y las pasadas.
- Las notificaciones se muestran de la más actual a la mas vieja
- Para quitar notificaciones, basta con hacer clic en el botón borrar que se muestra con un icono de un bote de basura, referenciado con la imagen llamada "Eliminar" ubicada en assets/icons

Link referencia: https://www.figma.com/design/rqQGM4ZUGicM2zzffpQbUv/ONTI?node-id=150-2261&t=httLsvuE9WxN8BUs-1

Link referencia: https://www.figma.com/design/rqQGM4ZUGicM2zzffpQbUv/ONTI?node-id=150-2326&t=httLsvuE9WxN8BUs-1
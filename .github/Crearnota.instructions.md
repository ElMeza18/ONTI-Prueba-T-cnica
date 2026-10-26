---
description: 'Instrucciones para crear notas'
---

## Acceso al módulo o pantalla

Inmediatamente después de hacer clic en el botón de crear nota, se desplegará un modal con estilo glassmorph donde el usuario podrá capturar sus notas y agregar un recordatorio.

## Elementos y funcionalidades

- Título de nota: Este campo puede completarse usando letras, números y signos. Deberá tener una longuitud máxima de 40 caracteres.
- Cuerpo de nota: Este campo puede completarse usando letras, números y signos. Deberá tener una longuitud máxima de 120 caracteres.
- Recordatorio: Checkmark que aparece deshabilitado por default y que, al hacer clic sobre el, se desplegarán los campos de "Fecha de recordatorio" y "Hora del recordatorio"
- Fecha de recordatorio: Cuando se despliega este campo, el usuario puede agregar una fecha en la cuál, la nota, generará una notificación de recordatorio. El formato que sigue esta fecha es día/mes/año, mostrado de la siguiente forma: dd/mm/aaaa
- Hora de recordatorio: Cuando se despliega este campo, el usuario puede agregar una hora en la cuál, la nota, generará una notificación de recordatorio. El formato que sigue esta hora es hora/minuto/p.m. o a.m., en un formato de 12 horas.
- Fecha de recordatorio y hora de recordatorio generan una sola notificación; a la hora especifica del día, mes y año especifico marcado en la nota.
- Se necesitan ambos rangos para poder guardar la nota si se tiene marcado el checkmark. Hasta que no se completen estos campos o el usuario quite el checkmark, el botón de crear nota permanecerá deshabilitado.
- Si el usuario escribe el titulo, el cuerpo de la nota o si puso recordatorio pero no dio clic en el botón crear nota y solo cerró el modal, la aplicación marca esta nota como Borrador y se muestra en la pantalla principal. Al guardarse, la aplicación muestra un flash message con el mensaje "Borrador creado"
- Al crear una nota con éxtio, la nota se muestra en la pantalla principal y se muestra un pequeño flash message con el mensaje "Nota guardada con éxito"

Link referencia: https://www.figma.com/design/rqQGM4ZUGicM2zzffpQbUv/ONTI?node-id=141-2135&t=httLsvuE9WxN8BUs-1

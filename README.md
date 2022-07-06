## HELPDESK

> La rama 'master' es solamente la plantilla inicial. El trabajo en sí, está en la rama 'ezequiel'.

1. git clone https://github.com/EZE404/help_desk.git
2. cd help_desk && npm install
3. npm i -g sequelize-cli
4. npx sequelize-cli db:create
5. npx sequelize-cli db:migrate
6. npx sequelize-cli db:seed:all
7. npm run dev
8. http://localhost:3000
9. LOG IN:

| rol | email | pass |
| ------ | ------ | ------ |
| Cliente | eze@correo.com | Ezequiel99
| Cliente | sosa@correo.com | Ezequiel99
| Admin | admin@correo.com | Ezequiel99
| Calidad | mario@correo.com | Ezequiel99
| HelpDesk | genaro@correo.com | Ezequiel99

***
### Esquemas DB (Sequelize Generated)
- Clientes=(`id`, nombre, apellido, email, pass, telefono, dni, fecha_alta, verificado, uuid)
- Empleados=(`id`, nombre, apellido, email, pass, telefono, dni, fecha_alta, verificado, **_AreaId_**)
- Areas=(`id`, nombre, activa, editable)
- Solicituds=(`id`, tipo, descripcion, uuid, fecha_alta, prioridad, estado, **_ClienteId_**, **_AreaId_**)
- Historials=(`id`, detalle, fecha, derivado, **_EmpleadoId_**, **_SolicitudId_**)
- Notificacions=(`id`, mensaje, fecha, vista, **_SolicitudId_**)
'use strict';

const event_name = "historials_days"
const days_event = `
CREATE EVENT ${event_name}
	ON SCHEDULE
		EVERY 1 MINUTE STARTS '2021-08-02 04:02:43'
	ON COMPLETION PRESERVE
	ENABLE
	COMMENT 'solicitud con 15 días sin solucionarse'
	DO BEGIN
  DECLARE hay TINYINT DEFAULT TRUE;
  DECLARE ids INTEGER;
  DECLARE fecha_cur DATETIME;
  DECLARE msg VARCHAR(1000);
  DECLARE existe INT DEFAULT 0;

  DECLARE resultado CURSOR FOR
  SELECT h.SolicitudId AS ids, fecha_max AS fecha, detalle FROM (
    SELECT SolicitudId, min(fecha) as fecha_min
    FROM historials
    GROUP BY SolicitudId 
    ) a NATURAL JOIN ( 
    SELECT SolicitudId, max(fecha) as fecha_max
    FROM historials
    GROUP BY SolicitudId
    ) b INNER JOIN historials h
    ON b.SolicitudId = h.SolicitudId
    INNER JOIN solicituds std ON b.SolicitudId = std.id
    AND b.fecha_max = h.fecha
  WHERE TIMESTAMPDIFF(MINUTE, fecha_min, CURRENT_TIME()) > 7*24*60
  AND estado != 'Solucionado';
      
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SELECT 1+1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET hay = FALSE;
  
  OPEN resultado;
  bucle: LOOP
    IF !hay THEN
      LEAVE bucle;
    END IF;
    FETCH resultado INTO ids, fecha_cur, msg;
    SELECT COUNT(*) INTO existe FROM notificacions
    WHERE SolicitudId = ids AND fecha = fecha_cur AND tipo = "15 días sin resolver";
    IF (existe = 0) THEN
        INSERT INTO notificacions (SolicitudId, fecha, mensaje, tipo) VALUES(ids, fecha_cur, msg, "15 días sin resolver");
    END IF;
  END LOOP;
  CLOSE resultado;
END
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(days_event);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP EVENT IF EXISTS ${event_name}`);
  }
};

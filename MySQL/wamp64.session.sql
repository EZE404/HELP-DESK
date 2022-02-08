/* SELECT h.id
FROM historials h
  natural JOIN (
    SELECT solicitudid,
      MAX(fecha) AS fecha
    FROM historials
    GROUP BY solicitudid
  ) a
WHERE h.areaid = 4
  AND h.estado != 'Solucionado' */

SELECT h.SolicitudId, h.detalle, h.fecha, b.cantidad
FROM historials h NATURAL JOIN
  (SELECT SolicitudId, max(fecha) as fecha
  FROM historials
  GROUP BY SolicitudId) a
NATURAL JOIN
  (SELECT SolicitudId, count(*) as cantidad
  FROM historials
  WHERE estado = 'Derivado'
  GROUP BY SolicitudId) b

/* SELECT count(*)
FROM notificacions
WHERE SolicitudId = 1
AND fecha = (SELECT MAX(fecha) FROM historials WHERE SolicitudId = 1) */

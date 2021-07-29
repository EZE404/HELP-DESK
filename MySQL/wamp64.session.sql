select h.* from historials h natural join (select
  SolicitudId,
  max(fecha) as fecha
from historials
where SolicitudId not in (
    SELECT distinct SolicitudId
    FROM historials
    WHERE estado = 'Solucionado'
  )
and AreaId = 4
group by SolicitudId) a
select e.event_id, COUNT(a.admin_id) from events as e
left join event_admins as a on (e.event_id = a.event_id)
group by e.event_id;

SELECT
    events.event_id,
    event_date as Date,
    event_time as Time,
    event_image as Image,
    event_address as Address,
    event_description as Description,
    (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status="going") as Going,
    (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status="unsure") as Unsure,
    (SELECT COUNT(event_invitees.invitee_id) FROM event_invitees WHERE events.event_id = event_invitees.event_id AND attending_status="not going") as Not_Going
FROM
    events;
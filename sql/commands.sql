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

UPDATE users SET password_hash = SHA2('curryRSVPWDC',224) WHERE user_name = 'Neil';
UPDATE users SET password_hash = SHA2('paleRSVPWDC',224) WHERE user_name = 'Harrison';
UPDATE users SET password_hash = SHA2('hummus22RSVPWDC',224) WHERE user_name = 'Humshikan';
UPDATE users SET password_hash = SHA2('besttrimRSVPWDC',224) WHERE user_name = 'Seamus';
UPDATE users SET password_hash = SHA2('fooey2002RSVPWDC',224) WHERE user_name = 'Thomas';
UPDATE users SET password_hash = SHA2('adminRSVPWDC',224) WHERE user_name = 'will';
UPDATE users SET password_hash = SHA2('testRSVPWDC',224) WHERE user_name = '<b>test</b>';
UPDATE users SET password_hash = SHA2('testRSVPWDC',224) WHERE user_name = "<img src='test' onerror='alert(1)'>";
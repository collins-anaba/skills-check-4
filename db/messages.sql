SELECT p.*, u.username FROM Posts p
JOIN Users u
on u.id = p.creator_id



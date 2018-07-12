WITH rows AS
    (INSERT INTO items (title, description, imageurl, ownerid) VALUES ('this is a title', 'my description', 'pwdwjuixsduywn', 2) RETURNING id) 
INSERT INTO itemtags (itemid, tagid) VALUES ((SELECT id as itemid from rows), 7);
		
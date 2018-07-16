SELECT t.id, t.title 
FROM itemtags item
INNER JOIN tags t
ON t.id = item.tagid
WHERE itemid = 4




SELECT AVG(count)
FROM (
	SELECT COUNT(tagid), itemid 
	FROM itemtags
	GROUP BY itemid
	) AS count;



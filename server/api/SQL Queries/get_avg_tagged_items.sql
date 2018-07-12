SELECT AVG(count) FROM (
	SELECT COUNT(tagid), id FROM (
		SELECT item.id, tag.tagid
		FROM items item
		LEFT OUTER JOIN itemtags tag
		ON item.id = tag.itemid
		) as foo
		GROUP BY id
		ORDER BY id
		) as bar;
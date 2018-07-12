SELECT ( 1.0 *
(SELECT COUNT(tagid) FROM itemtags)/
(SELECT COUNT(id) FROM items))as count;


Devin is charge!!
Build a CRUD functional API

Here are the specs, can only use these two routes:
/bucket
/bucket/:id

CRUD functionality
Create - POST
Read - GET
Update - PUT
Delete - DELETE

endpoint = baseUrl + route

READ
1) use /bucket and GET method
2) send back as JSON
3) How much data to send back - everything - as an array
4) What specific data - whole object

CREATE
1) use POST and /bucket
2) send back JSON
3) We will send back an object
4) All properties of object as a receipt

DELETE
1) DELETE and /bucket/:id - need to specify which item to delete
2) send back JSON
3) send back an array - minus the deleted item
4) Sending back objects




curl -X PATCH http://localhost:9010/tasks/66c1b91ee26e609fa3926db9/finish -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmMxYjY0NWZlODQyYzliMjc2OWMwYzgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM5NzIzMzAsImV4cCI6MTcyNDA1ODczMH0.-N1ckTx0ACtzkyK4L-wi8yt-1Kh-q5HL3YBn1t6MYXQ" -H "Content-Type: application/json" -d '{"completionTime":4}' -v
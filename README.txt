To Run Database:
sql_start

Connect to Database (Query it in terminal):
mysql --host=127.0.0.1

Exit Database
exit

stop database
sql_stop

To backup database
mysqldump --host=127.0.0.1 --databases production > sqlcommands/backup.sql

To restore database backup
mysql --host=127.0.0.1 < sqlcommands/backup.sql

Github Routine

Checkout new branch
Git checkout -b "W-Example"
make your changes to files
IF YOU WANT, BACKUP THE DATABASE ONLY CHANGE backup.sql
at key points we may want to create more backups.
git add
git commit -m "message"
git push
git push -set--upstream origin
open github
open pull request

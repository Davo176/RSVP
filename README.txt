#### ReadMe ####
5 minute overview of the website can be viewed at:
    https://www.youtube.com/watch?v=z3SIrZBdOIE&ab_channel=WDCRSVP

Steps to get website running:
1. Install latest configuration files in codespace:
    rm -f ~/.bashrc ~/.bash_profile ~/.profile ~/.eslintrc
    curl -Lo ~/.bash_profile https://github.com/ian-knight-uofa/uofa-tools/releases/download/22.05.17/bashrc
    curl -Lo ~/.eslintrc https://github.com/ian-knight-uofa/uofa-tools/releases/download/22.05.17/eslintrc
    exit
2. Retrieve server files:
    (Make sure you're in a blank directory if havent setup before, or in same folder as last time)
    export GITHUB_TOKEN="your token"
    git clone https://github.com/RSVPWDC/RSVP.git (If havent setup before)
    git checkout master (If on another branch)
    git pull
3. Update node_modules folder:
    npm install
4. Start mysql server:
    sql_start (Start server)
    mysql --host=127.0.0.1 < sql/backup.sql (To restore database backup)
5. Start express server:
    npm start (Make sure port server is running on is set to public)
6. We recommend signing in with the following google account
    Email: rsvpwdc@gmail.com
    Password: IanKnight

Accounts within the website:
    Username: Bugs Password: admin1234
    Username: Daffy Password: admin1234
    Username: Harrison Password: admin1234
    Username: MeepMeep Password: admin1234
    Username: Neil Password: admin1234
    Username: Porky Password: admin1234
    Username: Seamus Password: admin1234
    Username: Speedy Password: admin1234
    Username: Will Password: admin1234

Google Login (Recommended):
    To use google login, you must be signed into an developer email:
        Email: rsvpwdc@gmail.com
        Password: IanKnight
    Once signed into the google account, you can access the website
    via google sign in

Steps to query database:
1. If database is not running start database
    sql_start (Start server)
    mysql --host=127.0.0.1 < sql/backup.sql (To restore database backup)
2. Connect to Database:
    mysql --host=127.0.0.1
3. Set mysql to use the production database
    use production
4. Run queries
####################

#### Old ReadMe ####
To Run Database:
sql_start

Connect to Database (Query it in terminal):
mysql --host=127.0.0.1

Exit Database
exit

stop database
sql_stop

To backup database
mysqldump --host=127.0.0.1 --databases production > sql/backup.sql

To restore database backup
mysql --host=127.0.0.1 < sql/backup.sql

Github Routine

When writing new code:
  Checkout new branch
  git checkout -b "W-Example"
    replace W with your first initial
  make your changes to files
  IF YOU WANT, BACKUP THE DATABASE ONLY CHANGE backup.sql
  at key points we may want to create more backups.
  git status
    to see which files you have made changes to
  git add
    add files you have made changes to
  git commit -m "message"
  git push
  git push -set--upstream origin
  open github
  open pull request

To update to newest code from master:
  git checkout master
  git pull



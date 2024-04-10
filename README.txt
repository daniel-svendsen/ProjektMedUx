Don´t forget to add org.json to Referenced Libraries if you run on VSCode

Compile:
javac -cp org.json.jar:winstone.jar:www/WEB-INF/classes src/www/WEB-INF/classes/*.java

Run Winstone:
java -jar winstone.jar --webroot=src/www/WEB-INF/resources --httpPort=8080
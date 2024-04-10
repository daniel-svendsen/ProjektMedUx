compilera:
javac -cp org.json.jar:winstone.jar:www/WEB-INF/classes src/www/WEB-INF/classes/*.java

köra winstone:
java -jar winstone.jar --webroot=src/www/WEB-INF/resources --httpPort=8080
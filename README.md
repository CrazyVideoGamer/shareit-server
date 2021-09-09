1. select file/folder to share
3. run express app with & to run as a background process. Make sure to print the PID. note that only one folder can be shared at a time
4. use port forwarding (ngrok, or my own server) to host file/folder on the web
5. Finallly, on a separate computer, run wget -r http://RANDOM_ID.some_site/, or wget http://RANDOM_ID.some_site/ to download the folder/file
var xhttp = new XMLHttpRequest();
xhttp.open("POST","http://localhost:3000/livros");
xhttp.setRequestHeader("Content-Type","application/json");
xhttp.send('{"teste": "1"}');
var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    path = require('path');

var server = http.createServer(function (req, res) {
    var filePath;

    if (req.url === '/') {
        // Default to index.html when the root is requested
        filePath = 'html/index.html';
    } else {
        // Map requested URL to the corresponding file in the "html" folder
        filePath = 'html' + req.url;
    }

    var fullPath = path.join(__dirname, filePath);

    // Check if the file exists
    fs.access(fullPath, fs.constants.F_OK, function(err) {
        if (!err) {
            // Read the file and serve its content
            fs.readFile(fullPath, function(err, data) {
                if (!err) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                } else {
                    // Error reading the file
                    res.writeHead(500);
                    res.end('Internal Server Error');
                }
            });
        } else {
            // File not found
            res.writeHead(404);
            res.end('Not Found');
        }
    });
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');

const express = require('express');
const path = require('path');
const app = express()

const port = process.env.PORT || 5000
    // app.get('*', (req, res) => {
    //     console.log(req.url);
    //     // console.log('f is req: index.html')
    // });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/index.html'));
    console.log('f is req: /')
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/index.html'));
    console.log('f is req: index.html')
});
app.get('/sw.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/sw.js'));
    console.log('f is req: index.html')
});

app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname + '/front/manifest.json'));
});

app.get('/static/*', (req, res, err) => {
    console.log('request for url :' + req.url)
    res.sendFile(path.join(__dirname + '/front' + req.url));

});

app.get('/PWA', (req, res) => {
    console.log('file is request is:/PWA-file/src/js/app.js');
    res.sendFile(path.join(__dirname + '/front/PWA-file/src/js/app.js'))

})
app.get('/sw.js', (req, res) => {
    console.log('file is request is:/PWA-file/src/js/sw.js');
    res.sendFile(path.join(__dirname + '/front/PWA-file/sw.js'))

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
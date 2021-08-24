module.exports = function (app, db) {
    app.post('/insertNote', (req, res) => {
    console.log("db:" + db) 
    console.log(req.body)    
    res.send('Hello')  
});};


    

var app = require('./express-config/custom-express')();

var porta = 3002;
app.listen(porta, function() {
    
    console.log(`servidor ouvindo na porta na porta: ${porta}`);
});
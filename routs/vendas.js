module.exports = (app) => {

    app.post('/venda', (req, res) => {

        var vendaRequest = {};
        vendaRequest = req.body;
        vendaRequest.data =  new Date();

        
        
        
        
        
        const query = app.models.albums.findOne({ _id: vendaRequest.itens[0].album })
        
        const data = query.exec().then((data)=>{
            
            vendaRequest.valor_total =  parseInt(data.preco) * parseInt(vendaRequest.itens[0].quantidade)
            
        }).then(()=>{

            app.models.vendas.create(vendaRequest, (err, venda) => {
                if (err) 
                    return res.status(500).json({mensagem: "Houve um problema para cadastrar o cachback", err });
                
                res.send(vendaRequest) 
            })
        })



    });
}

module.exports = function(app) {
    
    app.post('/cachback', (req, res) => {

        app.models.cachbacks.init().then(() => {
            
            app.models.cachbacks.create({
                genero: req.body.genero.toUpperCase(),
                dia_semana: req.body.dia_semana.toUpperCase(),
                porcentagem: req.body.porcentagem,
            }, (err, cachback) => {
                if (err) 
                   return res.status(500).json({ 
                       mensagem: "Houve um problema para cadastrar o cachback", err 
                   });

                res.json({ cachback });
            });
        });

    });

    app.get('/cachback/:id', (req, res) => {

        app.models.cachbacks.find({ _id: req.params.id }, (err, cachbacks) => {
          if (err) return res.status(500).json({ mensagem: 'Houve um problema ao buscar cachbacks', err});

          res.json({ cachbacks });
        })
    });

    app.get('/cachback', (req, res) => {

        app.models.cachbacks.find({ dia_semana: new RegExp(req.query.dia_semana, 'i'), genero: new RegExp(req.query.genero, 'i')}, (err, cachbacks) => {
          if (err) return res.status(500).json({ mensagem: 'Houve um problema ao buscar cachbacks', err});

          res.json({ cachbacks });
        })
    });

    app.put('/cachback/:id', (req, res) => {

        app.models.cachbacks.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: {genero: req.body.genero.toUpperCase(), dia_semana: req.body.dia_semana.toUpperCase(), porcentagem: req.body.porcentagem} }, 
            {runValidators: true, new: true}, (err, cachback) => {
            
            if (err) return res.status(500).json({ mensagem: 'Houve um problema ao atualizar a cachback', err });

            if (!cachback) return res.status(404).json({ mensagem: 'O cachback solicitado não foi encontrado'});

            res.json({ cachback });
        });
    });

    app.delete('/cachback/:id', (req, res) => {

        app.models.cachbacks.findOneAndDelete({ _id: req.params.id }, (err, cachback) => {
            if (err) return res.json({ mensagem: 'Houve um problema ao apagar cachback', err });

            if (!cachback) return res.status(404).json({ mensagem: 'O cachback solicitado não foi encontrada' });

            res.json({ cachback });
        });
    });
}
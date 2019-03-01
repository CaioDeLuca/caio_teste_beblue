module.exports = function(app) {
    
    app.get('/album-spotify', (req, res) => {

        let params = {
            q: req.query.nome, // required
            type: 'album', // optional for default 'artist,album,track'
            limit: 50 // optional for default 20
        }
        
        app.clientSpotfy.search(params)
        .then(data => {

                var response = [];
                data.albums.items.forEach(item => {
                    
                    let novo = {
                        "nome": item.name,
                        "id_album_spotify": item.id,
                        "url_spotify": item.external_urls.spotify,
                        "data_lancamento": item.release_date,
                        "qtd_musicas": item.total_tracks,
                        "preco": 50.00,
                        "ref_artistas": item.artists
                    };
                    response.push(novo);
                })
                res.status(200).json({ response });
        }).catch(err => {
            res.status(500).json({ mensagem: 'Houve um problema ao buscar albums, erro: '+err});
        })
    });
    
    app.get('/album-spotify/:id', (req, res) => {

        app.clientSpotfy.getAlbum(req.params.id, { tracks: false })
        .then(album => {
               res.status(200).json({album});
        }).catch(err => {
            res.status(500).json({ mensagem: 'Houve um problema ao buscar albums, erro retornado'+err});
        })
    });

    app.get('/albums', (req, res) => {

        var query   = {};
        var options = {
            sort:     { nome: 1 },
            lean:     true,
            limit:    req.query.limit ? parseInt(req.query.limit) : 1,
            page: parseInt(req.query.page)
        };

        console.log(options)
         
        app.models.albums.paginate(query, options).then((result) => {
            
            res.status(200).send(result);
        });
    });

    app.post('/albums/popular-base', (req, res) => {

        let params = {
            q: req.query.nome, // required
            type: 'album', // optional for default 'artist,album,track'
            limit: 50 // optional for default 20
        }
        Promise.all([       
        app.clientSpotfy.search(params).then(data => {
                
                data.albums.items.forEach(item => {
                
                    app.models.albums.create({

                        nome: item.name,
                        id_album_spotify: item.id,
                        url_spotify: item.external_urls.spotify,
                        data_lancamento: item.release_date,
                        qtd_musicas: item.total_tracks,
                        preco: 50.00,
                        ref_artistas: [item.artists]
                    }, (err, item) => {

                        if (err) 
                            return res.status(500).json({ 
                            mensagem: "Houve um problema para cadastrar o album", err });
                        
                    });
                });
        }).catch(err => {
            res.status(500).json({ mensagem: 'Houve um problema ao carregar buscar albums, erro: '+err});
        })
      ]).then((result) => {
        res.status(200).json({ "mensagem":"Base Carregada com sucesso." });
      }).catch(err => {
        res.status(500).json({ mensagem: 'Houve um problema ao carregar buscar albums, erro: '+err});
      })
    });
}

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
                        "ref_artistas": item.artists,
                        "imagens": item.images
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
}

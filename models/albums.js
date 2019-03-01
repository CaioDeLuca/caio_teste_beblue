var mongoosePaginate = require('mongoose-paginate-v2');
module.exports = (app) => {

    const Schema = app.database.mongoose.Schema;

    const albumSchema = new Schema({
        nome: {
            type: String,
            required: true            
        },
        id_album_spotify: {
            type: String,
            required: true            
        },
        url_spotify: {
            type: [String],
            required: true            
        },
        data_lancamento: {
            type: Date,
            required: true            
        },
        qtd_musicas: {
            type: Number,
            required: true            
        },
        preco: {
            type: String,
            required: true            
        },
        ref_artistas: {
            type: [String],
            required: true            
        }
    });

    albumSchema.plugin(mongoosePaginate);

    return app.database.mongoose.model('Albums', albumSchema);
}
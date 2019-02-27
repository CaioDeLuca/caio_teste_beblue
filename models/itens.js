module.exports = (app) => {

    const Schema = app.database.mongoose.Schema;
    const ItemSchema = new Schema({
        album: {
            type: Schema.Types.ObjectId,
            ref: 'Albums',
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            min: 1
        },
        valorUnitario: {
            type: Number,
            required: true
        },
        cachback: {
            type: Number,
            required: true
        }
    });

    return app.database.mongoose.model('Itens', ItemSchema);
}
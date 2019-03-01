module.exports = (app) => {

    const Schema = app.database.mongoose.Schema;

    const vendaSchema = new Schema({
        cpf_cliente: {
            type: String,
            required: true            
        },
        valor_total: {
            type: Number
        },
        data:  {
            type: Date,
	        default: Date.now
        },
        meioPagamento: {
            type: String,
            enum: ['Dinheiro', 'Conta', 'Boleto', 'Cartão']
        },
        total_cachback: Number,
        itens: {
            type: [app.database.mongoose.models.Itens.schema],
            required: true
        },
    });

    return app.database.mongoose.model('Vendas', vendaSchema);
}
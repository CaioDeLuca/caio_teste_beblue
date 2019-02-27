
module.exports = (app) => {

    const Schema = app.database.mongoose.Schema;
    const CashbackSchema = new Schema({
        //_id: app.database.mongoose.Schema.Types.ObjectId,
        genero: {
            type: String,
            required: true
        },
        dia_semana: {
            type: String,
            enum: ['DOMINGO','SEGUNDA','TERCA','QUARTA','QUINTA','SEXTA','SABADO'],
            required: true
        },
        porcentagem: {
            type: Number,
            required: true,
            validate: {
                validator: function(v) {
                  return/(?:\b|-)([1-9]{1,2}[0]?|100)\b/.test(v);
                },
                message: props => `The number ${props.value} is not between 0 and 100!`
            },
        }

    });
    
    CashbackSchema.index({ genero: 1, apeldia_semanaido: 1 }, { unique: true });
    
    return app.database.mongoose.model('Cachbacks', CashbackSchema);
}
module.exports = (app) => {

    const Schema = app.database.mongoose.Schema;

    const vendaSchema = new Schema({
        id_cliente: {
            type: String,
            required: true            
        },
        total: {
            type: Number,
            required: true
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

/**
 * [
        check('genero')
        .exists()
        .isLength({ min: 1, max: 10 })
        .withMessage('O campo é obrigatório, deve conter no mínimo 1 e no máximo 10 caracteres')

        ,check('dia_semana')
        .isIn(['domingo','segunda','terca','quarta','quinta','sexta','sabado'])
        .withMessage('O campo deve estar entre os ex. válidos: [domingo,segunda,terca,quarta,quinta,sexta,sabado]')

        ,check('porcentagem')
        .isFloat()
        .matches(/(?:\b|-)([1-9]{1,2}[0]?|100)\b/)
        .withMessage('O campo deve ser numérico e estar entre 0 e 100')
    ]
    , [

        check('genero').exists().isLength({ min: 1, max: 10 }).withMessage('O campo é obrigatório, deve conter no mínimo 1 e no máximo 10 caracteres')
        ,check('dia_semana').isIn(['domingo','segunda','terca','quarta','quinta','sexta','sabado']).withMessage('O campo deve estar entre os ex. válidos: [domingo,segunda,terca,quarta,quinta,sexta,sabado]')
        ,check('porcentagem').isFloat().matches(/(?:\b|-)([1-9]{1,2}[0]?|100)\b/).withMessage('O campo deve ser numérico e estar entre 0 e 100')
    ]
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { check, validationResult } = require('express-validator/check'); 
 * **/
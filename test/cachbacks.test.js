
describe('Tests para rotas de cachbaks', (done) => {

    describe('/POST cachback', () => {
        it('deve criar um cachback', () => {
           
            return request.post('/cachback')
            .send({ 
                genero: 'teste', 
                dia_semana: 'teste', 
                porcentagem: 10 })
            .set('Accept','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        });
    });

    describe('/GET cachback', () => {

        it('deve listar cachbacks', () => {

            return request.get('/cachback')
            .send()
            .set('Accept','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        });
    });

    describe('/DELETE cachback', () => {

        it('deve deletar e retornar a cachback deletado', (done) => {
            app.models.cachbacks.create({ 
                genero: 'testeDelete',
                dia_semana: 'testeDelete',
                porcentagem: 1}, (err, cachbacks) => {
                return request.del('/cachback/' + cachbacks._id)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
            });
        });             
    });

    describe('/PUT cachback', () => {

        it('deve alterar um cachback', (done) => {
            app.models.cachbacks.create({ 
                genero: 'testePut',
                dia_semana: 'testePut',
                porcentagem: 1}, (err, cachbacks) => {
                return request.put('/cachback/' + cachbacks._id)
                .send({ 
                    genero: 'teste', 
                    dia_semana: 'teste', 
                    porcentagem: 10 })
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
            });
        });             
    });

});

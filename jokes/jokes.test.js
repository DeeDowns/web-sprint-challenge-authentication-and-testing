const supertest = require('supertest')

const server = require('../api/server')
const db = require('../database/dbConfig')

describe('jokes-router', () => {
    describe('GET to /api/jokes', () => {
        it('should return http code 200 when user is authenticated and logged in', async () => {
            const login = await supertest(server)
            .post('/api/auth/login')
            .send({
                username: 'testUser1',
                password: 'test'
            })

            console.log(login.body)

            const res = await supertest(server)
            .get('/api/jokes')
            .set('Authorization', login.body.token)
            expect(res.status).toBe(200)
            
        })
        it('should return http code 401 when user is not authorized', () => {
            return supertest(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401)
            })
        })
    })
    
})
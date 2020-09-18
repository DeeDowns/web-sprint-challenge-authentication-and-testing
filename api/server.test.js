const supertest = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')


describe('server', () => {
    describe('GET to /', () => {
        it('should return http status code 200', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return an api property with valude uppppp', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.body.server).toBe('uppppp')
            })
        })
    })
    
})

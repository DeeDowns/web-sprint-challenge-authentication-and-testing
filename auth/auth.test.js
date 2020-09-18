const supertest = require('supertest')

const server = require('../api/server')
const db = require('../database/dbConfig')

describe('auth-router', () => {
    describe('post to /api/auth/register', () => {
        it('should return http status code 201 when users registers correctly', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'newUser', password: 'test' })
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return http status code 400 when user registers incorrectly', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
            }) 
        })
    })

    describe('post to /api/auth/login', () => {
        it('should return http status code 200 when users logins in correctly', () => {
            return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'user2', password: 'test' })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return http status code 500 when user enters wrong password', () => {
            return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'user2', password: '8890' })
            .then(res => {
                expect(res.status).toBe(500)
            })
        })
    })
    
})
const User = require('../models/user')
const AuthController = require('../controllers/auth')
const mongoose = require('mongoose');
jest.mock('../models/user.js')

describe('Auth Controller', () => {
    test('should throw an error with code 500 when database fails', async () => {
        User.findOne.mockImplementation(() => { throw new Error('Database error') })
        const req = {
            body: {
                email: 'test@test.com',
                password: 'dsijfgsdf'
            }
        }
        const result = await AuthController.login(req, {}, () => { })
        expect(result).toHaveProperty('statusCode', 500)
        User.findOne.mockRestore()
    })
    // test('Should send a response with a valid user status for an existing user', async () => {

    //     const req = {
    //         userId: '64f1024e02597be75b1eb22f'
    //     }
    //     const res = {
    //         statusCode: 500,
    //         userStatus: null,
    //         status: function (code) {
    //             this.statusCode = code
    //             return this
    //         },
    //         json: function (data) {
    //             this.userStatus = data.status
    //         }
    //     }
    //     await AuthController.getUserStatus(req, res, () => { })
    //     expect(res.statusCode).toBe(200)
    //     expect(res.userStatus).toBe('I am new!')
    // })
})
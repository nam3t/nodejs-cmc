import User from "../db/User";
import { expect } from "chai";

describe('User', () => {
    describe('add', () => {
        it('should update users list after add successfully', () => {
            const users = new User()
            const newUser = {
                email: 'newguy@cmc.com.vn',
                username: 'New Guy',
                hashedPassword: 'qwertyu'
            }
            users.add(newUser)
            expect(users.users[users.users.length-1].email).to.be.equal('newguy@cmc.com.vn')
            expect(users.users[users.users.length-1]).deep.equal(newUser)
        })
    })
})

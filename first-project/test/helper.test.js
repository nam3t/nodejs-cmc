import { validatePassword } from "../helper";
import { expect } from "chai";

describe('helper', () => {
    describe('validatePassword', () => {
        it('should return false if password length is less than 8 characters', () => {
            const password = '1234567';
            expect(validatePassword(password)).to.be.equal(false)
        })
        it('should return true if password length is more than 8 characters', () => {
            const password = '123456789';
            expect(validatePassword(password)).to.be.equal(true)
        })
        // it('', () => {
        //     // qwerty
        // })
    })
    
    // describe('validateEmail', () => {
    //     it('', () => {
    //         // qwerty
    //     })
    //     it('', () => {
    //         // qwerty
    //     })
    //     it('', () => {
    //         // qwerty
    //     })
    // })
})
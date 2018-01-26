class User {
    constructor() {
        this.users = [
            {
                email: 'nam@cmc.com.vn',
                username: 'namnh',
                hashedPassword: 'qwerty'
            }
        ]
    }

    add(user) {
        this.users.push(user)
        return this
    }

    list() {
        return this.users
    }

    remove(username) {
        this.users = this.users.filter(item => item.username !== username)
        return this
    }
}

export default User
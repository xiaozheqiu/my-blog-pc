import User from '../models/user.model'

class UserService {
    async createUser(account: string, password: string) {
        const res = await User.create({ account, password })
        return res.dataValues
    }
    async getUerInfo({ account }: { account: object }) {
        const res = await User.findOne({ where: { account } })
        return res?.dataValues
    }
}

export default new UserService()

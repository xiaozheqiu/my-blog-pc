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
    async updateUserInfo(account: string, token: string) {
        await User.update({ token }, { where: { account } })
        const res = await User.findOne({ where: { account } })
        return { token: res?.dataValues?.token, account: res?.dataValues?.account }
    }
}

export default new UserService()

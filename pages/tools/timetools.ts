import dayjs from 'dayjs'

export default class TimeTools {
    getWebsiteRuntime() {
        const startTime = dayjs('2023-01-01')
        const endTime = dayjs()
        const diffValue = endTime.diff(startTime)
        const days = Math.round(diffValue / (1000 * 60 * 60 * 24))
        const hours = Math.round((diffValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.round((diffValue % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.round((diffValue % (1000 * 60)) / 1000)
        return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    }
}

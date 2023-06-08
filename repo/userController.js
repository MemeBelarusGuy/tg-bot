import UserModel from '../models/user.js'

export const register = async (username) => {
    const isExist = await UserModel.findOne({username})
    if (!isExist) {
        const user = new UserModel({
            username,
            weather: [],
            currency: [],
            tasks: []
        })
        await user.save();
    }
}
export const addUserTask = async (username, taskId) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.tasks.push(taskId);
        await user.save();
    }
}
export const getUserNotifications = async (username) => {
    const user = await UserModel.findOne({username})
    if (user) {
        return {
            weather: user.weather,
            currency: user.currency
        }
    }
}
export const addWeatherNotify = async (username, city) => {
    const user = await UserModel.findOne({username})
    const exp = new RegExp(city, "gi")
    if (user && !user.weather.join("").match(exp)) {
        user.weather.push(city);
        await user.save();
        return 1;
    }
    return 0;
}
export const deleteWeatherNotify = async (username, city) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.weather = user.weather.filter(item => item !== city);
        await user.save();
    }
}
export const addCurrencyNotify = async (username, currency) => {
    const user = await UserModel.findOne({username})
    if (user && !user.currency.includes(currency)) {
        user.currency.push(currency);
        await user.save();
    }
}
export const deleteCurrencyNotify = async (username, currency) => {
    const user = await UserModel.findOne({username})
    if (user) {
        user.currency = user.currency.filter(item => item !== currency);
        await user.save();
    }
}
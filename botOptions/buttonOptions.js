import {ADVICE, CAT_IMAGE, DOG_IMAGE, DOLLAR, EURO, HELP, JOKE, NEWS, SEARCH, TASKS, WEATHER} from "../constants/botButtonsEmoji.js";
import {
    addCityQ,
    adviceQ,
    catQ, createTaskQ, deleteCityQ, deleteTaskQ,
    dogQ,
    dollarQ, editTaskQ,
    euroQ, findCityQ,
    helpQ,
    jokeQ,
    newsQ,
    searchQ,
    tasksQ,
    weatherQ
} from "../constants/botButtonsQuery.js";

export const botOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: HELP, callback_data: helpQ}, {text: WEATHER, callback_data: weatherQ}],
            [{text: CAT_IMAGE, callback_data: catQ}, {text: DOG_IMAGE, callback_data: dogQ}],
            [{text: DOLLAR, callback_data: dollarQ}, {text: EURO, callback_data: euroQ}],
            [{text: ADVICE, callback_data: adviceQ}, {text: JOKE, callback_data: jokeQ}],
            [{text: SEARCH, callback_data: searchQ}, {text: NEWS, callback_data: newsQ}],
            [{text: TASKS, callback_data: tasksQ}]
        ]
    })
}
export const taskOptionsExist = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "CREATE", callback_data: createTaskQ}],
            [{text: "EDIT", callback_data: editTaskQ}],
            [{text: "DELETE", callback_data: deleteTaskQ}],
        ]
    })
}
export const taskOptionsEmpty={
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "CREATE", callback_data: createTaskQ}],
        ]
    })
}
export const weatherOptionsExist = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "ADD", callback_data: addCityQ}],
            [{text: "FIND", callback_data: findCityQ}],
            [{text: "DELETE", callback_data: deleteCityQ}],
        ]
    })
}
export const weatherOptionsEmpty = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "ADD", callback_data: addCityQ}],
            [{text: "FIND", callback_data: findCityQ}],
        ]
    })
}
export const currencyOptionsUSD = (text) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: text, callback_data: `dollar${text}`}],
            ]
        })
    }
}
export const currencyOptionsEUR = (text) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: text, callback_data: `euro${text}`}],
            ]
        })
    }
}

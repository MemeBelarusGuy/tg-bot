import {bot} from "../index.js";
import {
    botOptions,
    taskOptionsEmpty,
    taskOptionsExist,
    weatherOptionsEmpty,
    weatherOptionsExist
} from "./buttonOptions.js";
import {dateFormat, getCurrency, getWeather} from "./botApiFunctions.js";
import {addCurrencyNotify, deleteCurrencyNotify} from "../repo/userController.js";
import {dollarQ, euroQ} from "../constants/botButtonsQuery.js";

export async function getTasks(chatId, tasks) {
    if (tasks.length) {
        let string = "Your Tasks:\n";
        let date;
        for (let i = 0; i < tasks.length; i++) {
            date = new Date(tasks[i].finishAt);
            string += `${i + 1}. ${tasks[i].title}\n`;
            string += `Finish At : ${dateFormat(date)}\n`;
            string += `Done : ${tasks[i].done ? '✅' : '❌'}\n`;
        }
        await bot.sendMessage(chatId, string, taskOptionsExist);
    } else {
        await bot.sendMessage(chatId, "You have 0 tasks to do.", taskOptionsEmpty);
    }
}

export async function getUserWeather(chatId, weather) {
    if (weather.length) {
        let string = "Your List Of Cities Notification:\n";
        for (let i = 0; i < weather.length; i++) {
            string += `${i + 1}. ${weather[i]}.\n`
        }
        await bot.sendMessage(chatId, string, weatherOptionsExist);
    } else await bot.sendMessage(chatId, "You Haven't Added Any Cities To Get Notify About Yet.", weatherOptionsEmpty);
}

export async function taskNotification(chatId, tasks) {
    let status = false;
    let res;
    for (let i = 0; i < tasks.length; i++) {
        res = Math.floor((tasks[i].finishAt - Date.now()) / 60000)
        if (res === 120 && !tasks[i].done) {
            await bot.sendMessage(chatId, "2 Hours Left To Finish Task!");
            status = true;
            break;
        } else if (res === 0 && !tasks[i].done) {
            await bot.sendMessage(chatId, "Time To Finish Task Ended!");
            status = true;
            break;
        }
    }
    if (status) await getTasks(chatId, tasks);
}

export async function weatherNotification(chatId, weather) {
    if (new Date().getHours() === 10) {
        for (let key of weather) {
            await getWeather(chatId, key);
        }
    }
}

export async function currencyNotification(chatId, currency) {
    if (new Date().getHours() % 3 === 0) {
        for (let key of currency) {
            await getCurrency(chatId, key, true);
        }
    }
}

export async function subscribeCurrency(currency, username, chatId, isSub) {
    if (currency === dollarQ) {
        if (isSub) {
            await deleteCurrencyNotify(username, dollarQ);
            await bot.sendMessage(chatId, "USD Deleted.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions);
        } else {
            await addCurrencyNotify(username, dollarQ);
            await bot.sendMessage(chatId, "USD Added.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        }
    } else {
        if (isSub) {
            await deleteCurrencyNotify(username, euroQ);
            await bot.sendMessage(chatId, "EUR Deleted.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        } else {
            await addCurrencyNotify(username, euroQ);
            await bot.sendMessage(chatId, "EUR Added.");
            await bot.sendMessage(chatId, "MemeBot Options:", botOptions)
        }
    }
}
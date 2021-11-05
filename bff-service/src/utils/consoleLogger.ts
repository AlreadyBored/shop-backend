export const consoleLogger = (requestData) => {
    for (let [key, data] of Object.entries(requestData)) {
        console.log(`[LOG] Request's ${key} is ${JSON.stringify(data)}`);
    }
};
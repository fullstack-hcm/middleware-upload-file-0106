/**
 * APPLICATION-LEVEL MIDDLEWARE
 */

const logTime = (req, res, next) => {
    const timeNow = Date.now();
    console.log({timeNow});
    next();
}

module.exports = {
    logTime
};
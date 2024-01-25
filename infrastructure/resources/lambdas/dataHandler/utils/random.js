// generate random Name 
function randomName() {
    return Math.random().toString(36).slice(2, 7) +
        Math.random().toString(36).slice(2, 7) +
        Math.random().toString(36).slice(2, 7);
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    randomName
}
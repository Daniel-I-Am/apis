function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


function roundDec(number, digits) {
    return Math.round(number*10**digits)/(10**digits)
}


String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}


function parseNumber(number) {
    let number_reg = /([0-9]{3})(?=[0-9])/g
    return number.toString().reverse().replace(number_reg, '$1,').reverse();
}

function beePower(time) {
    prod = parseNumber(findGetParameter('rft'))
    ticks = parseNumber(roundDec(time, 3))
    secs = parseNumber(roundDec(time/20, 3))
    hours = parseNumber(roundDec(time/(20*3600), 3))
    years = parseNumber(roundDec(time/(20*3600*24*365.2421), 3))
    return `When producing ${prod} RF/t:\n${ticks} ticks\n${secs} seconds\n${hours} hours\n${years} years`
}


function init() {
    document.getElementById('apiReturn').innerText = (() => {
        type = findGetParameter('api');
        switch (type) {
            case "beePower":
                return beePower((2**63-1)/(parseFloat(findGetParameter('rft'))))
        }
    })();
}


window.addEventListener('load', init)

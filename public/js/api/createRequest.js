/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    let formData = new FormData();
    let url = "";
    if (options.method !== 'GET') {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    } else if (options.data) {
        url = options.url + '?';
        Object.entries(options.data).forEach(element => {
            if (url.slice(-1) !== '?') {
                url += '&' + element[0] + '=' + element[1];
            } else {
                url += element[0] + '=' + element[1];
            }
        })
    }
    try {
        url ? xhr.open(options.method, url) : xhr.open(options.method, options.url);
        xhr.send(formData || null);
    } catch (error) {
        options.callback(error);
    }

    xhr.onload = function () {
        if (xhr.status.toLocaleString().includes(20)) {
            options.callback(null, xhr.response);
        } else {
            options.callback(error, xhr.response);
        }
    }

    xhr.onerror = function () {
        throw Error('ошибка');
    };
};

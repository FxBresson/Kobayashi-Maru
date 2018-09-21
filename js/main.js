const api = {
    key: `d4f717aa4db54aa08d2358108cf86104`,
    url: `https://newsapi.org/v2/`,
    endpoint: {
        sources: `sources`,
        articles: `everything?sources=` 
    }
}

const ajaxCall = (url) => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.onloadend = () => {
            if (req.status === 200 && req.responseText !== ``) {
                resolve(req.responseText);
            } else {
                reject(req.responseText);
            }
        };

        req.open('GET', url);
        req.send();
    })
}

document.addEventListener("DOMContentLoaded", () => {

    const elements = {
        select: document.getElementById(`#news-selector`),
        newsCtn: document.querySelector(`main`)
    }

    ajaxCall(`${api.url}${api.endpoint.sources}?apiKey=${api.key}`)
        .then((list) => {
            console.log(list)
        })
        .catch((err) => {
            console.log(err)
        })

});
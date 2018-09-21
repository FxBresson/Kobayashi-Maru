const api = {
    key: 'd4f717aa4db54aa08d2358108cf86104',
    url: 'https://newsapi.org/v2/',
    endpoint: {
        sources: 'sources',
        articles: 'everything?sources=' 
    },
    defaultSource: 'liberation'
}

const ajaxCall = (url) => {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.onloadend = () => {
            if (req.status === 200 && req.responseText !== ``) {
                resolve(JSON.parse(req.responseText));
            } else {
                reject(req.responseText);
            }
        };

        req.open('GET', url);
        req.send();
    })
}

const error = () => {
    elements.newsCtn.innerHTML = ``;

    let error = document.createElement('div');
    error.innerHTML = `
    
    `;

}

document.addEventListener("DOMContentLoaded", () => {

    const elements = {
        select: document.getElementById(`news-selector`),
        newsCtn: document.querySelector(`main`)
    }

    elements.select.addEventListener('change', () => {
        elements.newsCtn.innerHTML = ``;

        ajaxCall(`${api.url}${api.endpoint.articles}${elements.select.value}&apiKey=${api.key}`)
            .then((list) => {
                for (let article of list.articles) {
                    let articleHTML = document.createElement('article');
                    articleHTML.innerHTML = `
                        <div class="" style="background-image:url('${article.urlToImage}')">
                            <h1>${article.title}</h1>
                        </div>
                        <blockquote>${article.description}</blockquote>
                        <a href="${article.url}" target="_blank">Lire la Suite</a>
                    `;
                    elements.newsCtn.appendChild(articleHTML);
                }
            })
            .catch((err) => {
                console.log(err)
            })
        
    })

    ajaxCall(`${api.url}${api.endpoint.sources}?apiKey=${api.key}`)
        .then((list) => {
            for (let source of list.sources) {
                let option = document.createElement('option');
                option.setAttribute('value', source.id)
                option.innerHTML = source.name;
                elements.select.appendChild(option)
            }
        })
        .catch((err) => {
            console.log(err)
        })

});
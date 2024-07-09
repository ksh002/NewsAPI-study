// const API_KEY = `8980b41bdcef4ff398c6d2d44ed8d165`
let newsList = [];
// let filter = 'all';

const getLatestNews = async () => {
    const url = new URL(`https://newsapi-study.netlify.app/top-headlines?`);
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles;
    render()
    console.log(response)
    console.log(newsList)
}

const render = (newsData = newsList) => {
    const newsHTML = newsData.map(news => {
        // 뉴스 내용을 담을 변수
        let descriptionResult = '';

        // 뉴스 출처를 담을 변수
        let nameResult = '';

        // 시간을 담을 변수
        let time = news.publishedAt;
        time = time.replace(/-/g, '');
        time = time.slice(0, 8);
        time = moment(time, "YYYYMMDD").fromNow();

        if (news.description.length > 200) {
            descriptionResult = news.description.substr(0, 198) + '...';
        } else if (news.description.length <= 0) {
            descriptionResult = '내용없음';
        } else {
            descriptionResult = news.description;
        }

        if (news.source.name <= 0) {
            nameResult = 'no source';
        } else {
            nameResult = news.source.name;
        }
        return `<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size" src=${news.urlToImage} alt="" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637';">
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>${descriptionResult}</p>
                <div>${nameResult} * ${time}</div>
            </div>
        </div>`;
    }).join('');
    console.log(newsHTML);

    document.getElementById('news-board').innerHTML = newsHTML;
};

const btnEvent = (event) => {
    let clickedElement = event.target.value.toLowerCase();

    const filteredNews = newsList.filter(news => {
        return news.category.toLowerCase() === clickedElement;
    });

    render(filteredNews);
}

getLatestNews();

// const time = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(time)
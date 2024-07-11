const API_KEY = `8980b41bdcef4ff398c6d2d44ed8d165`
let newsList = [];
const inputArea = document.getElementById("input-area")
const searchBtn = document.getElementById("search-button")
// let filter = 'all';

// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`);



const getNews = async () => {
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles;
    render()
}

const saerch = async () => {
    const textContent = inputArea.value;
    // url = new URL(
    //     `https://newsapi.org/v2/top-headlines?country=kr&q=${textContent}&apiKey=${API_KEY}`
    // )
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${textContent}`
    )

    getNews()
    console.log(textContent)
}
searchBtn.addEventListener('click', saerch)


const getLatestNews = async () => {
    

    getNews()

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

        if (news.description && news.description.length > 200) {
            descriptionResult = news.description.substr(0, 198) + '...';
        } else if (!news.description || news.description.length === 0) {
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

// const btnEvent = (event) => {
//     let clickedElement = event.target.value.toLowerCase();

//     const filteredNews = newsList.filter(news => {
//         return news.category && news.category.toLowerCase() === clickedElement;
//     });

//     render(filteredNews);
// }
const btnEvent = async (event) => {
    const category = event.target.textContent.toLowerCase()
    console.log(category)
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);

    getNews()
}

const search = (event) => {
    // inputArea.textContent
    console.log(inputArea.textContent)
}

getLatestNews();

// const time = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(time)

document.querySelector(".hambergerBox").addEventListener("click", function() {
    document.querySelector(".menuBar").style.display = "block";
});

document.querySelector(".closeBtn").addEventListener("click", function() {
    document.querySelector(".menuBar").style.display = "none";
});

document.querySelector(".fa-magnifying-glass").addEventListener('click', function() {
    document.querySelector(".search").classList.toggle("active")
});

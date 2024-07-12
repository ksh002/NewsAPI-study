const API_KEY = `8980b41bdcef4ff398c6d2d44ed8d165`;
let newsList = [];
const inputArea = document.getElementById("input-area");
const searchBtn = document.getElementById("search-button");
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// 기본 URL 설정
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`); 

// API에서 뉴스를 가져오는 함수
const getNews = async () => {
    try {
        url.searchParams.set("page", page);
        url.searchParams.set("pageSize", pageSize);
        
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults; // totalResults 변수에 총 결과 수 할당
            render();
            paginationRender(); // 페이지네이션 렌더링 함수 호출
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorHandle(error.message);
    }
};

// 뉴스를 검색하는 함수
const searchNews = async () => {
    const textContent = inputArea.value;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${textContent}`);
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${textContent}&apiKey=${API_KEY}`);
    await getNews();
};

// 최신 뉴스를 가져오는 함수
const getLatestNews = async () => {
    await getNews();
};

// 에러를 처리하는 함수
const errorHandle = (errorMessage) => {
    const errorHTML = `
        <div class="error-area">
            <span>${errorMessage}.</span>
        </div>
    `;
    document.getElementById('news-board').innerHTML = errorHTML;
};

// 뉴스를 렌더링하는 함수
const render = (newsData = newsList) => {
    const newsHTML = newsData.map(news => {
        const time = moment(news.publishedAt.replace(/-/g, '').slice(0, 8), "YYYYMMDD").fromNow();
        const descriptionResult = news.description?.length > 200
            ? `${news.description.substr(0, 198)}...`
            : news.description || '내용없음';
        const nameResult = news.source.name || 'no source';

        return `
            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage}" alt="" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637';">
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${descriptionResult}</p>
                    <div>${nameResult} * ${time}</div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('news-board').innerHTML = newsHTML;
};

// 버튼 이벤트를 처리하는 함수
const btnEvent = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    await getNews();
};

// 모바일 버튼 이벤트를 처리하는 함수
const mobileBtnEvent = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    await getNews();
};

const moveToPage = (pageNumber) => {
    page = pageNumber;
    getNews();
}

// 페이지네이션을 처리하는 함수
const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = `
    <li class="page-item ${page <= 1 ? 'disabled' : ''}" onclick="moveToPage(1)">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">처음</span>
      </a>
    </li>
    <li class="page-item ${page <= 1 ? 'disabled' : ''}" onclick="moveToPage(${page - 1})">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }
    paginationHTML += `
    <li class="page-item ${page === totalPages ? 'disabled' : ''}">
      <a class="page-link" onclick="moveToPage(${page + 1})" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
    <li class="page-item ${page === totalPages ? 'disabled' : ''}">
      <a class="page-link" onclick="moveToPage(${totalPages})" aria-label="Next">
        <span aria-hidden="true">끝</span>
      </a>
    </li>`

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

// 초기 뉴스 데이터를 가져옴
getLatestNews();

// 검색 버튼 이벤트 리스너 추가
searchBtn.addEventListener('click', searchNews);

// 메뉴바 토글 이벤트 리스너 추가
document.querySelector(".hambergerBox").addEventListener("click", () => {
    document.querySelector(".menuBar").style.display = "block";
});

document.querySelector(".closeBtn").addEventListener("click", () => {
    document.querySelector(".menuBar").style.display = "none";
});

// 검색 아이콘 클릭 시 검색창 토글
document.querySelector(".fa-magnifying-glass").addEventListener('click', () => {
    document.querySelector(".search").classList.toggle("active");
});

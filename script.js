// const API_KEY = `8980b41bdcef4ff398c6d2d44ed8d165`
let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://newsapi-study.netlify.app/`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log(response)
    console.log(news)
}
getLatestNews()


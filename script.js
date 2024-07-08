// const API_KEY = `8980b41bdcef4ff398c6d2d44ed8d165`
let news = [];
const getLatestNews = async () => {
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log(response)
    console.log(news)
}
getLatestNews()


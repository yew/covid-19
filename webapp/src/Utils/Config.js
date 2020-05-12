const server = "http://localhost:8000/";

const API = {
    ok: server,
    shanghai: server + "data/shanghai",
    index: server + "data/index",
    track: server + "data/track_list",
    news: server + "data/news",
    safeguard: server + "data/safeguard",
    qa: server + "qa",
};

const lineChartInterval = 4;

export default API;
export {lineChartInterval};
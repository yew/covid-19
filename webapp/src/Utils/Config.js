const server = "http://localhost:8000/api/";

const API = {
    ok: server.replace('api/', ''),
    shanghai: server + "data/shanghai",
    index: server + "data/index",
    track: server + "data/track_list",
    news: server + "data/news",
    safeguard: server + "data/safeguard",
    qa: server + "qa",
};

export default API;
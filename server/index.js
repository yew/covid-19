const express = require("express");
const axios = require("axios");
const utils = require("./utils");
const app = express();

app.get("/", (req, res) => {
    res.send("OK");
})

app.get("/api/data/shanghai", async (req, res) => {
    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result_series = await axios.get("https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22310000%22%5D");
    const ret = JSON.parse(result_series.data.ncov_city_data["310000"]);

    const result_all = await axios.get("https://i.snssdk.com/forum/home/v1/info/?forum_id=1656784762444839");
    const data_all = JSON.parse(result_all.data.forum.extra.ncov_string_list);
    const data_shanghai = data_all.provinces.filter(province => province.id === "31")[0];

    ret["updateTime"] = data_all.updateTime;
    ret["cities"] = data_shanghai.cities;

    res.json(ret);
})

app.get("/api/data/news", async (req, res) => {
    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result = await axios.get("https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20");

    // const ret = JSON.parse(result.data.data);
    const origin_news = JSON.parse(result.data.data[0].content).sub_raw_datas;
    const news = origin_news.map(item => {
        delete item.raw_data.content_id;
        delete item.raw_data.content_id_str;
        delete item.raw_data.schema;
        delete item.raw_data.source;
        delete item.raw_data.time_show_type;
        if (item.raw_data.event_image) {
            item.raw_data.event_image_url = item.raw_data.event_image.url;
        }
        delete item.raw_data.event_image;

        return item.raw_data;
    });

    res.json(news);
})

app.listen(8000, () => {
    console.log("Server Start:");
    console.log("http://localhost:8000");
})
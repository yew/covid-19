const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const axios = require("axios");
const utils = require("./utils");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const fs = require("fs");
const qaList = JSON.parse(fs.readFileSync("./assets/qa/qa.json", "utf8"));

const stringSimilarity = require('string-similarity');

app.get("/", (req, res) => {
    res.send("OK");
});

app.post("/api/qa", async (req, res) => {
    const question = req.body.question;
    const {ratings: qRatings} = stringSimilarity.findBestMatch(question, qaList.map(a => a.question));
    const {ratings: aRatings} = stringSimilarity.findBestMatch(question, qaList.map(a => a.answer));
    const ratings = qRatings.map((qRatingEle, idx) => {
        qRatingEle.rating += 0.25 * aRatings[idx].rating;
        qRatingEle.idx = idx;
        return qRatingEle;
    });
    ratings.sort((a, b) => b.rating - a.rating);
    res.json({
        question: ratings[0].target,
        answer: qaList[ratings[0].idx].answer,
        related: ratings.slice(1, 6).map(ratingEle => qaList[ratingEle.idx].question),
    })
});

app.get("/api/data/shanghai", async (req, res) => {
    utils.log(req);

    const result_series = await axios.get("https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22310000%22%5D");
    const ret = JSON.parse(result_series.data.ncov_city_data["310000"]);

    const result_all = await axios.get("https://i.snssdk.com/forum/home/v1/info/?forum_id=1656784762444839");
    const data_all = JSON.parse(result_all.data.forum.extra.ncov_string_list);
    const data_shanghai = data_all.provinces.filter(province => province.id === "31")[0];

    ret["updateTime"] = data_all.updateTime;
    ret["cities"] = data_shanghai.cities;

    res.json(ret);
});

app.get("/api/data/news", async (req, res) => {
    const result = await axios.get("https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20");

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
});

app.get("/api/data/track_list", async (req, res) => {
    const result = await axios.get("https://i.snssdk.com/toutiao/normandy/pneumonia_trending/track_list/?city_code=310000");
    const ret = result.data.data.list;
    res.json(ret);
});

app.get("/api/data/safeguard", async (req, res) => {
    const result = await axios.get("https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656806647707693&tab_id=1656806647707709&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20");
    const ret = result.data.data.map(block => {
        const block_content = JSON.parse(block.content);
        const article_list = block_content.sub_raw_datas.map(article => {
            const forum_extra_data = JSON.parse(article.forum_extra_data);

            let img_url = "";
            if (forum_extra_data.middle_image) {
                img_url = forum_extra_data.middle_image.url;
            } else {
                img_url = article.middle_image.url
            }

            return {
                title: forum_extra_data.title,
                url: article.display_url,
                img_url,
                source: article.source,
                has_video: article.has_video,
                video_duration: article.video_duration
            }
        });

        return {
            block_title: block_content.raw_data.card_header.title,
            article_list
        };
    });

    res.json(ret);
});

app.listen(8000, () => {
    console.log("Server Start:");
    console.log("http://localhost:8000");
});
const express = require("express");
const axios = require("axios");
const utils = require("./utils");
const app = express();
const fs = require('fs');

//保存json文件的方法
const JSONToFile = (obj, filename) =>
    fs.writeFile(`../data/${filename}.json`, JSON.stringify(obj, null, 2));

app.get("/", (req, res) => {
    res.send("OK");
});

app.get("/api/data/shanghai", async (req, res) => {

    //判断是否出现错误
    var get_error = false;

    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result_series = await axios.get("https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22310000%22%5D")
        .catch(function (error) {
            console.log("error happens when get result_series");
            get_error = true;
        });

    const result_all = await axios.get("https://i.snssdk.com/forum/home/v1/info/?forum_id=1656784762444839")
        .catch(function (error) {
            console.log("error happens when get result_all");
            get_error = true;
        });

    //获取本地json数据
    const shanghaiData = require('../data/shanghai.json');

    //如果出错 返回本地的数据
    if(get_error==true)
        return res.json(shanghaiData.data);

    const ret = JSON.parse(result_series.data.ncov_city_data["310000"]);

    const data_all = JSON.parse(result_all.data.forum.extra.ncov_string_list);
    const data_shanghai = data_all.provinces.filter(province => province.id === "31")[0];

    ret["updateTime"] = data_all.updateTime;
    ret["cities"] = data_shanghai.cities;

    //判断是否需要更新
    console.log(shanghaiData['data']['updateTime']);
    console.log(data_all.updateTime);
    if(data_all.updateTime!=shanghaiData['data']['updateTime']){
        JSONToFile({ data: ret }, 'shanghai');
    }
    res.json(ret);
});

app.get("/api/data/news", async (req, res) => {
    //获取本地json数据
    const newsData = require('../data/news.json');

    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result = await axios.get("https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20").catch(function (error) {
        console.log("error happens when get result");
        return res.json(newsData.data);  //出错返回本地数据
    });



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

    //判断是否需要更新本地文件
    var data_changed = false;
    if(news.length!=newsData.data.length){
        data_changed = true;
    }else{
        for(var i=0;i<news.length;i++){
            if(news[i].desc!=newsData.data[i].desc){
                data_changed = true;
                break;
            }
        }
    }
    if(data_changed==true){
        JSONToFile({ data: news }, 'news');
    }
});

app.get("/api/data/track_list", async (req, res) => {
    //获取本地json数据
    const trackListData = require('../data/track_list.json');

    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result = await axios.get("https://i.snssdk.com/toutiao/normandy/pneumonia_trending/track_list/?city_code=310000").catch(function (error) {
        console.log("error happens when get result");
        return res.json(trackListData.data);  //出错返回本地数据
    });

    const ret = result.data.data.list;
    res.json(ret);

    //判断是否需要更新
    var data_changed = false;
    console.log(ret.length);
    console.log(trackListData.data.length);
    if(ret.length!=trackListData.data.length){
        data_changed = true;
    }else{
        for(var i=0;i<trackListData.data.length;i++){
            console.log(ret[i].poi_name);
            console.log(trackListData.data[i].poi_name);
            if(ret[i].poi_name!=trackListData.data[i].poi_name){
                data_changed = true;
                break;
            }
        }
    }
    if(data_changed==true){
        JSONToFile({ data: ret }, 'track_list');
    }
});

app.get("/api/data/safeguard", async (req, res) => {
    //获取本地json数据
    const safeguardData = require('../data/safeguard.json');

    utils.log(req);

    res.append("access-control-allow-origin", "*");
    const result = await axios.get("https://i.snssdk.com/api/feed/forum_flow/v1/?query_id=1656806647707693&tab_id=1656806647707709&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20").catch(function (error) {
        console.log("error happens when get result");
        return res.json(safeguardData.data);  //出错返回本地数据
    });
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
                img_url: forum_extra_data.middle_image,
                url: article.display_url,
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

    //判断是否需要更新
    var data_changed = false;
    if(ret.length!=safeguardData.data.length){
        data_changed = true;
    }else{
        for(var i=0;i<safeguardData.data.length;i++){
            if(ret[i].block_title!=safeguardData.data[i].block_title){
                data_changed = true;
                break;
            }else{
                if(ret[i].article_list.length!=safeguardData.data[i].article_list.length){
                    data_changed = true;
                    break;
                }
                else{
                    for(var j=0;j<ret[i].article_list.length;j++){
                        if(ret[i].article_list[j].title!=safeguardData.data[i].article_list[j].title){
                            data_changed = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    if(data_changed==true){
        JSONToFile({ data: ret }, 'safeguard');
    }

});

app.listen(8000, () => {
    console.log("Server Start:");
    console.log("http://localhost:8000");
});
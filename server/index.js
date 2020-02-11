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

app.listen(8000, () => {
    console.log("Server Start:");
    console.log("http://localhost:8000");
})
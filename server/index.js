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
    const result = await axios.get("https://i.snssdk.com/forum/ncov_data/?data_type=%5B1%5D&city_code=%5B%22310000%22%5D");
    res.json(JSON.parse(result.data.ncov_city_data["310000"]));
})

app.listen(8000, () => {
    console.log("Server Start:");
    console.log("http://localhost:8000");
})
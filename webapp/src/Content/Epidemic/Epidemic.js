import React from "react";
import "./Epidemic.css";
import EpidemicTitleImg from "../../assets/img/epidemic_title.png";
// import QuestionMarkImg from "../../assets/img/question_mark.png";
import logoImg from "../../assets/img/logo.png";
import moment from "moment";
import ReactEcharts from "echarts-for-react";


class Epidemic extends React.Component {
    render() {
        const confirmedIncr = `+${this.props.shanghaiData.cityIncr.confirmedIncr}`;
        const deathsIncr = `+${this.props.shanghaiData.cityIncr.deathsIncr}`;
        const curesIncr = `+${this.props.shanghaiData.cityIncr.curesIncr}`;

        return (
            <div className="pneumonia-container">
                <div className="header" style={{backgroundColor: "#426abd"}}>
                    <p>上海市</p>
                    <img className="title" src={EpidemicTitleImg} alt="新型冠状病毒疫情追踪"/>
                    <img className="logo" src={logoImg} alt=""/>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">上海疫情</p>
                        <p className="update-time">
                            更新时间 {moment(this.props.shanghaiData.updateTime * 1000).format("YYYY/MM/DD HH:mm")}
                            {/*<i style={{backgroundImage: `url("${QuestionMarkImg}")`}}/>*/}
                        </p>
                    </div>
                    <div className="total">
                        <div className="total-confirm">
                            <p className="compare">
                                <span>较{this.props.shanghaiData.cityIncr.confirmedIncrPrefix}</span>
                                <span className="num">{confirmedIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.confirmedTotal}</p>
                            <p className="text">累计确诊</p>
                        </div>
                        <div className="total-dead">
                            <p className="compare">
                                <span>较{this.props.shanghaiData.cityIncr.deathsIncrPrefix}</span>
                                <span className="num">{deathsIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.deathsTotal}</p>
                            <p className="text">死亡</p>
                        </div>
                        <div className="total-heal">
                            <p className="compare">
                                <span>较{this.props.shanghaiData.cityIncr.curesIncrPrefix}</span>
                                <span className="num">{curesIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.curesTotal}</p>
                            <p className="text">治愈</p>
                        </div>
                    </div>
                    <div className="epidemic-trends">
                        <ReactEcharts option={this.kLineOption()} style={{height: "250px"}}/>
                        <div className="epidemic-trends-legend">
                            <span className="confirmed">确诊人数</span>
                            <span className="heal">治愈人数</span>
                            <span className="dead">死亡人数</span>
                            <br/>
                            <span className="new-confirmed">新增确诊</span>
                            <span className="new-heal">新增治愈</span>
                            <span className="new-dead">新增死亡</span>
                        </div>
                    </div>
                    <div className="epidemic-trends">
                        <ReactEcharts option={this.getAddOption()} style={{height: "250px"}}/>
                        <div className="epidemic-trends-legend">
                            <span className="confirmed">新增确诊</span>
                            <span className="heal">新增治愈</span>
                            <span className="dead">新增死亡</span>
                        </div>
                    </div>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">区县分布</p>
                        <p className="update-time">依据卫健委数据按日更新，非实时数据</p>
                    </div>
                    <div>
                        <ReactEcharts option={this.getNestedPiesOption()} style={{height: "300px"}}/>
                    </div>
                    <div className="pneumonia-table-container">
                        <div className="table-head">
                            <p className="th-1">区县</p>
                            <p className="th-2">确诊</p>
                            <p className="th-3">死亡</p>
                            <p className="th-4">治愈</p>
                        </div>
                        <div className="table-content">
                            {
                                this.props.shanghaiData.cities.map((city, index) => {
                                    return (
                                        <div className="table-item" key={index}>
                                            <p className="p1">{city.name}</p>
                                            <p className="p2">{city.confirmedNum === 0 ? "" : city.confirmedNum}</p>
                                            <p className="p3">{city.deathsNum === 0 ? "" : city.deathsNum}</p>
                                            <p className="p4">{city.curesNum === 0 ? "" : city.curesNum}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getAddOption = () => {
        const series = this.props.shanghaiData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5).replace("-", ".");
        });

        const confirmedSeries = series.map((item) => {
            return item.confirmedNum;
        });

        const deathsSeries = series.map((item) => {
            return item.deathsNum;
        });

        const curesSeries = series.map((item) => {
            return item.curesNum;
        });

        var confirmedAdd = [0];
        var deathAdd = [0];
        var cureAdd = [0];


        for (var i = 1; i < confirmedSeries.length; i++) {
            confirmedAdd.push(confirmedSeries[i] - confirmedSeries[i - 1]);
            deathAdd.push(deathsSeries[i] - deathsSeries[i - 1]);
            cureAdd.push(curesSeries[i] - curesSeries[i - 1]);
        }

        return {
            title: {
                text: '疫情增长趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ebebeb',
                borderWidth: 1,
                textStyle: {
                    color: '#515151'
                },
                formatter: function (params, ticket, callback) {
                    const date_list = params[0].name.split('.');
                    const dateStr = parseInt(date_list[0]) + '月' + parseInt(date_list[1]) + '日';

                    const tooltip_items = params.map(param => {
                        return `<div class='tooltip-item'>
                        <span class='tooltip-point' style='background-color: ${param.color}'></span>
                        <span>${param.seriesName}</span>
                        <span>:</span>
                        <span>${param.value}</span>
                    </div>`;
                    }).join('');

                    return `<div style='font-size: 10px;line-height: 16px;'>${dateStr}${tooltip_items}</div>`
                }
            },
            color: ["#d96322", "#0f3046", "#39c4c4"],
            grid: {
                top: '14%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    rotate: 40,
                    interval: 1,
                    color: "#9e9e9e",
                    fontSize: 9,
                    showMaxLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#ebebeb"
                    }
                },
                axisTick: {
                    show: false
                },
                data: xAxis
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: "#505050",
                    fontSize: 10,
                    showMaxLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#ebebeb"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#ebebeb"
                    }
                },
                axisTick: {
                    show: false
                },
            },
            series: [
                {
                    name: '新增确诊',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: confirmedAdd
                },
                {
                    name: '新增死亡',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: deathAdd
                },
                {
                    name: '新增治愈',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: cureAdd
                }
            ]
        };
    };
    kLineOption = () => {

        const series = this.props.shanghaiData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5).replace("-", ".");
        });
        const confirmedSeries = series.map((item) => {
            return item.confirmedNum;
        });

        const deathsSeries = series.map((item) => {
            return item.deathsNum;
        });

        const curesSeries = series.map((item) => {
            return item.curesNum;
        });

        var confirmedItemSeries = [];
        var deathItemSeries = [];
        var cureItemSeries = [];

        confirmedItemSeries.push([xAxis[0], confirmedSeries[0], confirmedSeries[0], confirmedSeries[0], confirmedSeries[0]]);
        deathItemSeries.push([xAxis[0], deathsSeries[0], deathsSeries[0], deathsSeries[0], deathsSeries[0]]);
        cureItemSeries.push([xAxis[0], curesSeries[0], curesSeries[0], curesSeries[0], curesSeries[0]]);

        for (var i = 1; i < confirmedSeries.length; i++) {
            var confirmedItem = [xAxis[i], confirmedSeries[i - 1], confirmedSeries[i], confirmedSeries[i - 1], confirmedSeries[i]];
            var cureItem = [xAxis[i], curesSeries[i - 1], curesSeries[i], curesSeries[i - 1], curesSeries[i]];
            var deathItem = [deathsSeries[i - 1], deathsSeries[i], deathsSeries[i - 1], deathsSeries[i]];
            confirmedItemSeries.push(confirmedItem);
            deathItemSeries.push(deathItem);
            cureItemSeries.push(cureItem);
        }

        var upColor = '#ec0000';
        var upBorderColor = '#8A0000';
        var downColor = '#00da3c';
        var downBorderColor = '#008F28';

        var data0 = splitData(confirmedItemSeries);
        var data1 = splitData(cureItemSeries);
        var data2 = splitData(deathItemSeries);

        function splitData(rawData) {
            var categoryData = [];
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i])
            }
            return {
                categoryData: categoryData,
                values: values
            };
        }

        return {
            title: {
                text: '最新疫情趋势',
                textStyle: {
                    fontSize: 14
                },
            },
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: xAxis,
                axisLabel: {
                    rotate: 40,
                    interval: 1,
                    color: "#9e9e9e",
                    fontSize: 9,
                    showMaxLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: "#ebebeb"
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            series: [
                {
                    //确诊新增
                    type: 'candlestick',
                    data: data0.values,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                },
                {
                    name: '确诊',
                    type: 'line',
                    data: confirmedSeries,
                    smooth: true,
                    color: "#d96322",
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    //治愈新增
                    type: 'candlestick',
                    data: data1.values,
                    itemStyle: {
                        color: "#FF6666",
                        color0: "#FF6666",
                        borderColor: "#FF6666",
                        borderColor0: "#FF6666"
                    }
                },
                {
                    name: '治愈',
                    type: 'line',
                    data: curesSeries,
                    smooth: true,
                    color: "#39c4c4",
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    //死亡新增
                    type: 'candlestick',
                    data: data2.values,
                    itemStyle: {
                        color: '#993333',
                        color0: '#993333',
                        borderColor: '#993333',
                        borderColor0: '#993333'
                    }
                },
                {
                    name: '死亡',
                    type: 'line',
                    data: deathsSeries,
                    color: "#0f3046",
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                }
            ]
        };

    };
    getNestedPiesOption = () => {

        const cityTotal = this.props.shanghaiData.cityTotal.confirmedTotal;

        const cities_names = [];

        const cities = this.props.shanghaiData.cities;
        const cities_list = [];
        cities.forEach(city => {
            if (city.name !== '未公布来源') {
                cities_names.push(city.name);
                const dict = {'value': city.confirmedNum, 'name': city.name};
                cities_list.push(dict);
            }
        });

        cities_names.push('本市');

        const outside_num = cities.filter(city => city.name === "外地来沪")[0].confirmedNum;
        const local_num = cityTotal - outside_num;


        return {
            title: {
                text: '区域分布比例图',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ["#313e4f", "#394046", "#b63830", "#d6302f", "#d75746", "#447fb4", "#5297d7", "#8549aa", "#935eb3", "#56ab69", "#65c97a", "#4a9e87", "#58b99f", "#d9833b", "#e89f3d", "#eac545", "#828b8d", "#99a6a6"],
            series: [
                {
                    name: '确诊人数',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        position: 'inner'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: outside_num, name: '外地来沪', selected: true},
                        {value: local_num, name: '本市'},
                    ]
                },
                {
                    name: '确诊人数',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    data: cities_list
                }
            ]
        };
    };
}

export default Epidemic;
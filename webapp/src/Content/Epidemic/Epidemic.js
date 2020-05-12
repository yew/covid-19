import React from "react";
import "./Epidemic.css";
import Banner from "../../assets/img/banner.jpg";
import EpidemicTitleImg from "../../assets/img/epidemic_title.png";
import QuestionMarkImg from "../../assets/img/question_mark.png";
import logoImg from "../../assets/img/logo.png";
import moment from "moment";
import ReactEcharts from "echarts-for-react";
import {tooltipStyle} from "../../Utils/Utils";
import Modal from "./Modal/Modal";
import Axios from "axios";
import API, {lineChartInterval} from "../../Utils/Config";
import Loading from "../../Loading/Loading";


class Epidemic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shanghaiData: null,
            modal_visible: false
        }
    }

    async componentDidMount() {
        if (this.props.shanghaiData) {
            this.setState({shanghaiData: this.props.shanghaiData})
        } else {
            const data = (await Axios.get(API.shanghai)).data;
            this.setState({
                shanghaiData: data
            });
            this.props.collectData("shanghaiData", data);
        }
    }

    render() {
        const shanghaiData = this.state.shanghaiData;

        let dom = <Loading/>;
        if (this.state.shanghaiData) {
            dom = <div className="pneumonia-container">
                <div className="header" style={{backgroundImage: `url("${Banner}")`}}>
                    <img className="title" src={EpidemicTitleImg} alt="新型冠状病毒疫情追踪"/>
                    <p className="cooperate">
                        <img src={logoImg} alt=""/>
                        上海市数据科学重点实验室
                    </p>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">上海疫情</p>
                        <p className="update-time">
                            更新时间 {moment(shanghaiData.updateTime * 1000).format("YYYY/MM/DD HH:mm")}
                            <i style={{backgroundImage: `url("${QuestionMarkImg}")`}}
                               onClick={() => this.setState({modal_visible: true})}/>
                        </p>
                    </div>
                    <div className="total">
                        <div className="total-confirm">
                            <p className="compare">
                                <span>较{shanghaiData.cityIncr.confirmedIncrPrefix}</span>
                                <span className="num">{shanghaiData.cityIncr.confirmedIncrStr}</span>
                            </p>
                            <p className="num">{shanghaiData.cityTotal.confirmedTotal}</p>
                            <p className="text">累计确诊</p>
                        </div>
                        <div className="total-treating">
                            <p className="compare">
                                <span>较{shanghaiData.cityIncr.treatingIncrPrefix}</span>
                                <span className="num">{shanghaiData.cityIncr.treatingIncrStr}</span>
                            </p>
                            <p className="num">{shanghaiData.cityTotal.treatingTotal}</p>
                            <p className="text">现存确诊</p>
                        </div>
                        <div className="total-dead">
                            <p className="compare">
                                <span>较{shanghaiData.cityIncr.deathsIncrPrefix}</span>
                                <span className="num">{shanghaiData.cityIncr.deathsIncrStr}</span>
                            </p>
                            <p className="num">{shanghaiData.cityTotal.deathsTotal}</p>
                            <p className="text">死亡</p>
                        </div>
                        <div className="total-heal">
                            <p className="compare">
                                <span>较{shanghaiData.cityIncr.curesIncrPrefix}</span>
                                <span className="num">{shanghaiData.cityIncr.curesIncrStr}</span>
                            </p>
                            <p className="num">{shanghaiData.cityTotal.curesTotal}</p>
                            <p className="text">治愈</p>
                        </div>
                    </div>
                    <div className="epidemic-trends">
                        <ReactEcharts option={this.kLineOption()} style={{height: "250px"}}/>
                        <div className="epidemic-trends-legend">
                            <div className="epidemic-trends-legend-container">
                                <span className="confirmed">确诊</span>
                                <span className="heal">治愈</span>
                                <span className="dead">死亡</span>
                            </div>
                            <div className="epidemic-trends-legend-container">
                                <span className="new-confirmed">*折线下的柱状图表示新增幅度</span>
                            </div>
                        </div>
                    </div>
                    <div className="epidemic-trends">
                        <ReactEcharts option={this.getAddOption()} style={{height: "250px"}}/>
                        <div className="epidemic-trends-legend">
                            <div className="epidemic-trends-legend-container">
                                <span className="confirmed">新增确诊</span>
                                <span className="heal">新增治愈</span>
                                <span className="dead">新增死亡</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">区县分布</p>
                        {/*<p className="update-time">依据卫健委数据按日更新，非实时数据</p>*/}
                    </div>
                    <div>
                        <ReactEcharts option={this.getNestedPiesOption()} style={{height: "300px"}}/>
                    </div>
                    <div className="pneumonia-table-container">
                        <div className="table-head">
                            <p className="th-1">区县</p>
                            <p className="th-3">现存</p>
                            <p className="th-2">累计</p>
                            <p className="th-5">治愈</p>
                            <p className="th-4">死亡</p>
                        </div>
                        <div className="table-content">
                            {
                                this.state.shanghaiData.cities.sort((a, b)=>b.treatingNum-a.treatingNum)
                                    .map((city, index) => {
                                    return (
                                        <div className="table-item" key={index}>
                                            <p className="p1">{city.name}</p>
                                            <p className="p3">{
                                                city.treatingNum < 0 ? "-" :
                                                    city.treatingNum === 0 ?
                                                        <span style={{color: "#39c460"}}>{city.treatingNum}</span> :
                                                        <span style={{color: "#d96322"}}>{city.treatingNum}</span>
                                            }</p>
                                            <p className="p2">{city.confirmedNum}</p>
                                            <p className="p5">{city.curesNum}</p>
                                            <p className="p4">{city.deathsNum}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <Modal visible={this.state.modal_visible}
                       close={() => {
                           this.setState({modal_visible: false})
                       }}/>
            </div>
        }
        return dom;
    }

    getAddOption = () => {
        const series = this.state.shanghaiData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map(item => {
            return item.date.slice(5).replace("-", ".");
        });
        const confirmedSeries = series.map(item => {
            return item.confirmedNum;
        });
        const deathsSeries = series.map(item => {
            return item.deathsNum;
        });
        const curesSeries = series.map(item => {
            return item.curesNum;
        });

        const confirmedAdd = [0];
        const deathAdd = [0];
        const cureAdd = [0];

        for (let i = 1; i < confirmedSeries.length; i++) {
            confirmedAdd.push(confirmedSeries[i] - confirmedSeries[i - 1]);
            cureAdd.push(curesSeries[i] - curesSeries[i - 1]);
            deathAdd.push(deathsSeries[i] - deathsSeries[i - 1]);
        }

        return {
            title: {
                text: '疫情增长趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: tooltipStyle,
            color: ["#ae212c", "#39c4c4", "#0f3046"],
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
                    interval: lineChartInterval,
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
                    name: '新增治愈',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: cureAdd
                },
                {
                    name: '新增死亡',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: deathAdd
                }
            ]
        };
    };

    kLineOption = () => {
        const series = this.state.shanghaiData.series.sort((a, b) => {
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

        const confirmedItemSeries = [];
        const deathItemSeries = [];
        const cureItemSeries = [];

        confirmedItemSeries.push([xAxis[0], confirmedSeries[0], confirmedSeries[0], confirmedSeries[0], confirmedSeries[0]]);
        deathItemSeries.push([xAxis[0], deathsSeries[0], deathsSeries[0], deathsSeries[0], deathsSeries[0]]);
        cureItemSeries.push([xAxis[0], curesSeries[0], curesSeries[0], curesSeries[0], curesSeries[0]]);

        for (let i = 1; i < confirmedSeries.length; i++) {
            const confirmedItem = [xAxis[i], confirmedSeries[i - 1], confirmedSeries[i], confirmedSeries[i - 1], confirmedSeries[i]];
            const cureItem = [xAxis[i], curesSeries[i - 1], curesSeries[i], curesSeries[i - 1], curesSeries[i]];
            const deathItem = [deathsSeries[i - 1], deathsSeries[i], deathsSeries[i - 1], deathsSeries[i]];
            confirmedItemSeries.push(confirmedItem);
            deathItemSeries.push(deathItem);
            cureItemSeries.push(cureItem);
        }

        const data0 = splitData(confirmedItemSeries);
        const data1 = splitData(cureItemSeries);
        const data2 = splitData(deathItemSeries);

        function splitData(rawData) {
            const categoryData = [];
            const values = [];
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
            grid: {
                top: '18%',
                left: '8%',
                right: '4%',
                bottom: '10%',
            },
            xAxis: {
                type: 'category',
                data: xAxis,
                axisLabel: {
                    rotate: 40,
                    interval: lineChartInterval,
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
                    //确诊新增
                    type: 'candlestick',
                    data: data0.values,
                    showAllSymbol: false,
                    itemStyle: {
                        color: "#ff6666",
                        color0: "#ff6666",
                        borderColor: null,
                        borderColor0: null
                    }
                },
                {
                    name: '确诊',
                    type: 'line',
                    data: confirmedSeries,
                    showAllSymbol: false,
                    smooth: true,
                    color: "#ae212c",
                    lineStyle: {
                        opacity: 0.5
                    }
                },
                {
                    //治愈新增
                    type: 'candlestick',
                    data: data1.values,
                    showAllSymbol: false,
                    itemStyle: {
                        color: "#8fdada",
                        color0: "#8fdada",
                        borderColor: null,
                        borderColor0: null
                    }
                },
                {
                    name: '治愈',
                    type: 'line',
                    data: curesSeries,
                    showAllSymbol: false,
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
                    showAllSymbol: false,
                    itemStyle: {
                        color: '#993333',
                        color0: '#993333',
                        borderColor: null,
                        borderColor0: null
                    }
                },
                {
                    name: '死亡',
                    type: 'line',
                    data: deathsSeries,
                    showAllSymbol: false,
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
        const cityTotal = this.state.shanghaiData.cityTotal.confirmedTotal;

        const cities = this.state.shanghaiData.cities;
        const cities_list = [];
        cities.forEach(city => {
            if (city.name !== '未公布来源') {
                const dict = {'value': city.confirmedNum, 'name': city.name};
                cities_list.push(dict);
            }
        });

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

import React from "react";
import "./SearchIndex.css";
import Tabs from './Tabs';
import EpidemicTitleImg from "../../assets/img/index_title.png";
import logoImg from "../../assets/img/logo.png";
import ReactEcharts from "echarts-for-react";
import {tooltipStyle} from "../../Utils/Utils";
import Banner from "../../assets/img/banner.jpg";


class SearchIndex extends React.Component {
    render() {
        return (
            <div className="index-container">
                <div className="header" style={{backgroundImage: `url("${Banner}")`}}>
                    <img className="title" src={EpidemicTitleImg} alt="搜索指数"/>
                    <p className="cooperate">
                        <img src={logoImg} alt=""/>
                        上海市数据科学重点实验室
                    </p>
                </div>
                <div className="pneumonia-block-container">

                    <div className="block-title">
                        <p className="title">搜索指数对比图</p>
                        <p className="update-time">数据来源于百度搜索指数</p>
                    </div>
                    <div>
                        <Tabs>
                            <div label="上海搜索指数">
                                <div className="epidemic-trends">
                                    <ReactEcharts option={this.shanghaiIndexOption()} style={{height: "250px"}}/>
                                </div>
                                <div className="epidemic-trends">
                                    <ReactEcharts option={this.shanghaiMultiplyOption()}style={{height: "300px"}}/>
                                    <div className="epidemic-trends-legend">
                                        <span className="confirmed">确诊</span>
                                        <span className="heal">治愈</span>
                                        <span className="dead">死亡</span>
                                        <span className="index">搜索指数</span>
                                    </div>
                                </div>
                            </div>
                            <div label="全国搜索指数">
                                <div className="epidemic-trends">
                                    <ReactEcharts option={this.nationalIndexOption()} style={{height: "250px"}}/>
                                </div>
                                <div className="epidemic-trends">
                                    <ReactEcharts option={this.nationalMultiplyOption()} style={{height: "250px"}}/>
                                    <div className="epidemic-trends-legend">
                                        <span className="confirmed">确诊</span>
                                        <span className="heal">治愈</span>
                                        <span className="dead">死亡</span>
                                        <span className="index">搜索指数</span>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }

    shanghaiMultiplyOption = () => {
        const series = this.props.indexData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5).replace("-", ".");
        });
        const confirmedSeries = series.map((item) => {
            return item.confirmedNum;
        });
        const treatingSeries = series.map(item => {
            return item.treatingNum;
        });
        const deathsSeries = series.map((item) => {
            return item.deathsNum;
        });
        const curesSeries = series.map((item) => {
            return item.curesNum;
        });

        const index = this.props.indexData.shanghai_index;

        return {
            title: {
                text: '指数随疫情趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: tooltipStyle,
            color: ["#ae212c", "#d96322", "#0f3046", "#39c4c4", "#bcafb1"],
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
            yAxis: [{
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
            }, {
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
            }],
            series: [
                {
                    name: '确诊',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: confirmedSeries
                },
                {
                    name: '存量',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: treatingSeries
                },
                {
                    name: '死亡',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: deathsSeries
                },
                {
                    name: '治愈',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: curesSeries
                },
                {
                    name: '指数',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    showAllSymbol: false,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                color: '#bcafb1',
                                type: 'dotted'  //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: index
                }
            ]
        };
    };

    nationalMultiplyOption = () => {
        const series = this.props.indexData.national_series.sort((a, b) => {
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

        const index = this.props.indexData.national_index;

        return {
            title: {
                text: '指数随疫情趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: tooltipStyle,
            color: ["#d96322", "#0f3046", "#39c4c4", "#bcafb1"],
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
            yAxis: [{
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
            }, {
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
            }],
            series: [
                {
                    name: '确诊',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: confirmedSeries
                },
                {
                    name: '死亡',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: deathsSeries
                },
                {
                    name: '治愈',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: false,
                    data: curesSeries
                },
                {
                    name: '指数',
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    showAllSymbol: false,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                color: '#bcafb1',
                                type: 'dotted'  //'dotted'虚线 'solid'实线
                            }
                        }
                    },
                    data: index
                }
            ]
        };
    };

    shanghaiIndexOption = () => {
        const series = this.props.indexData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5).replace("-", ".");
        });

        xAxis.pop();

        const index = this.props.indexData.shanghai_index;

        return {
            title: {
                text: '新冠病毒搜索指数',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: tooltipStyle,
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
            series: [{
                name: '搜索指数',
                smooth: true,
                type: 'line',
                showAllSymbol: false,
                color:'#CCFF99',
                data: index
            }]
        }
    };

    nationalIndexOption = () => {
        const series = this.props.indexData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5).replace("-", ".");
        });

        xAxis.pop();

        const index = this.props.indexData.national_index;

        return {
            title: {
                text: '新冠病毒搜索指数',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: tooltipStyle,
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
            series: [{
                name: '搜索指数',
                smooth: true,
                type: 'line',
                showAllSymbol: false,
                data: index,
                color:'#CCFF99'
            }]
        }
    };
}

export default SearchIndex;
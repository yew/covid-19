import React from "react";
import "./SearchIndex.css";
import Tabs from './Tabs';
import EpidemicTitleImg from "../../assets/img/index_title.png";
import logoImg from "../../assets/img/logo.png";
import ReactEcharts from "echarts-for-react";

class SearchIndex extends React.Component {
    render() {
        return (
            <div className="index-container">
                <div className="header" style={{backgroundColor: "#3366cc"}}>
                    <p>抗击肺炎</p>
                    <img className="title" src={EpidemicTitleImg} alt="搜索指数"/>
                    <img className="logo" src={logoImg} alt=""/>
                </div>
                <div className="pneumonia-block-container">

                    <div className="block-title">
                        <p className="title">搜索指数对比图</p>
                        <p className="update-time">数据来源于百度搜索指数</p>
                    </div>
                    <div>
                        <Tabs>
                            <div label="上海搜索指数">
                                <div className="epidemic-index">
                                    <ReactEcharts option={this.shanghaiIndexOption()} style={{height: "250px"}}/>
                                </div>
                                <div className="epidemic-index">
                                    <ReactEcharts option={this.shanghaiMultiplyOption()} style={{height: "250px"}}/>
                                </div>
                            </div>
                            <div label="全国搜索指数">
                                <div className="epidemic-index">
                                    <ReactEcharts option={this.nationalIndexOption()} style={{height: "250px"}}/>
                                </div>
                                <div className="epidemic-multiply">
                                    <ReactEcharts option={this.nationalMultiplyOption()} style={{height: "250px"}}/>
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
        const deathsSeries = series.map((item) => {
            return item.deathsNum;
        });
        const curesSeries = series.map((item) => {
            return item.curesNum;
        });

        const index = this.props.indexData.shanghai_index;

        return {
            title: {
                text: '混合版本',
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
                text: '混合版本',
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
                data: index
            }]
        }
    };
}

export default SearchIndex;
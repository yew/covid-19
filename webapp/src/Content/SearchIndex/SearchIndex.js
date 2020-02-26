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
                    <p>
                        <img className="cooperate" src={logoImg} alt=""/>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAyLTI2VDExOjE2OjIxKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMi0yNlQxMToxODo1NiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMi0yNlQxMToxODo1NiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MTA0NWI1OS1iMTNkLTFiNGEtOTUxMi00MDI5MmQ5NjZjYmMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ5MGVjYTMtZmQwNS1lNTRmLTg4ZjEtNGQxZDY0ZTU0NTEwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTQ5MGVjYTMtZmQwNS1lNTRmLTg4ZjEtNGQxZDY0ZTU0NTEwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDkwZWNhMy1mZDA1LWU1NGYtODhmMS00ZDFkNjRlNTQ1MTAiIHN0RXZ0OndoZW49IjIwMjAtMDItMjZUMTE6MTY6MjErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODEwNDViNTktYjEzZC0xYjRhLTk1MTItNDAyOTJkOTY2Y2JjIiBzdEV2dDp3aGVuPSIyMDIwLTAyLTI2VDExOjE4OjU2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0rfMsgAAAdBJREFUeJzt2lFrw0AMA2B17P//5fRlfWggVZKzZK9IMBgMdr5vXZJz/Ni2DclxfroLmJ4AkQSIJEAkASIJEEmASAJEEiCSAJEEiCRAJAEiqQDa/r6mpaSuVaBt9/0EqH0dSzWtAB0t3IlUXpPqGtSBJFlzBehBfu5EYmuxWg+jvos5kKRrrAKd+csoN3Dmd9/+9AA1n6AuJDkOUPcv5kay4AC11yAXkg0HqL9Iq5GsOIDmLqZCsuMAutt8NVILDqB9DqpCasMB9A+Kq0itOICnH3QXqR0H8DXMriKNwAG8HcWzSGNwAH/LtWJjNhygpye9skErDtDXtL+zUTsO0PtW48qGW3CAvPah6QSqPmpI0gWkOqyWpwNI3e4ojRvI1TArixPo7BNy94uAt7iArh4fxiA5gO6erUYgTXhx+AmiHUkJVHUqb0XqHF6oPmqMG144iqqf04JUDaRudtmRKoFcnUArUhWQu01qQ6oa4mRR9HMsSJVDnEdRNrvkSBNeHI5eQzHl+oqzTSqbl+wcXvgXayqmXNsa7B/Wbpty3bcoOnFe2dexVNPvWi3rBQgzbkbxKxMgkgCRBIgkQCQBIgkQSYBIAkQSIJIAkQSIJEAkT/MXUY10wyFQAAAAAElFTkSuQmCC"
                            style={{height: "12px", transform: "translateY(2px)", margin: "0 4px"}} alt=""/>
                        抗击肺炎
                    </p>
                    <img className="title" src={EpidemicTitleImg} alt="搜索指数"/>
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
                data: index
            }]
        }
    };
}

export default SearchIndex;
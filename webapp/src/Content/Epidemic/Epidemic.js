import React from "react";
import "./Epidemic.css";
import EpidemicBannerImg from "../../assets/img/epidemic_banner.png";
import EpidemicTitleImg from "../../assets/img/epidemic_title.png";
// import QuestionMarkImg from "../../assets/img/question_mark.png";
import moment from "moment";
import ReactEcharts from "echarts-for-react";


class Epidemic extends React.Component {
    render() {
        const confirmedIncr = `+${this.props.shanghaiData.cityIncr.confirmedIncr}`;
        const deathsIncr = `+${this.props.shanghaiData.cityIncr.deathsIncr}`;
        const curesIncr = `+${this.props.shanghaiData.cityIncr.curesIncr}`;

        return (
            <div className="pneumonia-container">
                <div className="header" style={{backgroundImage: `url("${EpidemicBannerImg}")`}}>
                    <p>上海市</p>
                    <img src={EpidemicTitleImg} alt="新型冠状病毒疫情追踪"/>
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
                                <span>较昨日</span>
                                <span className="num">{confirmedIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.confirmedTotal}</p>
                            <p className="text">累计确诊</p>
                        </div>
                        <div className="total-dead">
                            <p className="compare">
                                <span>较昨日</span>
                                <span className="num">{deathsIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.deathsTotal}</p>
                            <p className="text">死亡</p>
                        </div>
                        <div className="total-heal">
                            <p className="compare">
                                <span>较昨日</span>
                                <span className="num">{curesIncr}</span>
                            </p>
                            <p className="num">{this.props.shanghaiData.cityTotal.curesTotal}</p>
                            <p className="text">治愈</p>
                        </div>
                    </div>
                    <div className="epidemic-trends">
                        <ReactEcharts option={this.getOption()} style={{height: "250px"}}/>
                        <div className="epidemic-trends-legend">
                            <span className="confirmed">确诊</span>
                            <span className="heal">治愈</span>
                            <span className="dead">死亡</span>
                        </div>
                    </div>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">区县分布</p>
                        <p className="update-time">依据卫健委数据按日更新，非实时数据</p>
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

    getOption = () => {
        const series = this.props.shanghaiData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date.slice(5);
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

        return {
            title: {
                text: '最新疫情趋势',
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
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
                }
            ]
        };
    }
}

export default Epidemic;
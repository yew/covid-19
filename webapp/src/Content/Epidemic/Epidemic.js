import React from "react";
import "./Epidemic.css";
import EpidemicBannerImg from "../../assets/img/epidemic_banner.png";
import EpidemicTitleImg from "../../assets/img/epidemic_title.png";
// import QuestionMarkImg from "../../assets/img/question_mark.png";
import moment from "moment";
import ReactEcharts from "echarts-for-react";


class Epidemic extends React.Component {
    render() {
        return (
            <div>
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
                            <p className="num">{this.props.shanghaiData.cityTotal.confirmedTotal}</p>
                            <p className="text">确诊人数</p>
                        </div>
                        <div className="total-dead">
                            <p className="num">{this.props.shanghaiData.cityTotal.deathsTotal}</p>
                            <p className="text">死亡人数</p>
                        </div>
                        <div className="total-heal">
                            <p className="num">{this.props.shanghaiData.cityTotal.curesTotal}</p>
                            <p className="text">治愈人数</p>
                        </div>
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
        );
    }

    getOption = () => {
        const series = this.props.shanghaiData.series.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const xAxis = series.map((item) => {
            return item.date;
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
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '确诊',
                    type: 'line',
                    smooth: true,
                    data: confirmedSeries
                },
                {
                    name: '死亡',
                    type: 'line',
                    smooth: true,
                    data: deathsSeries
                },
                {
                    name: '治愈',
                    type: 'line',
                    smooth: true,
                    data: curesSeries
                }
            ]
        };
    }
}

export default Epidemic;
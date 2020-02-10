import React from "react";
import "./Epidemic.css";
import EpidemicBannerImg from "../../assets/img/epidemic_banner.png";
import EpidemicTitleImg from "../../assets/img/epidemic_title.png";
// import QuestionMarkImg from "../../assets/img/question_mark.png";
import moment from "moment";


class Epidemic extends React.Component {
    render() {
        console.log(this.props);
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
                            {/*更新时间 2020/02/10 20:41*/}
                            {moment(this.props.shanghaiData.updateTime * 1000).format("YYYY/MM/DD h:mm")}
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
            </div>
        );
    }
}

export default Epidemic;
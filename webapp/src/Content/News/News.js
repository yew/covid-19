import React from "react";
// import NewsBannerImg from "../../assets/img/news_banner.jpg";
import NewsTitleImg from "../../assets/img/news_title.png";
import "./News.css";
import Axios from "axios";
import API from "../../Utils/Config";
import Loading from "../../Loading/Loading";


class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null
        }
    }

    async componentDidMount() {
        if (this.props.news) {
            this.setState({news: this.props.news})
        } else {
            const data = (await Axios.get(API.news)).data;
            this.setState({
                news: data
            });
            this.props.collectData("news", data);
        }
    }

    render() {
        let dom = <Loading/>;
        if (this.state.news) {
            dom =
                <div className="pneumonia-container">
                    <div className="header" style={{backgroundColor: "#367ccf"}}>
                        <p className="title">抗击肺炎</p>
                        <img className="news-title" src={NewsTitleImg} alt="最新进展专区"/>
                        <div className="source">引自今日头条</div>
                    </div>
                    <div className="pneumonia-block-container">
                        <div className="block-title">
                            <p className="title">疫情追踪</p>
                        </div>
                        <div className="card-list">
                            {
                                this.state.news.map((item, index) => {
                                    let img = "";
                                    if (item.event_image_url) {
                                        img =
                                            <div className="base_image">
                                                <img className="base_image-content"
                                                     src={item.event_image_url}
                                                     alt="新闻图片"/>
                                            </div>
                                    }
                                    return (
                                        <div className="timeline-item" key={index}>
                                            <div className="bot-background">
                                                <span className="bot-cor"/>
                                                <span
                                                    className="item-timestamp">{item.showtime_string === "未来" ? "刚刚" : item.showtime_string}</span>
                                                <div className="item-description">{item.desc}</div>
                                                {img}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="list-bottom">已加载全部内容</div>
                    </div>
                </div>
        }
        return dom;
    }
}

export default News;
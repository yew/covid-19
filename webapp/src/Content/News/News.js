import React from "react";
import NewsBannerImg from "../../assets/img/news_banner.jpg";
import NewsTitleImg from "../../assets/img/news_title.png";
import "./News.css";


class News extends React.Component {
    render() {
        return (
            <div className="pneumonia-container">
                <div className="header" style={{backgroundImage: `url("${NewsBannerImg}")`}}>
                    <p>抗击肺炎</p>
                    <img className="news-title" src={NewsTitleImg} alt="最新进展专区"/>
                </div>
                <div className="pneumonia-block-container">
                    <div className="block-title">
                        <p className="title">疫情追踪</p>
                    </div>
                    <div className="card-list">
                        {
                            this.props.news.map((item, index) => {
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
                                            <span className="item-timestamp">{item.showtime_string}</span>
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
        );
    }
}

export default News;
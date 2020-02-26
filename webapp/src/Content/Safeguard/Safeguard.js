import React from "react";
// import SafeguardBannerImg from "../../assets/img/safeguard_banner.jpg";
import SafeguardTitleImg from "../../assets/img/safeguard_title.png";
import "./Safeguard.css";
import PlayIcon from "../../assets/img/paly.png";
import {durationFormat} from "../../Utils/Utils";
import Loading from "../../Loading/Loading";
import Axios from "axios";
import API from "../../Utils/Config";


class Safeguard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            safeguard: null
        }
    }

    async componentDidMount() {
        if (this.props.safeguard) {
            this.setState({safeguard: this.props.safeguard})
        } else {
            const data = (await Axios.get(API.safeguard)).data;
            this.setState({
                safeguard: data
            });
            this.props.collectData("safeguard", data);
        }
    }

    getCover = (article) => {
        let cover;
        if (article.has_video) {
            cover = (
                <div className="image-container">
                    <img src={article.img_url} alt="新闻图片"/>
                    <div className="video-play">
                        <img src={PlayIcon} alt="播放"/>
                    </div>
                    <span className="video-duration">{durationFormat(article.video_duration)}</span>
                    <div className="image-cover"/>
                </div>
            );
        } else {
            cover = (
                <div className="image-container">
                    <img src={article.img_url} alt="新闻图片"/>
                    <div className="image-cover"/>
                </div>
            );
        }
        return cover;
    };

    render() {
        let dom = <Loading/>;
        if (this.state.safeguard) {
            dom =
                <div className="pneumonia-container">
                    <div className="header" style={{backgroundColor: "#4ea1eb"}}>
                        <p className="title">抗击肺炎</p>
                        <img className="news-title" src={SafeguardTitleImg} alt="最新进展专区"/>
                        <div className="source">引自今日头条</div>
                    </div>
                    {
                        this.state.safeguard.map((block, block_index) => {
                            return (
                                <div className="pneumonia-block-container" key={block_index}>
                                    <div className="block-title">
                                        <p className="title">{block.block_title}</p>
                                    </div>
                                    <div className="card-list">
                                        {
                                            block.article_list.map((article, article_index) => {
                                                return (
                                                    <div className="article-card" key={article_index}
                                                         onClick={() => window.location.href = article.url}>
                                                        <div className="article-container" key={article_index}>
                                                            <p>{article.title}</p>
                                                            <div className="article-source">{article.source}</div>
                                                        </div>
                                                        {
                                                            this.getCover(article)
                                                        }
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
        }
        return dom;
    }
}

export default Safeguard;
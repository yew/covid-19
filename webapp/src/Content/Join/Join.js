import React from "react";
// import SafeguardBannerImg from "../../assets/img/safeguard_banner.jpg";
import SafeguardTitleImg from "../../assets/img/safeguard_title.png";
import "./Join.scss";
import JoinImg from "../../assets/img/join.jpg";
import {durationFormat} from "../../Utils/Utils";


class Join extends React.Component {

    render() {
        return (
            <div className="join-container">
                <img alt={"https://www.wjx.cn/jq/60043229.aspx"} className={"qr-code"} src={JoinImg}/>
                <div>如果你对这个小项目的开发感兴趣<br/>请扫码与我们联系！</div>
            </div>
        );
    }
}

export default Join;
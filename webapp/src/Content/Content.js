import React from "react";
import "./Content.css";
import Loading from "../Loading/Loading";
import Epidemic from "./Epidemic/Epidemic";
import Community from "./Community/Community";
import News from "./News/News";
import Safeguard from "./Safeguard/Safeguard";
import QnA from "./QnA/QnA";

class Content extends React.Component {
    render() {
        let content = <Loading/>;
        switch (this.props.active) {
            case 0:
                if (this.props.shanghaiData)
                    content = <Epidemic shanghaiData={this.props.shanghaiData}/>;
                break;
            case 1:
                content = <div>搜索指数专区</div>;
                break;
            case 2:
                content = <Community/>;
                break;
            case 3:
                if (this.props.news)
                    content = <News news={this.props.news}/>;
                break;
            case 4:
                if (this.props.safeguard)
                    content = <Safeguard safeguard={this.props.safeguard}/>;
                break;
            case 5:
                content = <QnA/>;
                break;
            default:
                break;
        }

        return (
            <div className="content">
                {content}
            </div>
        );
    }
}

export default Content;

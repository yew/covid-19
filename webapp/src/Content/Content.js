import React from "react";
import "./Content.css";
import Loading from "../Loading/Loading";
import Epidemic from "./Epidemic/Epidemic";
import Community from "./Community/Community";
import News from "./News/News";
import Safeguard from "./Safeguard/Safeguard";
import QnA from "./QnA/QnA";
import SearchIndex from "./SearchIndex/SearchIndex";
import Join from "./Join/Join";

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shanghaiData: null,
            news: null,
            safeguard: null,
            indexData: null
        }
    }

    collectData = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    render() {
        let content = <Loading/>;
        switch (this.props.active) {
            case 0:
                content = <Epidemic shanghaiData={this.state.shanghaiData} collectData={this.collectData}/>;
                break;
            case 1:
                content = <SearchIndex indexData={this.state.indexData} collectData={this.collectData}/>;
                break;
            case 2:
                content = <QnA/>;
                break;
            case 3:
                content = <Community/>;
                break;
            case 4:
                content = <News news={this.state.news} collectData={this.collectData}/>;
                break;
            case 5:
                content = <Safeguard safeguard={this.state.safeguard} collectData={this.collectData}/>;
                break;
            case 6:
                content = <Join/>;
                break;
            default:
                break;
        }

        return (
            <div className="content" id="content">
                {content}
            </div>
        );
    }
}

export default Content;

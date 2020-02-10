import React from "react";
import "./Content.css";
import Epidemic from "./Epidemic/Epidemic";
import Community from "./Community/Community";
import News from "./News/News";
import Safeguard from "./Safeguard/Safeguard";

class Content extends React.Component {
    render() {
        let content = "";
        switch (this.props.active) {
            case 0:
                if (this.props.shanghaiData)
                    content = <Epidemic shanghaiData={this.props.shanghaiData}/>;
                break;
            case 1:
                content = <Community/>;
                break;
            case 2:
                content = <News/>;
                break;
            case 3:
                content = <Safeguard/>;
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

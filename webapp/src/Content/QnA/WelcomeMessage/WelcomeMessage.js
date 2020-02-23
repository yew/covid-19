import React from "react";


class WelcomeMessage extends React.Component {
    render() {
        return (
            <div className="message-in">
                <div className="content-wrapper">
                    <p><span>点击热门问题：</span></p>
                    {this.props.related.map((s, idx) => <p
                        key={idx}
                        onClick={this.getHandleClick(idx)}
                    ><span>🧡</span><span style={{
                        marginLeft: "1em",
                        pointer: "cursor",
                        color: "#3764ed",
                        textDecoration: "underline",
                    }}>{s}</span></p>)}
                    <p><span>或者您也可以直接输入您的疑问</span></p>
                </div>
            </div>
        );
    }

    getHandleClick = (idx)=>{
        return () => {
            this.props.handleClick(idx);
        }
    }
}

export default WelcomeMessage;
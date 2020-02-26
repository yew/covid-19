import React from "react";


class YouMayWantMessage extends React.Component {
    render() {
        return (
            <div className="message-in">
                <div className="content-wrapper">
                    <p><span>您可能还想知道：</span></p>
                    {this.props.related.map((s, idx) => <p
                        key={idx}
                        style={{display: "flex"}}
                        onClick={this.getHandleClick(idx)}
                    ><span role="img" aria-label="heart">❤️</span><span style={{
                        marginLeft: ".5em",
                        pointer: "cursor",
                        color: "#3764ed",
                        textDecoration: "underline",
                    }}>{s}</span></p>)}
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

export default YouMayWantMessage;
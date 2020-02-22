import React from "react";


class InboundMessage extends React.Component {
    render() {
        return (
            <div className="message-in">
                <div className="content-wrapper">
                    {this.props.content.split("\n").map(s => <p>{s}</p>)}
                </div>
            </div>
        );
    }
}

export default InboundMessage;
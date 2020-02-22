import React from "react";


class OutboundMessage extends React.Component {
    render() {
        return (
            <div className="message-out">
                <div className="content-wrapper">
                {this.props.content}
                </div>
            </div>
        );
    }
}

export default OutboundMessage;
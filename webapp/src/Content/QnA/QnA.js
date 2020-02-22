import React from "react";
// import NewsBannerImg from "../../assets/img/news_banner.jpg";
import NewsTitleImg from "../../assets/img/news_title.png";
import logoImg from "../../assets/img/logo.png";
import "./QnA.css";
import QATitleImg from "../../assets/img/qa_title.png";
import OutboundMessage from "./OutboundMessage/OutboundMessage";
import InboundMessage from "./InboundMessage/InboundMessage";
import Axios from "axios";
import API from "../../Utils/Config";
import YouMayWantMessage from "./YouMayWantMessage/YouMayWantMessage";

const pseudoMessages = [
    // {content: "什么是新冠病毒", type: "out", related: []},
    // {content: "新冠病毒是一种很厉害的病毒，致死率较SARS低，但是传染能力很强", type: "in", related: []},
    // {content: "如果我不幸染上了新冠病毒，而且我又没有钱去医院，也没经常刷微博所以没屯口罩，那我如何进行居家隔离", type: "out", related: []},
    // {content: "不信谣不传谣，定时向社区报告身体情况，一定不要外出", type: "in", related: []},
    // {content: "易感人群", type: "out", related: []},
    // {content: "所有人都是易感人群，但就目前确诊情况看，中老年朋友尤其需要注意防护", type: "in"},
    // {content: "什么是新冠病毒", type: "out"},
    // {content: "新冠病毒是一种很厉害的病毒，致死率较SARS低，但是传染能力很强", type: "in"},
    // {content: "如果我不幸染上了新冠病毒，而且我又没有钱去医院，也没经常刷微博所以没屯口罩，那我如何进行居家隔离", type: "out"},
    // {content: "不信谣不传谣，定时向社区报告身体情况，一定不要外出", type: "in"},
    // {content: "易感人群", type: "out"},
    // {content: "所有人都是易感人群，但就目前确诊情况看，中老年朋友尤其需要注意防护", type: "in"},
    // {content: "什么是新冠病毒", type: "out"},
    // {content: "新冠病毒是一种很厉害的病毒，致死率较SARS低，但是传染能力很强", type: "in"},
    // {content: "如果我不幸染上了新冠病毒，而且我又没有钱去医院，也没经常刷微博所以没屯口罩，那我如何进行居家隔离", type: "out"},
    // {content: "不信谣不传谣，定时向社区报告身体情况，一定不要外出", type: "in"},
    // {content: "易感人群", type: "out"},
    // {content: "所有人都是易感人群，但就目前确诊情况看，中老年朋友尤其需要注意防护", type: "in"},
];

class QnA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            messages: pseudoMessages,
        };
    }

    render() {
        return (
            <div className="qa-container">
                <div className="header">
                    <p>抗击肺炎</p>
                    <img className="qa-title" src={QATitleImg} alt="智能问答专区"/>
                    <img className="logo" src={logoImg} alt=""/>
                </div>
                <div className="qa-content-area">
                    {pseudoMessages.map((element, idx) => {
                        if (element.type === "out") {
                            return <OutboundMessage key={idx} content={element.content}/>;
                        } else if (element.type === "in") {
                            return <InboundMessage key={idx} content={element.content}/>;
                        } else if (element.type === "you_may_want") {
                            return <YouMayWantMessage
                                key={idx}
                                related={element.related}
                                handleClick={(i) => this.sendQ(element.related[i])}/>;
                        }
                    })}
                    <div style={{float: "left", clear: "both"}}
                         ref={(el) => {
                             this.messagesEndRef = el;
                         }}>
                    </div>
                </div>
                <div className="qa-input-area">
                    <div className="input-wrapper">
                        <input
                            placeholder={"输入想要咨询的问题，如：潜伏期多久？"}
                            type={"text"}
                            onChange={this.handleQuestionInputChange}
                            value={this.state.question}/>
                    </div>
                    <div className="btn-wrapper">
                        <div
                            className={"send-btn"}
                            onClick={this.handleSendClick}
                        >发送
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    scrollToBottom = () => {
        this.messagesEndRef.scrollIntoView({behavior: "smooth"});
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleQuestionInputChange = (event) => {
        this.setState({
            question: event.target.value,
        });
    };

    handleSendClick = () => {
        if (this.state.question.length > 0) {
            this.sendQ(this.state.question).then(() => {
                this.setState({
                    question: "",
                });
            });
        }
    };

    sendQ = async (questionContent) => {
        this.state.messages.push({
            type: "out",
            content: questionContent,
        });
        return new Promise(resolve => {
            this.forceUpdate(() => {
                this.requestQA(questionContent);
                resolve();
            });
        });
    };

    requestQA = async (questionContent) => {
        const response = await Axios.post(API.qa, {question: questionContent});
        const {question, answer, related} = response.data;
        console.log(response.data);
        this.state.messages.push({
            type: "in",
            content: `Q:${question}\nA:${answer}`,
        });
        this.state.messages.push({
            type: "you_may_want",
            related,
        });
        return new Promise(resolve => {
            this.forceUpdate(() => {
                resolve();
            });
        });
    };
}

export default QnA;
import React from 'react';
import './Tab.css';


class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: ["上海疫情", "搜索指数", "智能问答", "确诊小区", "最新进展", "个人防护"],
            active: 0
        }
    }

    render() {
        return (
            <div className="tab">
                <div className="tab-wrapper">
                    {
                        this.state.tabList.map((item, index) => {
                            let classNameStr = "tab-item";
                            if (index === this.props.active) {
                                classNameStr += " active";
                            }
                            return (
                                <div className={classNameStr} key={index} onClick={() => {
                                    this.clickTab(index)
                                }}>{item}</div>
                            )
                        })
                    }
                    <div className="tab-line" style={{transform: `translate3d(${this.state.active * 100}%, 0px, 0px)`}}>
                        <div className="tab-line-center"/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            active: this.props.active
        })
    }

    clickTab = (index) => {
        this.setState({
            active: index
        });
        this.props.changeTab(index);
    }
}

export default Tab;

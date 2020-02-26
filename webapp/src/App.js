import React from 'react';
import Tab from './Tab/Tab';
import Content from './Content/Content';
import './App.css';
import Axios from "axios";
import API from "./Utils/Config";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    componentDidMount() {
        Axios.get(API.ok);
    }

    render() {
        return (
            <div className="app">
                <Tab active={this.state.activeIndex} changeTab={this.changeTab}/>
                <Content active={this.state.activeIndex}/>
            </div>
        );
    }

    changeTab = (activeIndex) => {
        this.setState({
            activeIndex: activeIndex
        })
    }
}

export default App;

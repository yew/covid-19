import React from 'react';
import Tab from './Tab/Tab';
import Content from './Content/Content';
import './App.css';
import API from "./Utils/Config";
import Axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            shanghaiData: null,
            news: null,
            safeguard: null
        }
    }

    async componentDidMount() {
        this.setState({
            shanghaiData: (await Axios.get(API.shanghai)).data,
            news: (await Axios.get(API.news)).data,
            safeguard: (await Axios.get(API.safeguard)).data
        });
    };

    render() {
        return (
            <div className="app">
                <Tab active={this.state.active} changeTab={this.changeTab}/>
                <Content
                    active={this.state.active}
                    shanghaiData={this.state.shanghaiData}
                    news={this.state.news}
                    safeguard={this.state.safeguard}
                />
            </div>
        );
    }

    changeTab = (activeIndex) => {
        this.setState({
            active: activeIndex
        })
    }
}

export default App;

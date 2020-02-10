import React from 'react';
import Tab from './Tab/Tab';
import Content from './Content/Content';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }

    render() {
        return (
            <div className="app">
                <Tab active={this.state.active} changeTab={this.changeTab}/>
                <Content active={this.state.active}/>
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

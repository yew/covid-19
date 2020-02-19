import React from "react";
import "./PoiListModal.css";
import searchIcon from "../../../assets/img/search.png";


class PoiListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            district_data: []
        };
    }

    componentDidMount() {
        this.getDistrictData(this.props.track_list);
    }

    getDistrictData = (track_list) => {
        const near = [];
        let district_data = {};
        track_list.forEach(area => {
                if (area.distance < 5) {
                    near.push(area);
                }
                if (area.area_name in district_data) {
                    district_data[area.area_name].push(area)
                } else {
                    district_data[area.area_name] = [area]
                }
            }
        );
        const temp_data = [];
        Object.keys(district_data).forEach(key => {
            temp_data.push(district_data[key]);
        });
        temp_data.sort((a, b) => b.length - a.length);

        near.sort((a, b) => a.distance - b.distance);
        temp_data.unshift(near);

        this.setState({
            district_data: temp_data.map((district, index) => {
                if (index === 0) {
                    return ["5公里以内", district];
                }
                return [district[0].poi_name, district];
            })
        })
    };

    handleInputChange = (e) => {
        this.handleSearch(e.target.value);
    };

    handleSearch = (text) => {
        const filtered_track_list = this.props.track_list.filter(area => {
            return area.poi_name.indexOf(text) !== -1 ||
                (area.city + area.area_name + area.township).indexOf(text) !== -1;
        });
        this.getDistrictData(filtered_track_list);
    };

    render() {
        return (
            <div className="poi-list-modal">
                <div className="poi-list-modal-mask" onClick={this.props.close}/>
                <div className="poi-list-modal-container">
                    <div className="poi-list-modal-header">
                        <div className="poi-list-modal-header-left">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAA31JREFUeAHt282KGkEQB3A/VhAWFGLAixpQDwYP5hEk75AcsoeckntOeZqwm0NySCDZJwj7El4ExayHEFYiyCYrKjH1BxvawThjd3W3CzUg43x0V81vp2ecnt5USiYREAEREAEREAEREAEREAEREAEREIH7JZC1Tbfdbj8oFAoPp9PpzLYuzvL1er1WLpdPJpPJnU29GZvCzWbzzXw+/7ler68bjcZ5t9s9samPoyxyoFwuqK7vy+XyB3K0qTdtWrjVapWQAOHkVB3pdPpztVp9cXV1tVLrfM6BMx6PP1JOz1RcymmVz+fLvV7vl1p3yNz4DFosFqc6DoIiMSQY4kzahbPJ6YTO8tNDUPR9jYGGw+E1/XUu9MrwPQTS/3CQTyaTOR8MBmN8N5mMgRCMmtMrNKtoYJ9I+3CQW6VSeR3N75Blq7vYaDT62+l0vs5ms8cUtB0J3MZ6bMd+kW0si3E4HNdDKyAcZSgkHzg4PmugEEi+cNiAfCL5xGEF8oHkG4cdKILUomW2C3cMzie6IJ+5+IHKcg0CjD5tLtyXdBdjQQqFg2NyAoSKuZBC4jgF4kAKjeMcyAbpGHC8AJkgHQsOcjfu7kDhQ6fNgX+gZ7Xn0bJ4bsKjAdZHuyzUvrSPs7uVihGdewVC8Dgk7IOHXcz1KQQO4nsHQtB9SNgenULhIA9nt/noQerLMT8B9F1TIXGQSBAgBE6CFBoHeVp1mKEChmlfM9+3jSF0fBXBzqDNdWirg31Hus473XbE3FoVBCghjko0KJJ3oH04uObQp0cybL0AStl07hUoDgddFsVi8QtXL4Apil7OG1ASHPTnxNzdvDc3L0AxOHjE2OrsOiYk50AJcHa+qtaQgrxSUs3MKZApjkpugxTsvRvycAZki3MsSE6AuHCOAYkdiBsnNBIrkCuckEhsQK5xQiGxAPnCCYFkDeQbxzeSFVAoHJ9IVkDZbPYddbCfqYTVnJ7IvQ3mTPBj8hENUb5UuR06N+6xo6G2VcK5jgb0iaPHjjmba6bjFI27XGlo7W/C2BruGwoHUOgJwHs15KDD0fIyl8v90dcd8t24id3c3NyVSqVbCvaUPllK5D0l+NLFEJSkB6Q1txqVeUI5rejztt/vf0taB/t+GFCO5sZesWWFyAn/JmFZjRQXAREQAREQAREQAREQAREQAREQARG4dwL/AHQ32qyCuSxAAAAAAElFTkSuQmCC"
                                style={{height: "28px"}} alt="" onClick={this.props.close}/>
                        </div>
                        <div
                            className="poi-list-modal-header-content">{this.props.track_list.length ? this.props.track_list.length + "个公布场所" : null}
                        </div>
                        <div className="poi-list-modal-header-right">
                        </div>
                    </div>
                    <div className="poi-list-modal-body">
                        <div className="poi-list-modal-area-search">
                            <div className="poi-list-modal-area-search-input-container">
                                <input type="text" placeholder="请输入小区名或街道名来搜索" onChange={this.handleInputChange}/>
                            </div>
                            <img src={searchIcon} alt=""/>
                        </div>
                        <div className="poi-list-modal-area-filter"></div>
                        <div className="poi-list-modal-list">
                            {
                                this.state.district_data.map((section, section_index) => {
                                    return (
                                        section[1].length ?
                                            <div className="poi-list-modal-list-section" key={section_index}>
                                                <div className="poi-list-modal-list-section-title">
                                                    {section[0]}（{section[1].length}个场所）
                                                </div>
                                                <div className="poi-list-modal-list-section-content">
                                                    {section[1].map((area, index) => {
                                                        return (
                                                            <div className="poi-list-modal-list-item" key={index}>
                                                                <div className="poi-list-modal-list-item-info">
                                                                    <p className="poi-list-modal-list-item-name">{area.poi_name}</p>
                                                                    <div className="poi-list-modal-list-item-location">
                                                                        {area.distanceStr ? <div
                                                                            className="poi-list-modal-list-item-distance">{area.distanceStr}</div> : null}
                                                                        <div
                                                                            className="poi-list-modal-list-item-address">{area.city + area.area_name + area.township}</div>
                                                                    </div>
                                                                </div>
                                                                <i className="poi-list-modal-list-item-icon"/>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div> : null
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PoiListModal;
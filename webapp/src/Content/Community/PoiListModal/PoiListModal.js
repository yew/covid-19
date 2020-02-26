import React from "react";
import "./PoiListModal.css";
import searchIcon from "../../../assets/img/search.png";
import {getDistance, getDistanceStr} from "../../../Utils/Utils";

const AMap = window.AMap;

class PoiListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            near: [],
            district: []
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
        near.sort((a, b) => a.distance - b.distance);
        this.setState({near});

        const district = [];
        Object.keys(district_data).forEach(key => {
            district.push(district_data[key]);
        });
        district.sort((a, b) => b.length - a.length);

        this.setState({district});
    };

    handleInputChange = (e) => {
        this.handleSearch(e.target.value);
    };

    getTextPoi = (text) => {

        AMap.plugin('AMap.Geocoder', () => {
            const geocoder = new AMap.Geocoder({
                city: "021",
            });
            geocoder.getLocation(text, function (status, result) {
                if (status === 'complete') {
                    const location = result.geocodes[0].location;
                    getPositionComplete(location);
                }
            });
        });

        const getPositionComplete = (data) => {
            const position = [data.lng, data.lat];
            this.props.track_list.forEach(area => {
                area.distance = getDistance(area.poi, position);
                area.distanceStr = getDistanceStr(area.distance);
            });

            const track_list = this.props.track_list;
            this.getDistrictData(track_list);
        };

    };

    handleSearch = (text) => {
        this.getTextPoi(text);
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
                            {this.state.near.length ? (
                                <div className="near-container">
                                    <div className="district-title">距您5公里以内的场所</div>
                                    <div className="poi-list-modal-list-section">
                                        <div className="poi-list-modal-list-section-title">共{this.state.near.length}个场所</div>
                                        <div className="poi-list-modal-list-section-content">
                                            {
                                                this.state.near.map((area, index) => {
                                                    return (
                                                        <div className="poi-list-modal-list-item" key={index}>
                                                            <div className="poi-list-modal-list-item-info">
                                                                <p className="poi-list-modal-list-item-name">{area.poi_name}</p>
                                                                <div className="poi-list-modal-list-item-location">
                                                                    {area.distanceStr ?
                                                                        <div
                                                                            className="poi-list-modal-list-item-distance">{area.distanceStr}
                                                                        </div> : null
                                                                    }
                                                                    <div
                                                                        className="poi-list-modal-list-item-address">{area.city + area.area_name + area.township}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <i className="poi-list-modal-list-item-icon"/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                            ) : null}
                            {this.state.district.length ?
                                <div className="district-container">
                                    <div className="district-title">所有上海场所列表（按区县）</div>
                                    {
                                        this.state.district.map((section, section_index) => {
                                            return (
                                                section.length ? (
                                                    <div className="poi-list-modal-list-section" key={section_index}>
                                                        <div className="poi-list-modal-list-section-title">{section[0].area_name}（{section.length}个场所）</div>
                                                        <div className="poi-list-modal-list-section-content">
                                                            {section.map((area, index) => {
                                                                return (
                                                                    <div className="poi-list-modal-list-item"
                                                                         key={index}>
                                                                        <div className="poi-list-modal-list-item-info">
                                                                            <p className="poi-list-modal-list-item-name">{area.poi_name}</p>
                                                                            <div
                                                                                className="poi-list-modal-list-item-location">
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
                                                    </div>
                                                ) : null
                                            );
                                        })
                                    }
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PoiListModal;
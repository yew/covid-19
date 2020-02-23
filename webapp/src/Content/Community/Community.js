import React from "react";
import "./Community.css";
import {getDistance, getDistanceStr} from "../../Utils/Utils";
import Axios from "axios";
import API from "../../Utils/Config";
import PoiDetailModal from "./PoiDetailModal/PoiDetailModal";
import PoiListModal from "./PoiListModal/PoiListModal";

const AMap = window.AMap;


class Community extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: [121.473701, 31.230416],
            zoom: 10,
            track_list: [],
            show_poi_modal: false,
            poi_detail: {},
            show_list_modal: false
        };
    }

    async componentWillMount() {
        this.setState({
            track_list: (await Axios.get(API.track)).data.map(area => {
                area.poi = area.poi.split(",");
                return area;
            })
        });

        this.createMap();
        this.getPosition();
        this.createMarkers();
    };

    createMap = () => {
        const amap = new AMap.Map("map", {
            center: this.state.center,
            resizeEnable: true,
            mapStyle: "amap://styles/normal",
            zoom: 10
        });
        this.setState({amap: amap});
    };

    getPosition = () => {
        AMap.plugin('AMap.Geolocation', () => {
            const geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                buttonPosition: 'RB',
                buttonOffset: new AMap.Pixel(10, 20),
                // zoomToAccuracy: true
            });
            this.state.amap.addControl(geolocation);
            geolocation.getCurrentPosition((status, result) => {
                if (status === 'complete') {
                    getPositionComplete(result);
                } else {
                    getPositionError(result);
                }
            });
        });

        const getPositionComplete = (data) => {
            const position = [data.position.lng, data.position.lat];
            this.state.track_list.forEach(area => {
                area.distance = getDistance(area.poi, position);
                area.distanceStr = getDistanceStr(area.distance);
            });
        };

        const getPositionError = (data) => {
            console.log(data);
        }
    };

    createMarkers = () => {
        const icon = new AMap.Icon({
            size: new AMap.Size(30, 30),
            image: 'data:image/png;base64,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',
            imageSize: new AMap.Size(30, 30)
        });

        this.state.track_list.forEach((marker) => {
            const m = new AMap.Marker({
                map: this.state.amap,
                icon: icon,
                position: marker.poi,
                extData: marker
            });

            const clickEvent = (e) => {
                const area = e.target.getExtData();
                this.state.amap.setZoomAndCenter(13, area.poi);
                this.setState({
                    poi_detail: {
                        name: area.poi_name,
                        address: area.city + area.area_name + area.township,
                        distance: area.distanceStr
                    },
                    show_poi_modal: true
                })
            };

            m.on("click", clickEvent);
        });
    };

    render() {
        return (
            <div className="community">
                <div id="map"/>
                <div className="bottom-bar">
                    <div className="tool-item" onClick={() => {
                        this.setState({show_list_modal: true})
                    }}>
                        <i/>
                        <div className="tool-item-name">搜索 / 查看列表</div>
                    </div>
                </div>
                {this.state.show_poi_modal ?
                    <PoiDetailModal poi={this.state.poi_detail}
                                    close={() => this.setState({show_poi_modal: false})}/>
                    : null}
                {this.state.show_list_modal ?
                    <PoiListModal track_list={this.state.track_list}
                                  close={() => this.setState({show_list_modal: false})}/>
                    : null}
            </div>
        );
    }
}

export default Community;
import React from "react";
import "./PoiDetailModal.css";


class PoiDetailModal extends React.Component {
    render() {
        return (
            <div className="poi-detail-modal">
                <div className="poi-detail-modal-mask" onClick={this.props.close}/>
                <div className="poi-detail-modal-container">
                    <div className="poi-item-container">
                        <div className="poi-item-header">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAA31JREFUeAHt282KGkEQB3A/VhAWFGLAixpQDwYP5hEk75AcsoeckntOeZqwm0NySCDZJwj7El4ExayHEFYiyCYrKjH1BxvawThjd3W3CzUg43x0V81vp2ecnt5USiYREAEREAEREAEREAEREAEREAEREIH7JZC1Tbfdbj8oFAoPp9PpzLYuzvL1er1WLpdPJpPJnU29GZvCzWbzzXw+/7ler68bjcZ5t9s9samPoyxyoFwuqK7vy+XyB3K0qTdtWrjVapWQAOHkVB3pdPpztVp9cXV1tVLrfM6BMx6PP1JOz1RcymmVz+fLvV7vl1p3yNz4DFosFqc6DoIiMSQY4kzahbPJ6YTO8tNDUPR9jYGGw+E1/XUu9MrwPQTS/3CQTyaTOR8MBmN8N5mMgRCMmtMrNKtoYJ9I+3CQW6VSeR3N75Blq7vYaDT62+l0vs5ms8cUtB0J3MZ6bMd+kW0si3E4HNdDKyAcZSgkHzg4PmugEEi+cNiAfCL5xGEF8oHkG4cdKILUomW2C3cMzie6IJ+5+IHKcg0CjD5tLtyXdBdjQQqFg2NyAoSKuZBC4jgF4kAKjeMcyAbpGHC8AJkgHQsOcjfu7kDhQ6fNgX+gZ7Xn0bJ4bsKjAdZHuyzUvrSPs7uVihGdewVC8Dgk7IOHXcz1KQQO4nsHQtB9SNgenULhIA9nt/noQerLMT8B9F1TIXGQSBAgBE6CFBoHeVp1mKEChmlfM9+3jSF0fBXBzqDNdWirg31Hus473XbE3FoVBCghjko0KJJ3oH04uObQp0cybL0AStl07hUoDgddFsVi8QtXL4Apil7OG1ASHPTnxNzdvDc3L0AxOHjE2OrsOiYk50AJcHa+qtaQgrxSUs3MKZApjkpugxTsvRvycAZki3MsSE6AuHCOAYkdiBsnNBIrkCuckEhsQK5xQiGxAPnCCYFkDeQbxzeSFVAoHJ9IVkDZbPYddbCfqYTVnJ7IvQ3mTPBj8hENUb5UuR06N+6xo6G2VcK5jgb0iaPHjjmba6bjFI27XGlo7W/C2BruGwoHUOgJwHs15KDD0fIyl8v90dcd8t24id3c3NyVSqVbCvaUPllK5D0l+NLFEJSkB6Q1txqVeUI5rejztt/vf0taB/t+GFCO5sZesWWFyAn/JmFZjRQXAREQAREQAREQAREQAREQAREQARG4dwL/AHQ32qyCuSxAAAAAAElFTkSuQmCC"
                                style={{height: "28px"}} alt="" onClick={this.props.close}/>
                        </div>
                        <div className="poi-item-body">
                            <div className="poi-item-title-name">{this.props.poi.name}</div>
                            <img
                                src="data:image/png;base64,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"
                                style={{height: "20px"}} alt=""/>
                        </div>
                        <div className="poi-item-desc">
                            {this.props.poi.distance ? <span
                                className="poi-list-modal-list-item-distance">{this.props.poi.distance}</span> : null}
                            <span>{this.props.poi.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PoiDetailModal;
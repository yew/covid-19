import React from "react";
import style from "./Modal.module.css";


class Modal extends React.Component {
    render() {
        let modal = null;
        if (this.props.visible) {
            modal = <div className={style.modal} onClick={this.props.close}>
                <div className={style.modal_mask}/>
                <div className={style.modal_container}>
                    <div className={style.modal_header}>疫情数据说明</div>
                    <div className={style.modal_body_warpper}>
                        <div className={style.modal_body}>
                            <h3>1. 数据来源：</h3>
                            <p>来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据。</p>
                            <h3>2. 数据更新时间：</h3>
                            <p>实时更新全国、各省市数据。部分城市有区县数据，区县数据将依据卫健委数据按日更新，病例数据来自各地卫健委，完整度可能存在差异。因核实计算需要，与官方的发布时间相比，将有一定时间延迟。</p>
                            <h3>3. 部分城市有疫情趋势图，如某一天未取得数据，则趋势图上不标记当天数据。</h3>
                            <h3>4. 部分数据来源于今日头条。</h3>
                        </div>
                    </div>
                    <div className={style.modal_footer} onClick={this.props.close}>我知道了</div>
                </div>
            </div>
        }
        return modal;
    }
}

export default Modal;
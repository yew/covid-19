import React from "react";
import style from "./Loading.module.css";

class Loading extends React.Component {
    render() {
        return (
            <div className={style.loading_mask}>
                <div className={`${style.container} ${style.animation}`}>
                    <div className={`${style.shape} ${style.shape1}`}/>
                    <div className={`${style.shape} ${style.shape2}`}/>
                    <div className={`${style.shape} ${style.shape3}`}/>
                    <div className={`${style.shape} ${style.shape4}`}/>
                </div>
            </div>
        );
    }
}

export default Loading;
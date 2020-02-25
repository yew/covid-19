import moment from "moment";

const durationFormat = (second) => {
    const duration = moment.duration(second, "seconds");
    let durationStr = "";
    if (duration.hours() > 0) {
        durationStr += duration.hours() < 10 ? "0" + duration.hours() : duration.hours();
        durationStr += ":";
    }
    durationStr += duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes();
    durationStr += ":";
    durationStr += duration.seconds() < 10 ? "0" + duration.seconds() : duration.seconds();
    return durationStr;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
};

const getDistance = (p1, p2) => {
    // p: [longitude, latitude]
    const [p1_longitude, p1_latitude] = p1;
    const [p2_longitude, p2_latitude] = p2;

    const R = 6371;
    const dLat = deg2rad(p2_latitude - p1_latitude);
    const dLon = deg2rad(p2_longitude - p1_longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(p1_latitude)) * Math.cos(deg2rad(p2_latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const getDistanceStr = (distance) => {
    let distanceStr;
    if (distance < 1) {
        distanceStr = Math.round(distance * 1000) + "m";
    } else if (distance > 99) {
        distanceStr = ">99km";
    } else {
        distanceStr = Math.round(distance * 10) / 10 + "km";
    }
    return distanceStr;
};

const tooltipStyle = {
    trigger: 'axis',
    triggerOn: 'click',
    axisPointer: {
        lineStyle: {
            type: 'dashed'
        }
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ebebeb',
    borderWidth: 1,
    textStyle: {
        color: '#515151'
    },
    formatter: function (params) {
        const date_list = params[0].name.split('.');
        const dateStr = parseInt(date_list[0]) + '月' + parseInt(date_list[1]) + '日';

        const tooltip_items = params.map(param => {
            return `<div class='tooltip-item'>
                        <span class='tooltip-point' style='background-color: ${param.color}'></span>
                        <span>${param.seriesName}</span>
                        <span>:</span>
                        <span>${param.value}</span>
                    </div>`;
        }).join('');

        return `<div style='font-size: 10px;line-height: 16px;'>${dateStr}${tooltip_items}</div>`
    }
};

export {durationFormat, getDistance, getDistanceStr, tooltipStyle};
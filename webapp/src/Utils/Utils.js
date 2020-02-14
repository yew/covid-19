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

export {durationFormat};
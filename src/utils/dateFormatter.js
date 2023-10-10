export const dateFormatter = (date) => {
    let dateObj = new Date(date);
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    var hour = dateObj.getHours();
    var minu = dateObj.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minu}`
}
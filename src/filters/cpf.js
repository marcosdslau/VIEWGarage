module.exports = (value) => {
    if(!value) return ''
    let arr = value.split('');
    arr.splice(3,0,'.');
    arr.splice(7,0,'.');
    arr.splice(11,0,'-');
    return arr.join('');
}
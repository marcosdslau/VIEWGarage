module.exports = (value) => {
    if(!value) return ''
    let arr = value.split('');
    arr.splice(2,0,'.');
    arr.splice(6,0,'.');
    arr.splice(10,0,'/');
    arr.splice(15,0,'-');
    return arr.join('');
}
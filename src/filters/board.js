module.exports = (value) => {
    if(!value) return ''
    let arr = value.split('');
    arr.splice(3,0,'-');
    return arr.join('');
}
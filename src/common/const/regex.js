/* eslint-disable no-useless-escape */
module.exports = Object.freeze({
   password: '^(?=.*[A-Z]+.*)(?=.*(\W|\d)+.*).{6,30}$',
   vnPhoneNumber: '((^(\+84|84|0|0084|\(\+84\)){1})(3|5|7|8|9))+([0-9]{8})$'
});
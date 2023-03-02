
class CommonUtils {
   /**
    * @param {any} data 
    * @returns {string} return a string one of the values: String, Symbol, Number, Object, Array, Null ,Undefined,... 
    */
   static typeof(data) {
      return Object.prototype.toString.call(data).slice(8, -1);
   }
}

module.exports = CommonUtils;
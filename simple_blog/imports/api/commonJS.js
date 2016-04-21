/**
 * Created by limchaejoo on 2016. 4. 21..
 */

CommonJS = class CommonJS {
  date(newDate){
    var res = newDate.toISOString().slice(0,10).replace(/-/g,"");

    return res;
  }
};
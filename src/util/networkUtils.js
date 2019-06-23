import axios from 'axios';
import {GIF_SITE_URL,API_KEY} from "./AppConstans";

var NetworkUtils = (function () {

    var getSearchUrl = function(keyWord) {
        return GIF_SITE_URL + '?q=' + keyWord + '&api_key='+API_KEY+"&limit=50";
    };

    return{
        getGifDetailsBasedOnKw : function (keyWord, offset, limit,callback) {

            var replaced = keyWord.replace(/\s/g, '+');
            let url = getSearchUrl(replaced);
            console.log("getGifDetailsBasedOnKw ",url);
             axios.get(url)
                 .then(function (response) {
                     callback(response);
                 })
        },

        getApiUrl: function (keyword) {
            return GIF_SITE_URL + '?q=' + keyword;
        }

    };
})();

export default NetworkUtils;

import

var axios = require('axios');
var env = process.env.NODE_ENV || 'development';
var devConfig = "https:127.0.0.1:";
var prodConfig = "https://10.20.239.143:";

/*this function is used to fetch data from passed url which matches the query criteria
E.g : https://127.0.0.1:5000/getLanguages?langid="En" */
export function fetchDetails(url,key,value){
  let finalUrl,port;
  let queryKey = key;
  let queryValue = value;
  let passedUrl =url;
  if(env === "production"){
    port = 9000;
    finalUrl = `${prodConfig}{port}`;
  }
  else if(env === "development"){
    port = 5000;
    finalUrl = `${devConfig}{port}`;
  }
  finalUrl = {finalUrl}/{passedUrl}?{queryKey}={queryValue};
  axios.get('finalUrl')
    .then(function(response){
      return response;
    })
    .catch(function(response){
      return response;
    })

}

// this function is used to add details to the specified url,  where params is the details object which has to be added
export function adddDetails(url,params){
  let passedUrl =url;
  let finalUrl
  let details = params;
  let finalUrl;
  if(env === "production"){
    port = 3000;
    finalUrl = `${prodConfig}{port}`;
  }
  else if(env === "development"){
    port = 5000;
    finalUrl = `${devConfig}{port}`;
  }
  finalUrl = {finalUrl}/{passedUrl};
  axios.post('finalUrl', details)
  .then(function(response){
    return response;
  })
  .catch(function(response){
    return response;
  })
}

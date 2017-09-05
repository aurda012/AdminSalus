//FireBase
exports.firebaseConfig = {
  apiKey: "AIzaSyAYmgAr8P8OdAL9uFqupfkKjlh5UAsOISs",
  authDomain: "salus-4b513.firebaseapp.com",
  databaseURL: "https://salus-4b513.firebaseio.com",
  projectId: "salus-4b513",
  storageBucket: "",
  messagingSenderId: "275888439009"
};

//App setup
exports.adminConfig={
  "appName": "Salus",
  "slogan":"",

  "design":{
    "sidebarBg":"sidebar-1.jpg", //sidebar-1, sidebar-2, sidebar-3
    "dataActiveColor":"rose", //"purple | blue | green | orange | red | rose"
    "dataBackgroundColor":"black", // "white | black"
  },

  "codeversion": "1.0",
  "allowedUsers":null, //If null, allow all users, else it should be array of allowd users
  "fieldBoxName": "Offer",
  "maxNumberOfTableHeaders":5,
  "prefixForJoin":["-event"],
  "methodOfInsertingNewObjects":"push", //timestamp (key+time) | push - use firebase keys
  "urlSeparator":"+",


  "fieldsTypes":{
    "photo":["photo","image"],
    "dateTime":["datetime","start"],
    "date":["date","created"],
    "time":["time"],
    "maps":["map","latlng"],
    "textarea":["description"],
    "html":["content"],
    "radio":["radio"],
    "checkbox":["checkbox"],
    "dropdowns":["status","dropdowns"],
  },
  "optionsForSelect":[
      {"key":"dropdowns","options":["new","processing","rejected","completed"]},
      {"key":"checkbox","options":["Skopje","Belgrade","New York"]},
      {"key":"status","options":["just_created","confirmed","canceled"]},
      {"key":"radio","options":["no","maybe","yes"]}
  ],

  "paging":{
    "pageSize": 20,
    "finite": true,
    "retainLastPage": false
  }
};

//Navigation

exports.pushSettings={
  "pushType":"onesignal", //firebase or onesignal
  "Firebase_AuthorizationPushKey":"", //Firebase push authorization ket
  "pushTopic":"news", //Only for firebase push
  "oneSignal_REST_API_KEY":"",
  "oneSignal_APP_KEY":"",
  "included_segments":"Active Users", //Only for onesignal push
}

exports.userDetails={

}

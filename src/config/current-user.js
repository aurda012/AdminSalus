import fir from './database'

var currentUser = "";

const authListener = () => {

  var fbUser = "";

  const setUser=(user)=>{
    fbUser = user;
  };
  fir.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // No user is signed in.
      console.log("User has logged out Master");
    } else {
      setUser(user);
      // User is signed in.
      currentUser = fbUser.uid;
      console.log
    }
  });
};


exports.navigation=[
  {
    "link": "/",
    "name": "Insights",
    "schema":null,
    "icon":"timeline",
    isIndex:true,
    "path": "",
  },
  {
    "link": "fireadmin",
    "path": "/",
    "name": "Rewards",
    "icon":"attach_money",
    "tableFields":["name","description"],
    "subMenus":[
      {
        "link": "fireadmin",
        "path": `"vendors/${authListener()}/offers/offer1"`,
        "name": "Offer 1",
        "icon":"attach_money",
        "tableFields":["name","description"]
      },{
        "link": "fireadmin",
        "path": `"vendors/${authListener()}/offers/offer1"`,
        "name": "Offer 2",
        "icon":"attach_money",
        "tableFields":["name","description"],
      }
    ]
  },
  {
    "link": "push",
    "path": "",
    "name": "Push Notifications",
    "icon":"speaker_notes",
    "tableFields":[],
  }
];

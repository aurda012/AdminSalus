import React, {Component,PropTypes} from 'react'
import {Link} from 'react-router'
import NavItem from '../components/NavItem'
import NavBar from '../components/NavBar'
import { IndexLink } from 'react-router'
import Config from   '../config/app';
// import currentUser from  '../config/current-user';
var md5 = require('md5');

import firebase from '../config/database'

class Master extends Component {

  constructor(props) {
    super(props);
    this.state = {user:{}};
    this.handleLogout = this.handleLogout.bind(this);
    this.authListener = this.authListener.bind(this);
    this.printMenuItem= this.printMenuItem.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

   authListener(){
     const setUser=(user)=>{
       this.setState({user:user})
     };
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        // User is signed in.
        console.log("User has Logged  in Master");
        console.log(user.email);
      } else {
        // No user is signed in.
        console.log("User has logged out Master");
      }
    });
  }





  handleLogout(e) {
    e.preventDefault();

    console.log('The link was clicked.');
    firebase.auth().signOut();
  }

  printMenuItem(menu){
    var menuPath=menu.path.replace(/\//g, Config.adminConfig.urlSeparator);

    if(menu.subMenus&&menu.subMenus.length>0){
      return (
        <li>
                        <a data-toggle="collapse" href={"#"+menuPath} className="collapsed" aria-expanded="false">
                            <i className="material-icons">{menu.icon}</i>
                            <p>{menu.name}
                                <b className="caret"></b>
                            </p>
                        </a>
                        <div className="collapse" id={menuPath} aria-expanded="false">

                            <ul className="nav">
                            {menu.subMenus.map(this.printMenuItem)}
                            </ul>
                        </div>
                    </li>
        )
    }else{
      return (<NavItem index={menu.isIndex} onlyActiveOnIndex={menu.isIndex}  to={menu.link+"/"+menuPath}>
          <i className="material-icons">{menu.icon}</i>
          <p>{menu.name}</p>
        </NavItem>)
    }

  }


  render() {

    var bgStyle = {
      backgroundImage: 'url(/assets/img/salus2.png',
    };

    var navigation=[
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
        "path": "vendors",
        "name": "Rewards",
        "icon":"attach_money",
        "tableFields":["name","description"],
        "subMenus":[
          {
            "link": "fireadmin",
            "path": `vendors/${this.state.user.uid}/offers/offer1`,
            "name": "Offer 1",
            "icon":"attach_money",
            "tableFields":["name","description"]
          },{
            "link": "fireadmin",
            "path": `vendors/${this.state.user.uid}/offers/offer2`,
            "name": "Offer 2",
            "icon":"attach_money",
            "tableFields":["name","description"],
          },{
            "link": "fireadmin",
            "path": `vendors/${this.state.user.uid}/offers/offer3`,
            "name": "Offer 3",
            "icon":"attach_money",
            "tableFields":["name","description"],
          }
        ]
      }
    ];

    console.log(this.state.user.uid);


    return (
      <div className="wrapper">

        <div  id="theSideBar" className="sidebar" has-image="true" data-active-color={Config.adminConfig.design.dataActiveColor} data-background-color={Config.adminConfig.design.dataBackgroundColor}>
          <div className="sidebar-wrapper">
            <div className="user">
              <div className="photo">

                  <img src="assets/img/green.png" />
              </div>
              <div className="info">
                <a data-toggle="collapse" href="#collapseExample" className="collapsed">{this.state.user.email}<b className="caret"></b></a>
                <div className="collapse" id="collapseExample">
                    <ul className="nav">
                        <li>
                          <a href="/#/edit-profile" >Edit Profile</a>
                        </li>
                        <li>
                          <a href="/#/edit-payment" >Edit Payment</a>
                        </li>
                        <li>
                            <a onClick={this.handleLogout} >Logout</a>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
            <ul className="nav">
              {navigation.map(this.printMenuItem)}
            </ul>
          </div>
       
       
          <div className="sidebar-background"  style={bgStyle}></div>


        </div>


        <div className="main-panel">
            <NavBar />
            <div className="content">
                {this.props.children}
            </div>
            <footer className="footer">
                <div className="container-fluid">
                    <nav className="pull-left">
                        <ul>

                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy;
                      2017 <a href="http://www.salusapp.net">{Config.adminConfig.appName} App LLC</a>, savings lives one download at a time.
                    </p>
                </div>
            </footer>
        </div>

      </div>











      /*<div><h1><FormattedMessage id={'Login.password'} defaultMessage={'Password'} /></h1>
        <ul role="nav">
        <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/repos">Repos</NavLink></li>
        </ul>


      </div>*/)
  }
}


export default Master;

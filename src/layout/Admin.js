import React, { Component } from 'react'
import { Link } from 'react-router';
import NavItem from '../components/NavItem'
import NavBar from '../components/NavBar'
import Config from   '../config/app';

import firebase from '../config/database'

class Master extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:{},
      companyName: '',
    };
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
     const setVendor=(vendor)=>{
       this.setState({
         companyName: vendor.name,
       })
     };

     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         setUser(user);
         // User is signed in.
         console.log("User has Logged  in Master");
         var vendorInfo = firebase.database().ref(`vendors/${user.uid}`);
         vendorInfo.on('value', function(snapshot) {
           if (snapshot) {
             const vendor = snapshot.val();
             setVendor(vendor);
             console.log()
           }
         });
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
                                <b className="caret"/>
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
      return (<NavItem index={menu.isIndex} onlyActiveOnIndex={menu.isIndex} key={menu.isIndex}  to={menu.link+"/"+menuPath}>
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
        "name": "Vendors",
        "icon":"business_center",
        "tableFields":["name","description"],
      },
      {
        "link": "fireadmin",
        "path": "users",
        "name": "Users",
        "icon":"people",
        "tableFields":[],
      }
    ];

    console.log(this.state.user.uid);


    return (
      <div className="wrapper">

        <div id="theSideBar" className="sidebar" has-image="true" data-active-color={Config.adminConfig.design.dataActiveColor} data-background-color={Config.adminConfig.design.dataBackgroundColor}>
          <div className="sidebar-wrapper">
            <div className="user">
              <div className="photo">

                  <img src="assets/img/green.png" />
              </div>
              <div className="info" style={{ marginTop: '20px' }}>
                <a data-toggle="collapse" href="#collapseExample" style={{ fontSize: '16px' }} className="collapsed">{this.state.companyName} <b className="caret"></b></a>
                <div className="collapse" id="collapseExample">
                    <ul className="nav">
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
       
       
          <div className="sidebar-background"  style={bgStyle}/>


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

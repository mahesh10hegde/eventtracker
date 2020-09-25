import React, {Component} from 'react';
import '../../src/assets/css/login.css';
import {withRouter} from 'react-router-dom';
class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
        loginError:false,
        nameVal:'',
        pwdVal:'',
        errorMessage:''
    }
  }
  handleLogin = (e)=>{
    let pwd=this.state.pwdVal;
    let username=this.state.nameVal;
    console.log(pwd,username);
    let data={"email":username,"password":pwd};
    e.preventDefault();
    if(!username || !pwd){
        this.setState({"loginError":true,errorMessage:"Password/username can not be empty"});
    }else{
        fetch('http://localhost:3000/users?userName='+username+'&passWord='+pwd, {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data[0].token){
                
              console.log('success')
             
            }else{
                this.setState({"loginError":true});
            }
          })
          .catch(err=>{
            console.error('Error:', err);
            this.setState({"loginError":true});
          });
    }
  }
  inputNameChangeHandler = (e)=>{
    this.setState({"nameVal":e.target.value});
  }
  inputPasswordChangeHandler = (e) =>{
    this.setState({"pwdVal":e.target.value});
  }
  render(){
    return ( 
            <div className="main">
                <p className="header">Login page</p>
    {this.state.loginError?<p className="error">{this.state.errorMessage}</p>:''}
                <form className="form">
                <input className="input" type="text" value={this.state.nameVal} onChange={(e)=>{this.inputNameChangeHandler(e)}} placeholder="Username" />
                <input className="input" type="password" value={this.state.pwdVal} onChange={(e)=>{this.inputPasswordChangeHandler(e)}} placeholder="Password" />
                <button className="submit" onClick={this.handleLogin}>Sign in</button>
                </form>
            </div>
        
            );
    }
}

export default withRouter(HomePage);

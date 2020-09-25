import React, {Component} from 'react';
import '../../src/assets/css/login.css';
import {withRouter} from 'react-router-dom';
class HomePage extends Component{
  constructor(props){
    super(props);
    this.state={
        loginError:false,
        nameVal:'',
        pwdVal:''
    }
  }
  handleLogin = (e)=>{
    let pwd=this.state.pwdVal;
    let username=this.state.nameVal;
    console.log(pwd,username);
    let data={"email":username,"password":pwd};
    e.preventDefault();
    if(!username || !pwd){
        this.setState({"loginError":true})
    }else{
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.token){
                
              
              this.props.history.push("/dashboard");
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
                {this.state.loginError?<p className="error">Invalid user name/password</p>:''}
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

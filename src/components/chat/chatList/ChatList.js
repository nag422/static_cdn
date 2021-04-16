import { getchatusers } from "container/api/message";
import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import axios from 'axios';


const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const config = {
  headers: {
      'content-type': 'application/json',
      'Authorization':'Token 22cab19ad1b1ed66a1d69bcb849ceb9af0f6ac54'          
      // 'X-CSRFToken': getCookie('csrftoken')
  }
}

export default class ChatList extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      pagenumber:1,
      allChats: [{
            image: "https://pbs.twimg.com/profile_images/770394499/female.png",
            id: 10,
            name: "Manpreet David",
            active: false,
            isOnline: true,
          }],
      
    };
  }

  

  componentDidMount(){
      const url = 'https://app.contentbond.com/'
      const params = {
        currentpage:this.state.pagenumber
      }

      axios
      .get(url+"admin/chat/users/",{params},this.config)
      .then(resp => {
       this.setState({
        allChats: resp.data.users
       })
      })
      .catch(error => error);
      



  }

  paginateUsersnext(pn) {
    const url = 'https://app.contentbond.com/'
      const params = {
        currentpage: pn + 1
      }

      axios
      .get(url+"admin/chat/users/",{params},this.config)
      .then(resp => {
       this.setState({
        allChats: resp.data.users,
        pagenumber:this.state.pagenumber + 1
       })
      })
      .catch(error => error);

  }

  paginateUsersback(pn) {
    const url = 'https://app.contentbond.com/'
      const params = {
        currentpage: pn - 1
      }

      axios
      .get(url+"admin/chat/users/",{params},this.config)
      .then(resp => {
       this.setState({
        allChats: resp.data.users,
        pagenumber:this.state.pagenumber - 1
       })
      })
      .catch(error => error);

  }

  render() {
    return (
      
      <div className="main__chatlist">
        
        {/* <button className="btn">
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button> */}


        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div> */}
        {/* Search Bar */}
        <div className="chatlist__items">
          
          {this.state.allChats != undefined && this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
                name={item.email}
                key={item.first_name}
                animationDelay={index + 1}
                active={"active"}
                isOnline={"active"}
                image={"https://pbs.twimg.com/profile_images/770394499/female.png"}
              />
            );
          })}
         
        </div>
        <div style={{display:'flex', flexDireaction:'row', justifyContent:'space-between',marginTop:'10%',alignItems:'center'}}>
          <button className="btn" style={{margin:'5px',textAlign:'center'}} onClick={() =>this.paginateUsersback(this.state.pagenumber)}>{'< Back'}</button>
          <button className="btn" style={{margin:'5px',textAlign:'center'}} onClick={() => this.paginateUsersnext(this.state.pagenumber)}>{'Next >'}</button>
          </div>
      </div>
    );
  }
}

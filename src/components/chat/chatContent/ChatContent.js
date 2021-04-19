import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import profilepic from "../../../assets/img/user-4.jpg";
import {getchatmessages} from '../../../container/api/message'
import axios from "axios";



export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image:profilepic,
      type: "",
      msg: "Hi Tim, How are you?",
    },
    
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      pagenumber:1
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {

    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();


    // const getCookie = (name) => {
    //   let cookieValue = null;
    //   if (document.cookie && document.cookie !== '') {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //       const cookie = cookies[i].trim();
    //       // Does this cookie string begin with the name we want?
    //       if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //         break;
    //       }
    //     }
    //   }
    //   return cookieValue;
    // }
    
    const config = {
      headers: {
          'content-type': 'application/json',
          'Authorization':'Token 22cab19ad1b1ed66a1d69bcb849ceb9af0f6ac54'          
          // 'X-CSRFToken': getCookie('csrftoken')
      }
    }
    


    const url = 'https://app.contentbond.com/'
    const params = {
      currentpage:this.state.pagenumber
    }

    axios
    .get(url+"admin/chat/savemessage/",{params},config)
    .then(resp => {
     this.setState({
      chat: resp.data.mesgs
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
      .get(url+"admin/chat/savemessage/",{params},this.config)
      .then(resp => {
       this.setState({
        chat: resp.data.mesgs,
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
      .get(url+"admin/chat/savemessage/",{params},this.config)
      .then(resp => {
       this.setState({
        chat: resp.data.mesgs,
        pagenumber:this.state.pagenumber - 1
       })
      })
      .catch(error => error);

  }



  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };



  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  timedate={itm.created}
                  image={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU'}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
          <div style={{display:'flex', flexDireaction:'row', justifyContent:'space-between',marginTop:'10%',alignItems:'center'}}>
          <button className="btn" style={{margin:'5px',textAlign:'center'}} onClick={() =>this.paginateUsersback(this.state.pagenumber)}>{'< Back'}</button>
          <button className="btn" style={{margin:'5px',textAlign:'center'}} onClick={() => this.paginateUsersnext(this.state.pagenumber)}>{'Next >'}</button>
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

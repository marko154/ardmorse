// queue
class Node {
   constructor(string,next,prev){
     this.val = string;
     this.next = next;
     this.prev = prev;
   }
};

class Queue {
  constructor(){
    this.head=null;
    this.tail=null;
  }
  push(string){
    if(this.head == null) {
      this.head = new Node(string,null,null);
    }
    else if(this.head.next == null) {
      this.tail = this.head;
      this.head = new Node(string,this.tail,null);
      this.tail.prev = this.head;
    }
    else {
       this.head = new Node(string,this.head,null);
       this.head.next.prev = this.head;
    }
  }
  pop(){
    if(this.head == this.tail){
      this.head = null;
      this.tail = null;
    }
    else{
    this.tail = this.tail.prev;
    this.tail.next.prev = null;
    this.tail.next = null;
}
  }
  print(){
    for(let i = this.head; i!=null;i = i.next){
      console.log(i.val);
  }
}
};

function timedPop(string){
  if(string == "client1"){
      lookup[0].send(client2.tail.val);
      client2.pop();

}
  else {
    lookup[1].send(client1.tail.val);
    client1.pop();

  }
}

let client1 = new Queue;
let client2 = new Queue;

//include libraries
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server});

let lookup={};
let id = 0;

wss.on('connection', function connection(ws) {
  console.log("new client has connnected")
  lookup[id] = ws;
  id++;
    ws.on('message', function incoming(message) {
      if(message == "ready"){

        if(ws == lookup[0]){
          interval = setInterval(function(){timedPop("client1");    if(client2.head == null) clearInterval(interval);},2000);
        }
        else {
          interval = setInterval(function(){timedPop("idkman"); if(client1.head == null) clearInterval(interval);},2000);
        }
      }
      else {
        if(ws == lookup[0])
          {client1.push(message);
           client1.print();
           console.log("----");
          }
        else
          {
            client2.push(message);
            client2.print();
            console.log("----");
          }
      }


});
});


server.listen(8080,() => console.log("listening on port 8080"))

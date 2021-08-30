//安装ws模块来创建服务器 
const WebSocket = require("ws");
var ws = new WebSocket.Server({ port: 8011, host: "127.0.0.1" });
let clients = {};
let clientIndex = 0;
let msgIndex = 0;
ws.on("connection", (client) => {
    // console.log(666.111,client)
    client.index = ++clientIndex
    clients[client.index] = clientIndex
    client.on("message", (msg) => {
        console.log(666.111,msg) //客户端接受到的信息
        // clients[client.index]=Object.assign(clients[client.index],{i:msg.i,m:msg.m});
        Broadcast(client,msg)
    })
    client.on("close", () => {
        delete clients[client.index]
        console.log(666.222,JSON.stringify(clients[client.index]) + "离开了~~~")
    })
})

function Broadcast(client,msg) {
    msgIndex++;
    for (var key in clients) {
        // client.send('555555555555')
        console.log(666.456,JSON.stringify(Object.assign({d:msg},{x:msgIndex})))
        client.send(JSON.stringify(Object.assign({d:msg},{x:msgIndex})))
        // client.send(Object.assign({d:msg},{x:msgIndex}))
    }
}
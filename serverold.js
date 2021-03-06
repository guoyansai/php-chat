//安装ws模块来创建服务器 
const WebSocket = require("ws");
const ws = new WebSocket.Server({
	port: 8018,
	host: "127.0.0.1"
});
let clients = {};
let clientName = 0;
ws.on("connection", (client) => {
	client.name = ++clientName
	clients[client.name] = client
	client.on("message", (msg) => {
		if (msg) {
			let tempMsg = JSON.parse(msg);
			console.log(666);
			if (tempMsg.length > 0) {
				Broadcast(client, msg);
			}
		}
	})
	client.on("close", () => {
		delete clients[client.name]
		console.log(client.name + "离开了~~~")
	})
})

function Broadcast(client, msg) {
	for (var key in clients) {
		clients[key].send(msg)
	}
}

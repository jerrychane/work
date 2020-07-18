const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 3000 })
let num = 0
wss.on('connection', function connection (ws) {
  console.log('one client is connected');
  // 接收客户端的消息
  ws.on('message', function (msg) {
    const msgObj = JSON.parse(msg)
    if (msgObj.event === "enter") {
      num++
      ws.name = msgObj.message
    }
    // console.log(msg);
    // 主动发送消息给客户端
    // ws.send("server: "+ msg)
    // 广播消息
    wss.clients.forEach((client) => {
      // 判断非自己的客户端
      if (client.readyState === WebSocket.OPEN) {
        msgObj.name = ws.name
        msgObj.num = num
        client.send(JSON.stringify(msgObj))
      }
    })
  })

  // 当 ws 客户端断开连接的时候
  ws.on('close', function () {
    if (ws.name) {
      num--
    }
    let msgObj = {}
    // 广播消息
    wss.clients.forEach((client) => {
      // 判断非自己的客户端
      if (client.readyState === WebSocket.OPEN) {
        msgObj.name = ws.name
        msgObj.num = num
        msgObj.event = 'out'
        client.send(JSON.stringify(msgObj))
      }
    })
  })
})
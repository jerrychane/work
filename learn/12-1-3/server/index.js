const http = require('http')
const server = http.createServer();
const WebSocket = require('ws')
const wss = new WebSocket.Server({ noServer: true })
const jwt = require('jsonwebtoken')

const timeInterval = 1000
// 多聊天室功能
// roomid -> 对应相同的 roomid 进行广播消息
let group = {}
wss.on('connection', function connection (ws) {
  console.log('one client is connected');
  // 接收客户端的消息
  ws.on('message', function (msg) {
    const msgObj = JSON.parse(msg)
    if (msgObj.event === "enter") {
      ws.name = msgObj.message
      ws.roomid = msgObj.roomid
      if (typeof group[ws.roomid] === "undefined") {
        group[ws.roomid] = 1
      } else {
        group[ws.roomid]++
      }
    }
    // 鉴权
    if (msgObj.event === 'auth') {
      jwt.verify(msgObj.message, 'secret', (err, decode) => {
        if (err) {
          // websocket返回前台鉴权失败消息
          console.log('auth error')
          return
        } else {
          // 鉴权通过
          console.log(decode)
          ws.isAuth = true
          return
        }
      })
    }
    // 拦截未鉴权的请求
    if (!ws.isAuth) {
      ws.send(JSON.stringify({
        event: 'noauth',
        message: 'please auth again'
      }))
      return
    }
    // console.log(msg);
    // 主动发送消息给客户端
    // ws.send("server: "+ msg)
    // 广播消息
    wss.clients.forEach((client) => {
      // 判断非自己的客户端
      if (client.readyState === WebSocket.OPEN && client.roomid === ws.roomid) {
        msgObj.name = ws.name
        msgObj.num = group[ws.roomid]
        client.send(JSON.stringify(msgObj))
      }
    })
  })

  // 当 ws 客户端断开连接的时候
  ws.on('close', function () {
    if (ws.name) {
      group[ws.roomid]--
    }
    let msgObj = {}
    // 广播消息
    wss.clients.forEach((client) => {
      // 判断非自己的客户端
      if (client.readyState === WebSocket.OPEN && ws.roomid === client.roomid) {
        msgObj.name = ws.name
        msgObj.num = group[ws.roomid]
        msgObj.event = 'out'
        client.send(JSON.stringify(msgObj))
      }
    })
  })
})

server.on('upgrade', function upgrade (request, socket, head) {
  console.log('upgrade -> request', request.headers)
  // This function is not defined on purpose. Implement it with your own logic.
  // authenticate(request, (err, client) => {
  //   if (err || !client) {
  //     socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
  //     socket.destroy();
  //     return;
  //   }

  wss.handleUpgrade(request, socket, head, function done (ws) {
    wss.emit('connection', ws, request);
  });
  // });
});

server.listen(3000);

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      group[ws.roomid]--
      return ws.terminate()
    }
    // 主动发送心跳检测请求
    // 当客户端返回了消息后，主动设置 flag 为在线
    ws.isAlive = false
    ws.send(JSON.stringify({
      event: 'heartbeat',
      message: 'ping'
    }))
  })
}, timeInterval);
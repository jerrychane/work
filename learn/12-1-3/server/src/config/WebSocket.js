import WebSocket from 'ws'

class WebSocketServer {
  constructor(config = {}) {
    const defaultConfig = {
      port: 3001,
      timeInterval: 30 * 1000,
      isAuth: true
    }
    // 最终配置
    const finalConfig = { ...defaultConfig, ...config }
    this.wss = {}
    this.interval = finalConfig.timeInterval
    this.isAuth = finalConfig.isAuth
    this.port = finalConfig.port
    this.options = config.options || {}
  }

  // 初始化 websocket 服务
  init () {
    this.wss = new WebSocket.Server({ port: this.port, ...this.options })
    // 连接信息
    this.wss.on('connection', (ws) => {
      ws.isAlive = true
      ws.on('message', (msg) => {
        this.onMessage(ws, msg)
      })
      ws.on('close', () => {
        this.onClose(ws)
      })
    })
  }
  onMessage (ws, msg) {
    // 用户鉴权 -> token -> id
    // 心跳检测
    // 消息发送
    const msgObj = JSON.parse(msg)
    const events = {
      auth: async () => {
        const obj = await getJWTPayload(msgObj.message)
        if (obj) {
          ws.isAuth = true
          ws._id = obj._id
        } else {
          ws.send(JSON.stringify({
            event: 'noauth',
            message: 'please auth again'
          }))
        }
      },
      heartbeat: () => {
        if (msgObj.message === 'pong') {
          ws.isAlive = true
        }
      },
      message: () => {
        // 鉴权拦截
        if (!ws.isAuth && this.isAuth) {
          return
        }
        // 消息广播
        this.wss.clients.forEach((client) => {
          if (client.readState === WebSocket.OPEN && client._id === ws._id) {
            this.send(msg)
          }
        })
      }
    }
    events[msgObj.event]()
  }
  // 点对点的消息发送
  send (uid, msg) {
    this.wss.clients.forEach((client) => {
      if (client.readState === WebSocket.OPEN && client._id === uid) {
        this.send(msg)
      }
    })
  }
  // 广播消息 -> 推送系统消息
  broadcast (msg) {
    this.wss.clients.forEach((client) => {
      if (client.readState === WebSocket.OPEN) {
        this.send(msg)
      }
    })
  }
  onClose (ws) {

  }
  // 心跳检测
  heartbeat () {

  }
}
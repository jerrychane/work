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
      auth: () => {

      },
      heartbeat: () => {

      },
      message: () => {

      }
    }
  }
  onClose (ws) {

  }
}
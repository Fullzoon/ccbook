import { app, Tray, Menu, nativeImage, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import ico from '../../resources/icon.ico?asset'

let mainWindow  // 主窗口
let tray        // 系统托盘

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 900,
    minWidth: 500,
    minHeight: 460,
    title: 'ccbook',
    show: false,            // 创建时显示窗口
    frame: false,           // 窗体
    transparent: true,      // 透明
    // hasShadow: false,       // 窗口阴影
    skipTaskbar: false,     // 跳过任务栏 （alt + tab 看不到）
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      devTools: true,           // 是否开启 DevTools
      webSecurity: false,       // 当设置为 false, 它将禁用同源策略
      nodeIntegration: true,    // 是否启用Node integration
      contextIsolation: false,  // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.webContents.openDevTools ()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then(() => {
  // 为windows设置应用程序用户模型id
  electronApp.setAppUserModelId('com.ccbook')

  // 程序 事件
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  // IPC 事件
  ipcMain.on('ping', () => {
    console.log((new Date()).getTime())
  })
  // 窗口最小化
  ipcMain.on('windowMin', (event) => {
    mainWindow.minimize()
  })
  // 窗口最大化
  ipcMain.on('windowMax', (event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  // 窗口隐藏
  ipcMain.on('windowHide', (event) => {
    mainWindow.hide()
  })
  // 窗口关闭
  ipcMain.on('windowClose', (event) => {
    mainWindow.close()
  })
  // 系统托盘显示
  ipcMain.on('trayShow', (event) => {
    if (!tray || tray.isDestroyed()) {
      const trayIcon = nativeImage.createFromPath(ico)
      tray = new Tray(trayIcon)
      const trayContextMenu = Menu.buildFromTemplate([
        {
          label: '退出',
          click: () => {
            mainWindow.close()
          }
        }
      ])
      tray.setContextMenu(trayContextMenu)
      tray.setToolTip('彳亍')
      tray.on('click', () => {
        mainWindow.show()
      })
    }
  })
  // 系统托盘隐藏
  ipcMain.on('trayHide', (event) => {
    tray.destroy()
  })


  createWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

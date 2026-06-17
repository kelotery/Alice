const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("marvisWindow", {
  minimize: () => ipcRenderer.send("window:minimize"),
  toggleMaximize: () => ipcRenderer.send("window:toggle-maximize"),
  close: () => ipcRenderer.send("window:close"),
  isMaximized: () => ipcRenderer.invoke("window:is-maximized"),
  onMaximizeChanged: (callback) => {
    ipcRenderer.on("window:maximize-changed", (_event, isMaximized) => callback(isMaximized));
  },
});

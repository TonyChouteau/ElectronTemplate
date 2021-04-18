// Import Vendors Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Make the Window
function createWindow() {
	win = new BrowserWindow({
		src: "./",
		icon:'./build/icon.ico',
		width: 1200,
		height: 700,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			enableRemoteModule: true,
			preload: path.join(__dirname, './preload.js'),
		},
		show: false,
	});

	win.loadFile('./src/renderer/public/index.html');
	win.removeMenu();
	win.once('ready-to-show', () => {
		win.show();
	});
	win.webContents.openDevTools();

	ipcMain.on("toMain", (event, data) => {
		win.webContents.send("fromMain", data+1);
	});
}

// App Entry
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
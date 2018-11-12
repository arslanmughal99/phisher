const {Menu, BrowserWindow} = require('electron');

let menuItems = [
    //FILE MENU
    {label:"File", submenu:[
    {label:"Visit Github",
    click () { require('electron').shell.openExternal('https://github.com/arslanmughal5566/')}}

]},

    //EDIT MENU
    {label: 'Edit', submenu: [
    {role: 'cut'},
    {role: 'copy'},
    {role: 'paste'},
    {role: 'selectall'}
  ]},


  //HELP MENU
  {label:"Help", submenu:[
  {label:"about and usage", 
  click () { require('electron').shell.openExternal('https://github.com/arslanmughal5566/facebook_phishing') }}
    
    ]}];



let menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);


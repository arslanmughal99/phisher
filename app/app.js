$ = require('jquery');
const {ipcRenderer} = require('electron');

// Check if ngrok is alreay installed
// ipcRenderer.on('ngrok-exec-err', (e, message)=>{
//         if(message){
//             $('.ngrok-exec-err').addClass('is-active');
//         }
// })


ipcRenderer.on('internal-server-error', (e, errType)=>{
    if(errType){
        $('.internal-server-err').addClass('is-active');
    }
})

ipcRenderer.on('ngrok-failed', (e, errType)=>{
    if(errType){
        $('.ngrok-err').addClass('is-active');
    }
})

//Check if the system have working internet connection on app statup
if(!navigator.onLine){
    $('.modal-offline').addClass('is-active');
}
// If internet goes down while app is running modal will be active
window.addEventListener('offline',()=>{
    $('.modal-offline').addClass('is-active');
    $('#stop-button-a').click();
});
// If internet goes up while app is running modal will be hidden
window.addEventListener('online',()=>{
    $('.modal-offline').removeClass('is-active');
});

ipcRenderer.on('start-reply', (e, reply)=>{
    let farwardedUrl = reply.toString();
    $('#ml-input').val(farwardedUrl);
    $('#stop-button-a').removeAttr('disabled');
    $('#start-button-a').attr('disabled', 'disabled');
    $('#start-button-a').addClass('is-outlined');
    $('#stop-button-a').removeClass('is-outlined');
})

$('#stop-button-a').click(()=>{
    ipcRenderer.send('start-stop', false);
    $('#ml-input').val(null);

$('#start-button-a').removeAttr('disabled');
    $('#stop-button-a').attr('disabled', 'disabled');
    $('#start-button-a').removeClass('is-outlined');
    $('#stop-button-a').addClass('is-outlined');
});



$('#start-button-a').click(()=>{
    ipcRenderer.send('start-stop', true);
});

ipcRenderer.on('database-content', (e, databaseContent)=>{
    $('.attemps-area').val(databaseContent.toString());
})




const alertForPC = document.getElementById('alertForPC');
const ticketInfoWindow = document.getElementById('ticketInfoWindow');
const ticketWindow = document.getElementById('ticketWindow');
const ticketUseConfirmWindow = document.getElementById('ticketUseConfirmWindow');

const openTicketButton = document.getElementById('openTicket');
const closeTicketButton = document.getElementById('closeTicket');
const ticketUseCancelButton = document.getElementById('ticketUseCancel');
const ticketUseApplyButton = document.getElementById('ticketUseApply');


//-----SP判定-----
(function(){
    if(!navigator.userAgent.match(/iPhone|Android.+Mobile/)){
        ticketInfoWindow.classList.add('hide');
        alertForPC.classList.remove('hide');
    }
}());


//-----画面遷移-----

openTicketButton.addEventListener('click', () => {
    openTicketWindow();
});

closeTicketButton.addEventListener('click', () => {
    closeTicketWindow();
});

ticketUseCancelButton.addEventListener('click', () => {
    closeTicketConfirmWindow();
});

ticketUseApplyButton.addEventListener('click', () => {
    closeTicketConfirmWindow();
    closeTicketWindow();
});

//チケット画面
function openTicketWindow(){
    ticketWindow.classList.remove('hide');
    ticketInfoWindow.classList.add('blur');
}

function closeTicketWindow(){
    ticketWindow.classList.add('hide');
    ticketInfoWindow.classList.remove('blur');
}

//チケット使用確認画面
function openTicketUseConfirmWindow(){
    ticketUseConfirmWindow.classList.remove('hide');
    ticketWindow.classList.add('blur');
}

function closeTicketConfirmWindow(){
    ticketUseConfirmWindow.classList.add('hide');
    ticketWindow.classList.remove('blur');
}

//-----チケットもぎり-----

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

const swipearea = document.getElementById("swipearea");

function handleTouchMove(e){
    currentX = e.changedTouches[0].clientX;
    currentY = e.changedTouches[0].clientY;
    minX = Math.min(minX, currentX);
    minY = Math.min(minY, currentY);
    maxX = Math.max(maxX, currentX);
    maxY = Math.max(maxY, currentY);
}

swipearea.addEventListener('touchstart', (e) => {
    startX = minX = maxX = e.touches[0].clientX;
    startY = minY = maxY = e.touches[0].clientY;

    this.addEventListener('touchmove', handleTouchMove);
});

swipearea.addEventListener('touchend', (e) => {
    this.removeEventListener('touchmove', handleTouchMove);
    //指を離した位置が範囲内かチェック
    const touch = e.changedTouches[0];
    const rect = swipearea.getBoundingClientRect();
    const isInside = 
        touch.clientX >= rect.left && 
        touch.clientX <= rect.right && 
        touch.clientY >= rect.top && 
        touch.clientY <= rect.bottom;

    //もし範囲外の場合
    if (!isInside) {
        return false;
    }
    
    const totalDistance = Math.abs(minX - maxX) + Math.abs(minY - maxY);
    const minimumDistance = swipearea.clientWidth;
    if(totalDistance > minimumDistance){
        openTicketUseConfirmWindow();
    }
});

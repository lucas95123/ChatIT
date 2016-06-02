var userinfostr = $.cookie('userinfo').substring(2, $.cookie('userinfo').length)
var userinfo = eval('(' + userinfostr + ')');
var socket = io();
var uid = $("#userid").attr("content");
var fname = $("#friendname").attr("content");
var fid = $("#friendsid").attr("content");
var msgqueue = loadMsgQuene();

function loadMsgQuene() {
    var msgque;
    if ($.cookie('msgqueue') == undefined) {
        msgque = new Map();
    } else {
        var msgquestr = $.cookie('msgqueue');
        msgque = JSON.parse(msgquestr);
    }
    return msgque;
}

function saveMsgQueue() {
    $.cookie('msgqueue', JSON.stringify(msgqueue));
}

function handleClick(arg) {
    $('#' + fname).attr("class", "btn btn-default btn-wide btn-block");
    fname = arg.id;
    $('#' + fname).attr("class", "btn btn-primary btn-wide btn-block");
    fid = msgqueue[uid][fname][0].f_id;
    $('#messageboxname').text(fname);
    renderMsgBox();
}

function renderFriendbox() {
    var usermsg = msgqueue[uid];
    var flagfirst = 0;
    for (friend in usermsg) {
        if (flagfirst == 0 && fname == 'undefined') {
            fname = friend;
            fid = msgqueue[uid][friend][0].f_id;
            flagfirst = 1;
        }
        $("#friendbox").prepend($("<li></li>")
            .append($("<button></button>").attr("class", "btn btn-default btn-wide btn-block").attr("id", friend).attr("style", "border-radius:0px;margin-bottom:0px;margin-top:0px").attr("onclick", "handleClick(this)")
                .append($("<table></table>").attr("cellpadding", "4")
                    .append($("<tr></tr>")
                        .append($("<td></td>")
                            //.append($("<img></img>").attr("src", "/image/1.png"), attr("width", "60").attr("class", "img-circle"))
                            .append($("<td></td>")
                                .append($("<b></b>").text(friend))
                            )
                        )
                    )
                )
            )
        )
    }
    $('#messageboxname').text(fname);
    $('#' + fname).attr("class", "btn btn-primary btn-wide btn-block");
}

function renderMsgBox() {
    $("#messages").empty();
    for (var i = 0; i < msgqueue[uid][fname].length; i++) {
        var m = msgqueue[uid][fname][i];
        if (m.role == 1) {
            $("#messages").append($("<li></li>")
                .attr("class", "even")
                .append($("<a></a>")
                    .attr("class", "user")
                    .append($("<img></img>")
                        .attr("class", "img-responsive avatar_")
                        .attr("src", "image/a.jpg")))
                .append($("<div></div>")
                    .attr("class", "reply-content-box")
                    .append($("<span></span>")
                        .attr("class", "reply-time")
                        .text(m.timestamp))
                    .append($("<div></div>")
                        .attr("class", "reply-content pr")
                        .append($("<span></span>")
                            .attr("class", "arrow"))
                        .text(m.msgtext))));
        } else {
            $("#messages").append($("<li></li>")
                .attr("class", "odd")
                .append($("<a></a>")
                    .attr("class", "user")
                    .append($("<img></img>")
                        .attr("class", "img-responsive avatar_")
                        .attr("src", "image/a.jpg")))
                .append($("<div></div>")
                    .attr("class", "reply-content-box")
                    .append($("<span></span>")
                        .attr("class", "reply-time")
                        .text(m.timestamp))
                    .append($("<div></div>")
                        .attr("class", "reply-content pr")
                        .append($("<span></span>")
                            .attr("class", "arrow"))
                        .text(m.msgtext))));
        }
    }

}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

function scroll2bottom() {
    var vs = document.getElementById("messagebox").innerHTML;
    document.getElementById("messagebox").scrollTop = document.getElementById("messagebox").scrollHeight;
    return;
}

function sendIdentification(msg) {
    socket.emit("identification", msg);
}

$(document).ready(function() {
    if (msgqueue[uid] == undefined)
        msgqueue[uid] = new Map();
    if (fname != "undefined") {
        if (msgqueue[uid][fname] == undefined) {
            msgqueue[uid][fname] = new Array();
        }
        //Add the friend tag to the history box
    }
    renderFriendbox();
    renderMsgBox();
    sendIdentification(uid);
    scroll2bottom();
})

$("form").submit(function() {
    if ($("#m").val() != "") {
        $("#messages").append($("<li></li>")
            .attr("class", "even")
            .append($("<a></a>")
                .attr("class", "user")
                .append($("<img></img>")
                    .attr("class", "img-responsive avatar_")
                    .attr("src", "image/a.jpg")))
            .append($("<div></div>")
                .attr("class", "reply-content-box")
                .append($("<span></span>")
                    .attr("class", "reply-time")
                    .text(getNowFormatDate()))
                .append($("<div></div>")
                    .attr("class", "reply-content pr")
                    .append($("<span></span>")
                        .attr("class", "arrow"))
                    .text($("#m").val()))));
        sendIdentification(uid);
        socket.emit("chatmessage", "{\"msg\":\"" + $("#m").val() + "\", \"uid\":" + uid + ", \"fid\":" + fid + "}");
        msg = new Object();
        msg.msgtext = $("#m").val();
        msg.timestamp = getNowFormatDate();
        msg.role = 1;
        msg.f_id = fid;
        //socket.emit("debugmessage", "uid:"+uid+" fid:"+fid+" message:"+JSON.stringify(msgqueue));
        msgqueue[uid][fname].push(msg);
        saveMsgQueue()
        $("#m").val("");
    }
    scroll2bottom();
    return false;
});

socket.on("chatmessage", function(message) {
    $("#messages").append($("<li></li>")
        .attr("class", "odd")
        .append($("<a></a>")
            .attr("class", "user")
            .append($("<img></img>")
                .attr("class", "img-responsive avatar_")
                .attr("src", "image/a.jpg")))
        .append($("<div></div>")
            .attr("class", "reply-content-box")
            .append($("<span></span>")
                .attr("class", "reply-time")
                .text(getNowFormatDate()))
            .append($("<div></div>")
                .attr("class", "reply-content pr")
                .append($("<span></span>")
                    .attr("class", "arrow"))
                .text(message))));
    msg = new Object();
    msg.msgtext = mg;
    msg.timestamp = getNowFormatDate();
    msg.role = 0;
    msgqueue[uid][fname].push(msg);
    saveMsgQueue();
    scroll2bottom();
});

socket.on("infomessage", function(message) {
    $("#messages").append($("<li></li>").text(message));
    scroll2bottom();
})

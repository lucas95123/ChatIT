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
    getFriendID(fname, function(id) {
        fid = id;
        $('#messageboxname').text(fname);
        renderMsgBox();
        scroll2bottom();
    })
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
                            .append($("<img></img>").attr("src", "image/a.jpg").attr("width", "60").attr("class", "img-circle")))
                        .append($("<td></td>")
                            .append($("<b>&nbsp;&nbsp;" + friend + "&nbsp;&nbsp;</b>").attr("style", "color:#34495E"))
                            .append($("<span id=unreadbadge"+fid+" class=\"badge\">4</span>"))
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
                        .attr("class", "reply-content text-right")
                        .attr("style", "background-color: #1ABC9C;border-radius:13px;max-width:656px;margin-left:80px")
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
                        .attr("class", "reply-content text-left")
                        .attr("style", "background-color: #CCC;border-radius:13px;max-width:656px")
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

function sendIdentification(uid) {
    socket.emit("identification", uid);
}

function sendEnterMessage(uid) {
    socket.emit("userenter", uid);
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
    sendEnterMessage(uid);
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
                    .attr("class", "reply-content pr text-right")
                    .attr("style", "background-color: #1ABC9C;border-radius:13px;max-width:656px;margin-left:80px")
                    .append($("<span></span>")
                        .attr("class", "arrow"))
                    .text($("#m").val()))));
        sendIdentification(uid);
        socket.emit("chatmessage", "{\"msg\":\"" + escape($("#m").val()) + "\", \"uid\":" + uid + ", \"fid\":" + fid + "}");
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

function getFriendID(f_name, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "/getFriendID?fname=" + f_name, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var res = eval('(' + xmlhttp.responseText + ')');
            if (callback != null) {
                callback(res.id);
            }
        }
    }
}

function getFriendName(f_id, msg, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "/getFriendName?fid=" + f_id, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var res = eval('(' + xmlhttp.responseText + ')');
            if (callback != null) {
                callback(res.name, msg);
            }
        }
    }
}

socket.on("chatmessage", function(message, fid, timestamp) {
    msg = new Object();
    msg.msgtext = unescape(message);
    if (timestamp == undefined)
        msg.timestamp = getNowFormatDate();
    else
        msg.timestamp = timestamp;
    msg.role = 0;
    msg.f_id = parseInt(fid);

    getFriendName(fid, msg, function(friendname, msg) {
        if(friendname!=fname)
        {
          var count=$("#unreadbadge"+fid).text();
          if(count=="")
            count=0;
          else
            count=parseInt(count);
          count+=1;
          $("#unreadbadge"+fid).text(count);
        }
        if (msgqueue[uid][friendname] != undefined)
            msgqueue[uid][friendname].push(msg);
        else {
            msgqueue[uid][friendname] = new Array();
            msgqueue[uid][friendname].push(msg);
        }
        saveMsgQueue();
        renderMsgBox();
        scroll2bottom();
        return false;
    });
});

socket.on("systemmessage", function(message) {
    scroll2bottom();
    return false;
});

socket.on("infomessage", function(message) {
    $("#messages").append($("<li></li>").text(message));
    scroll2bottom();
})

window.unonload = function() {
    socket.emit("userexit", uid);
}

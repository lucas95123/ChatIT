var userinfostr = $.cookie('userinfo').substring(2, $.cookie('userinfo').length)
var userinfo = eval('(' + userinfostr + ')');
var socket = io();
var uid = $("#userid").attr("content");
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

function add2MsgQueue(fid, msgtext, timestamp, role) {

}

function saveMsgQueue() {
    $.cookie('msgqueue', JSON.stringify(msgqueue));
}

function deleteMsgQueue() {

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
}

$(document).ready(function() {
    if (msgqueue[uid] == undefined)
        msgqueue[uid] = new Map();
    if (fid != "undefined") {
        if (msgqueue[uid][fid] == undefined) {
            msgqueue[uid][fid] = new Array();
        }
        //Add the friend tag to the history box
        $("#friendbox").prepend($("<li></li>")
            .append($("<button></button>").attr("class", "btn btn-primary btn-wide btn-block")
                .append($("<table></table>").attr("cellpadding", "4")
                    .append($("<tr></tr>")
                        .append($("<td></td>")
                            //.append($("<img></img>").attr("src", "/image/1.png"), attr("width", "60").attr("class", "img-circle"))
                            .append($("<td></td>")
                                .append($("<b></b>").text($("#friendname").attr("content")))
                            )
                        )
                    )
                )
            )
        )
    }
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
        socket.emit("chatmessage", "{\"msg\":\"" + $("#m").val() + "\", \"uid\":" + uid + ", \"fid\":3}");
        var msgquestr = $.cookie('msgqueue');
        socket.emit("debugmessage", msgquestr);
        msg = new Object();
        msg.msgtext = $("#m").val();
        msg.timestamp = getNowFormatDate();
        msg.role = 1;
        msgqueue[uid][fid][0]=msg;
        saveMsgQueue()
        $("#m").val("");
    }
    return false;
});

socket.on("chatmessage", function(msg) {
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
                .text(msg))));
});

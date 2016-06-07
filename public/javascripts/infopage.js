var uid = $("#userid").attr("content");

function getPersonalInfo(uid, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "/getPersonalInfo?uid=" + uid, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var res = eval('(' + xmlhttp.responseText + ')');
            if (callback != null) {
                callback(res);
            }
        }
    }
}

$(document).ready(function() {
    getPersonalInfo(uid, function(vals) {
        if (vals[0].user_name != null)
            $("#info-name").val(vals[0].user_name);
        else
            $("#info-name").attr("placeholder", "用户名未设置");
        if (vals[0].motto != null)
            $("#info-motto").val(vals[0].motto);
        else
            $("#info-motto").attr("placeholder", "个性签名未设置");
        if (vals[0].age != null)
            $("#info-age").val(vals[0].age);
        else
            $("#info-age").attr("placeholder", "年龄未设置");
        if (vals[0].email_addr != null)
            $("#info-email").val(vals[0].email_addr);
        else
            $("#info-email").attr("placeholder", "电子邮件未设置");
    })
})

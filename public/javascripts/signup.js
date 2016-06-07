var username = false;
var passwd = false;
var repasswd = false;
var email = false;

function checkValid() {
    if (username & passwd & repasswd & email)
        $("#signup-button").removeAttr("disabled");
    else
        $("#signup-button").attr("disabled", "disabled")
}

$("#signup-username").bind("input propertychange", function() {
    if ($("#signup-username").val().length < 6) {
        $("#signup-username").attr("style", "color: #E74C3C");
        username = false;
    } else {
        $("#signup-username").attr("style", "color: #1ABC9C");
        username = true;
    }
    checkValid();
});

$("#signup-passwd").bind("input propertychange", function() {
    if ($("#signup-passwd").val().length < 6) {
        $("#signup-passwd").attr("style", "color: #E74C3C");
        passwd = false;
    } else {
        $("#signup-passwd").attr("style", "color: #1ABC9C");
        passwd = true;
    }
    checkValid();
});

$("#signup-repasswd").bind("input propertychange", function() {
    if ($("#signup-repasswd").val() != $("#signup-passwd").val() || $("#signup-repasswd").val().length < 6) {
        $("#signup-repasswd").attr("style", "color: #E74C3C");
        repasswd = false;
    } else {
        $("#signup-repasswd").attr("style", "color: #1ABC9C");
        repasswd = true;
    }
    checkValid();
});

$("#signup-email").bind("input propertychange", function() {
    var inputstr = $("#signup-email").val();
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(inputstr)) {
        $("#signup-email").attr("style", "color: #E74C3C");
        email = false;
    } else {
        $("#signup-email").attr("style", "color: #1ABC9C");
        email = true;
    }
    checkValid();
});

var Common = {
    FormatDate: function (sDate) {
        var date = new Date(sDate);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    },
    GetListYear: function () {
        var jData = [];
        var date = new Date();
        var y = date.getFullYear();
        for (var i = 0; i < 11; i++) {
            jData.push({ "Year": "" + (y - i) + "" });
        }
        return jData;
    },
    Trim: function (s) {
        return s.replace(/^\s+|\s+$/g, "");
    },
    IsNullOrWhiteSpace: function (s) {
        if (s) {
            if (s.replace(/^\s+|\s+$/g, "") != "") return false;
        }
        return true;
    }
}
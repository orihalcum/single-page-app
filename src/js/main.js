import Handsontable from 'Handsontable';

var data = [];

function renderTable(){

    var getData = (function(){
        return function () {
            var page = parseInt(window.location.hash.replace('#', ''), 10) || 1,
                limit = 25,
                row = (page - 1) * limit,
                count = page * limit,
                part = [];

            for (; row < count; row++) {
                part.push(data[row]);
            }

            return part;
        }
    })();

    let container = document.getElementById('table');
    let hot = new Handsontable(container, {
        data: getData(),
        colHeaders: ['ID', 'Title', 'Category', 'Tags'],
        columns: [
            { data: "id" },
            { data: "title" },
            { data: "category.name" },
            // { data: "contributor.name" },
            { data: "tags" }
        ]
    });

    Handsontable.dom.addEvent(window, 'hashchange', function (event) {
        hot.loadData(getData());
    });
}

$(document).ready(function () {
    
    // Events

    $('.fa-cog').on('click', function () {
        $('.sidebar-right').toggleClass('active');
    });

    $('.sidebar-right .sidebar-title .fa-times').on('click', function () {
        $('.sidebar-right').removeClass('active');
    });

    $('.sidebar-right .sidebar-title .fa-refresh').on('click', function () {
        $('.sidebar-right input').val('');
        $('.sidebar-right button').removeClass('active');
        $('.sidebar-right input[type=radio]').removeAttr('checked');
    });

    $('.btn-define').on('click', function () {
        $('.btn-define').removeClass('active');
        $(this).addClass('active');
    });

    // End of Events
    
    let url = "https://services.bumntrack.com/api/news/list?limit=100";

    $.get(url, function(result){
        data = result.value;
        renderTable();
    });


});
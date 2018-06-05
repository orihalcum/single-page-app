import Handsontable from 'Handsontable';

$(document).ready(function () {

    // var $wHeight = $(window).height() - (57 + 80) - 200;
    
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

    // $(window).on('resize', function () {
    //     $wHeight = $(window).height();
    //     $('.content-body').height($wHeight);
    // });

    // End of Events
    
    let url = "https://services.bumntrack.com/api/news/list?limit=40";

    $.get(url, function(result){

        let data = result.value;
        let container = document.getElementById('table');
        let hot = new Handsontable(container, {
            data: data,
            colHeaders: ['ID', 'Title', 'Contributor', 'Tags'],
            columns: [
                { data: "id" },
                { data: "title" },
                { data: "contributor.name" },
                { data: "tags" }
            ]
        });

    });


});
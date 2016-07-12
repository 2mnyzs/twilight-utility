
$(function(){
    $('.feature-box-0').on('click', function(event){
        var link = $(this).data('link');
        window.location.href = '/'+link+'/';
    });
});

/*
    Main Javascript page, the first function() is shorthand(in jquery) for document on ready.
    This means everything inside won't fire until the page is loaded(which is important since you can't manipulate elements if they aren't loaded yet!).
*/

$(function(){
    $('#navbar_placeholder').load("/assets/html/navbar.php");
    $("<div>").load("/assets/html/loginmodals.html", function(response, status, xhr){
        $('footer').append($("<div>").html(response));

        //Functions for loggin in/out
        $('#login_modal').on('hidden.bs.modal', function(event){
            $('.help-block').hide();
            $('#login_username, #login_password').parent().removeClass('has-error');
            $('#login_username, #login_password').val("");
        });

        $('#login_login').on('click', function(event) {
            var rval = true;
            $('#login_username, #login_password').parent().removeClass('has-error');
            var username = $('#login_username').val();
            var password = $('#login_password').val();
            if(username == ""){
                $('#login_username').parent().addClass('has-error');
                rval = false;
            }
            if(password == ""){
                $('#login_password').parent().addClass('has-error');
            }
            if(rval){
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/assets/misc/callbacks.php',
                    data: {
                        'callback': 'login',
                        'username': username,
                        'password': password
                    },
                    timeout: 5000,
                    error: function(){
                        window.location.reload();
                    },
                    success: function(results){
                        if(results['rval']){
                            if(results['bad_combo']){
                                $('#login_combination_help').show();
                            }else{
                                window.location.reload();
                            }
                        }else{
                            alert('Server side error occured. Please refresh the page.');
                        }
                    }
                });
            }
        });
        $('#login_signup').on('click', function(event) {
            var rval = true;
            $('#login_username, #login_password').parent().removeClass('has-error');
            var username = $('#login_username').val();
            var password = $('#login_password').val();
            if(username == ""){
                $('#login_username').parent().addClass('has-error');
                rval = false;
            }
            if(password == "" || password.length < 8){
                $('#login_password').parent().addClass('has-error');
                $('#login_password_help').show();
                rval = false;
            }
            if(rval){
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/assets/misc/callbacks.php',
                    data: {
                        'callback': 'signup',
                        'username': username,
                        'password': password
                    },
                    timeout: 5000,
                    error: function(){
                        window.location.reload();
                    },
                    success: function(results){
                        if(results['rval']){
                            window.location.reload();
                        }else{
                            if(results['usernameExists']){
                                $('#login_username_help').show();
                            }else{
                                alert('Server side error occured. Please refresh the page.');
                            }
                        }
                    }
                });
            }
        });

        $('#logout_logout').on('click', function(event) {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/assets/misc/callbacks.php',
                data: {
                    'callback': 'logout'
                },
                timeout: 2000,
                error: function(){
                    window.location.reload();
                },
                success: function(results){
                    if(results['rval']){
                        window.location.reload();
                    }else{
                        alert('Server side error occured. Please refresh the page.');
                    }
                }
            });
        });
    });
});

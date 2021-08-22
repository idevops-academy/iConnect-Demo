$(document).ready(function() {
    $(".fa-heart").on("click",function (event) {
        // console.log(event.target.id);
        $.ajax({
            url: '/contacts/'+event.target.id,
            type: 'PUT',
            success: function (result) {
                console.log(result);
                $(event.target).addClass('green-color');
            }
        });
    });

    $('#btnsavecontact').on('click',function (event) {
        if(!validateform())return;
        var contact={
            name:$('#txtname').val(),
            email:$('#txtemail').val(),
            phone:$('#txtphone').val()
        }

        $.ajax({
            url: '/contacts',
            type: 'POST',
            data: JSON.stringify(contact),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result);
                location.reload();
            },
            error: function(errMsg) {
                console.log(errMsg);
            }
        });
    });
    
    function validateform() {
        $("#appalert").addClass("d-none")
        $('#appalert').html('')
        var name=$('#txtname').val();
        var email=$('#txtemail').val();
        var phnumber=$('#txtphone').val();
        
        if(validator.isEmpty(name)){
            $('#appalert').append('Please enter a valid name')
            $("#appalert").removeClass("d-none")
        }
        if(!validator.isEmail(email)){
            $('#appalert').append('<br/>Please enter a valid email')
            $("#appalert").removeClass("d-none")
        }
        if(!validator.isMobilePhone(phnumber)){
            $('#appalert').append('<br/>Please enter a valid mobile number')
            $("#appalert").removeClass("d-none")
        }

        if(validator.isEmpty(name) | !validator.isEmail(email) | !validator.isMobilePhone(phnumber)){
            return false;
        }
        return true
    }

    $(".fa-trash-alt").on('click',function (event) {
        $.ajax({
            url: '/contacts/'+event.target.id,
            type: 'DELETE',
            success: function (result) {
                console.log(result);
                location.reload();
            }
        });
    })
});
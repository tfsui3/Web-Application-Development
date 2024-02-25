
(function($) {

    $("#signUpForm").submit(function(e){ {
        e.preventDefault();
        console.log("Sign Up");


        let nameSignUp = document.getElementById("nameSignUp");
        let validName = true;
        let emailSignUp = document.getElementById("emailSignUp");
        let requiredList = [nameSignUp,emailSignUp];
        let emptyList = [];


        for (let i = 0; i < requiredList.length; i++) {
            if (requiredList[i].value == null || requiredList[i].value === "") {
                emptyList.push(requiredList[i]);
            }else {
                if(requiredList[i].name === "emailSignUp"){
                    let warning = document.getElementById("emSignUpWarning");
                    warning.innerText="";
                }
                if(requiredList[i].name === "nameSignUp"){
                    let warning = document.getElementById("unSignUpWarning");
                    warning.innerText="";

                    let regExpName = /^[a-zA-Z0-9_-]{1,16}$/;
                    if (!regExpName.test(nameSignUp.value)) {
                        emptyList.push(nameSignUp);
                        validName = false;
                        console.log(validName);
                    }else {
                        validName = true;
                    }
                }

            }
        }

        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!regExp.test(emailSignUp.value)) {
            emptyList.push(emailSignUp);
        }

        if (emptyList.length > 0) {
            console.log("empty checking");
            for (let i = 0; i < emptyList.length; i++) {
                if(emptyList[i].name === "emailSignUp"){

                    let warning = document.getElementById("emSignUpWarning");
                    console.log("email is empty or invalid");
                    warning.innerText="Invalid email address";
                }

                if(emptyList[i].name === "nameSignUp"){
                    let warning = document.getElementById("unSignUpWarning");
                    console.log(validName);
                    if(validName === false){
                        console.log("username is invalid");
                        warning.innerText="Invalid Username. Valid Usernames contain only letters, numbers, underscore, dash.";
                    }else {
                        warning.innerText="Username is required";
                    }
                }
            }
        }else {

            // Variable to hold request
            let request;

            // Abort any pending request
            if (request) {
                request.abort();
            }
            // setup some local variables
            let $form = $(this);

            // Let's select and cache all the fields
            let $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            let serializedData = $form.serialize();
            console.log(serializedData);

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "/checkUserExist.php",
                type: "post",
                async:false,
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (data, textStatus, jqXHR) {
                // console.log(data);
                // Log a message to the console
                if(data === "no"){
                    // console.log("doesn't exist");

                    let request2 = new XMLHttpRequest();
                    request2.open("post", "signUp.php");

                    request2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request2.send(serializedData);

                    let	$main = $('#main'),
                        $current_article = $('#signUpArticle'),
                        $article = $('#signUpResult');

                    $current_article.hide();
                    $current_article.removeClass('active');

                    // Show main, article.
                    $main.show();
                    $article.show();

                    // Activate article.
                    $article.addClass('active');

                }
                if(data === "exists"){
                    //If user exists, return information.
                    // console.log("exists");

                    let	$main = $('#main'),
                        $current_article = $('#signUpArticle'),
                        $article = $('#signUpResultFail');

                    $current_article.hide();
                    $current_article.removeClass('active');

                    // Show main, article.
                    $main.show();
                    $article.show();

                    // Activate article.
                    $article.addClass('active');
                }
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                // Log the error to the console
                console.error(
                    "The following error occurred: " +
                    textStatus, errorThrown
                );
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Re-enable the inputs
                $inputs.prop("disabled", false);
            });

            nameSignUp.value = "";
            emailSignUp.value = "";
        }

    }
    })
})(jQuery);

(function($) {

    $("#signInForm").submit(function(e){ {
        e.preventDefault();
        console.log("Sign In");


        let nameSignIn = document.getElementById("nameSignIn");
        let validName = true;
        let emailSignIn = document.getElementById("emailSignIn");
        let requiredList = [nameSignIn,emailSignIn];
        let emptyList = [];


        for (let i = 0; i < requiredList.length; i++) {
            if (requiredList[i].value == null || requiredList[i].value === "") {
                emptyList.push(requiredList[i]);
            }else {
                if(requiredList[i].name === "emailSignIn"){
                    let warning = document.getElementById("emSignInWarning");
                    warning.innerText="";
                }
                if(requiredList[i].name === "nameSignIn"){
                    let warning = document.getElementById("unSignInWarning");
                    warning.innerText="";

                    let regExpName = /^[a-zA-Z0-9_-]{1,16}$/;
                    if (!regExpName.test(nameSignIn.value)) {
                        emptyList.push(nameSignIn);
                        validName = false;
                        console.log(validName);
                    }else {
                        validName = true;
                    }
                }

            }
        }

        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!regExp.test(emailSignIn.value)) {
            emptyList.push(emailSignIn);
        }

        if (emptyList.length > 0) {
            console.log("empty checking");
            for (let i = 0; i < emptyList.length; i++) {
                if(emptyList[i].name === "emailSignIn"){
                    let warning = document.getElementById("emSignInWarning");
                    console.log("email is empty");
                    warning.innerText="Invalid email address";
                }
                if(emptyList[i].name === "nameSignIn"){
                    let warning = document.getElementById("unSignInWarning");
                    console.log("username is empty");
                    if(validName === false){
                        console.log("username is invalid");
                        warning.innerText="Username doesn't exist";
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

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "/signIn.php",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (data, textStatus, jqXHR) {
                // Log a message to the console
                // console.log(data);

                if(data === "success"){
                    // console.log("Sign In request worked");
                    let	$main = $('#main'),
                        $current_article = $('#signInArticle'),
                        $article = $('#signInResult');

                    $current_article.hide();
                    $current_article.removeClass('active');

                    // Show main, article.
                    $main.show();
                    $article.show();

                    // Activate article.
                    $article.addClass('active');
                }else {
                    let	$main = $('#main'),
                        $current_article = $('#signInArticle'),
                        $article = $('#signInResultFail');

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

            nameSignIn.value = "";
            emailSignIn.value = "";
        }
    }
    })
})(jQuery);
(function($) {

    $("#contactForm").submit(function(e){ {
        e.preventDefault();
        console.log("check now");

        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let subject = document.getElementById("subject");
        let message = document.getElementById("message");
        let requiredList = [name,email,subject,message];
        let emptyList = [];

        for (let i = 0; i < requiredList.length; i++) {
            if (requiredList[i].value == null || requiredList[i].value === "") {
                emptyList.push(requiredList[i]);
            }else {
                if(requiredList[i].name === "email"){
                    let warning = document.getElementById("emailWarning");
                    warning.innerText="";
                }
                if(requiredList[i].name === "name"){
                    let warning = document.getElementById("nameWarning");
                    warning.innerText="";
                }
                if(requiredList[i].name === "subject"){
                    let warning = document.getElementById("subjectWarning");
                    warning.innerText="";
                }
                if(requiredList[i].name === "message"){
                    let warning = document.getElementById("messageWarning");
                    warning.innerText="";
                }
                requiredList[i].className = "";
            }
        }

        let regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!regExp.test(email.value)) {
            emptyList.push(email);
        }

        if (emptyList.length > 0) {
            console.log("empty checking");
            for (let i = 0; i < emptyList.length; i++) {
                if(emptyList[i].name === "email"){
                    let warning = document.getElementById("emailWarning");
                    console.log("email is empty");
                    warning.innerText="Invalid email address!";
                }
                if(emptyList[i].name === "name"){
                    let warning = document.getElementById("nameWarning");
                    console.log("name is empty");
                    warning.innerText="Name is required";
                }
                if(emptyList[i].name === "subject"){
                    let warning = document.getElementById("subjectWarning");
                    console.log("subject is empty");
                    warning.innerText="Subject is required";
                }
                if(emptyList[i].name === "message"){
                    let warning = document.getElementById("messageWarning");
                    console.log("message is empty");
                    warning.innerText="Message content is required";
                }
                emptyList[i].classList.add("error");
                console.log(emptyList[i].className);
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
                url: "/contactForm.php",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (data, textStatus, jqXHR) {
                // Log a message to the console
                console.log("Request worked!");
                console.log(data);
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

            var $main = $('#main'),
                $current_article = $('#contact'),
                $article = $('#contactResult');

            $current_article.hide();
            $current_article.removeClass('active');


            // Show main, article.
            $main.show();
            $article.show();

            // Activate article.
            $article.addClass('active');

            name.value = "";
            email.value = "";
            subject.value = "";
            message.innerText = "";
        }

        }
    });

})(jQuery);
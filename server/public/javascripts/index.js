(function() {
    $('.answers').hide();
    $('.loading').hide();
    $('#form').submit(onFormSubmit);
    $('.dropdown-menu li > a').click(onExamplesClick);
    $('.classify-text').val('Hello  Requesting you to cancel Mobile No. 5255255224 with immediate effect. Kindly note that we are aware of the exit charges of AED 525   on the data roaming package and approve paying this in the current month bill that will be generated. Please confirm once the needful has been done. ');

    function onFormSubmit() {
        var text = $('.classify-text').val();
        $('.loading').show();
        $('.answers').hide();
        $('.classify-btn').prop('disabled', true);
        $.post("/classify", {text: text}, function(data) {
            renderAnswer(data)
        }).fail(function(err) {
            renderAnswer(err);
        });
        return false;
    }

    function onExamplesClick() {
        var text = this.innerHTML;
        $('.classify-text').val(text);
        if (text && text.length > 1) {
            $('#form').submit();
        }
    }

    function renderAnswer(data) {
        if (!data.classes || !data.classes.length > 0) {
            $('.answer').html('Something went wrong :-(');
        } else {
            var top_sample = data.classes[0]  
            var top = "" 

            if (top_sample.class_name === "New") 
            { 
                top = "The customer is asking for a new account";
            } 

            else if (top_sample.class_name === "Update") 
            { 
                top = "The customer is asking to update services";
            }  

            else if (top_sample.class_name === "Delete") 
            { 
                top = "The customer is asking to delete their account";
            }  

            else if (top_sample.class_name === "New Update") 
            { 
                top = "The customer is asking for a new account and updating their services";
            } 

            else if (top_sample.class_name === "New Delete") 
            { 
                top = "The customer is asking for a new account and deleting an account";
            }  

            else if (top_sample.class_name === "Update Delete") 
            { 
                top = "The customer is asking to update services and delete an existing account";
            }
            
            else if (top_sample.class_name === "New Update Delete") 
            { 
                top = "The customer is asking for a new account, updating their services and deleting existing account";
            }


            $('.answer').html(top);
            $('.confidence').html('Confidence: '+Math.floor(top_sample.confidence*100 ).toFixed(0)+'%');
        }

        $('.classify-btn').prop('disabled', false);
        $('.answers').show();
        $('.loading').hide();
    }
}());

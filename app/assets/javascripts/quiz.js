 var quiztitle = "Experiment Part 1";


 var quiz = [
        {
            "question" : "Which of the following is NOT among the 4 cardinal signs of inflammation?",
            "choices" : [
                                    "redness",
                                    "heat",
                                    "pain",
                                    "itching"
                                ],
            "correct" : "itching"
        },
        {
            "question" : "What is the first response of blood vessels at the site of injury?",
            "choices" : [
                                    "vasoconstriction",
                                    "vasodilation",
                                    "redness",
                                    "edema"
                                ],
            "correct" : "vasoconstriction"
        },
        {
            "question" : "Which of the following is a correct statement about inflammation?",
            "choices" : [
                                    "Inflammation is a normal process which protects the body from foreign substances.",
                                    "Inflammation is the body's immune response to irritation, injury, or trauma.",
                                    "Inflammation is a sequence of cellular and chemical events which occur to protect the body.",
                                    "All of the above."
                                ],
            "correct" : "All of the above."
        },
     

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;
     confidence = 0;
     user_correct = [];
     user_answers = [];
     user_confidence =[];
     review_time =[];
     decision_time =[];
     reading_time =[];
     result = 0;
     stage = 0;
     group =0;

 jQuery(document).ready(function ($) {


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }

     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             $('#confidence-block').empty();
             $(document.createElement('li')).addClass('confidence_title').attr('data-index', i).text("Confidence").appendTo('#confidence-block');
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
                 if( i !=0){12
                    $(document.createElement('li')).addClass('confidence choice-box').attr('data-index', i).text(i).appendTo('#confidence-block');
                }
             }

         }
     }

     function nextQuestion() {
         submt = true;
         $('#result').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();
     }


     function processQuestion(choice,confidence) {
        for (var i = 0; i < quiz[currentquestion]['choices'].length; i++){
            if(quiz[currentquestion]['choices'][i] == quiz[currentquestion]['choices'][choice]){
                user_answers.push(i+1);
            }
        }
        user_confidence.push(confidence);
         if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             user_correct.push(1);
             result = confidence;
             score += parseInt(result);
             $('.choice').eq(choice).css({
                 'background-color': '#50D943'
             });
             $('.confidence').eq(confidence-1).css({
                 'background-color': '#50D943'
             });
             $('#result').html('<strong>+'+result+ '</strong>');
             $('#result').css({
                 'color': 'green'
             });
             $('#score').html('<strong> Score: </strong>' + score);
         } else {
            user_correct.push(0);
             $('.choice').eq(choice).css({
                 'background-color': '#D92623'
             });
             $('.confidence').eq(confidence-1).css({
                 'background-color': '#D92623'
             });
             for(var i = 0; i < quiz[currentquestion]['choices'].length; i++){
                if(quiz[currentquestion]['choices'][i] == quiz[currentquestion]['correct']){
                    $('.choice').eq(i).css({
                    'background-color': '#50D943'
                    });
                }
             }
             result = confidence;
             score -= result;  
             $('#result').html('<strong> -'+ result + '</strong>' );
             $('#result').css({
                 'color': 'red'
             });
             $('#score').html('<strong> Score: </strong>'+ score );
         }
         currentquestion++;
         var start = Date.now();
         $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
            var end = Date.now()
            review_time.push(end-start);
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
                 $(this).text('Check Answer').css({
                     'color': '#222'
                 }).off('click');
                 nextQuestion();
             }
         })
     }


     function setupButtons() {
        var start = Date.now();
        confidence = 0;
        picked = -1;
        submt = true;
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         });
         $('.confidence').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.confidence').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         });
         $('.choice').on('click', function () {
             picked = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
            });
        $('.confidence').on('click', function () {
             confidence = $(this).attr('data-index');
             $('.confidence').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
             });
             if (submt) {
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'
                 }).on('click', function () {
                        $('.choice').off('click');
                        $('.confidence').off('click');
                        $(this).off('click');
                     if(picked == -1){
                        alert("Must choose an answer!");
                        $('.choice').removeAttr('style').off('mouseout mouseover click');
                        $('.confidence').removeAttr('style').off('mouseout mouseover click');
                        setupButtons();
                     } 
                     else if(confidence == 0){
                        alert("Must choose confidence level!");
                        $('.choice').removeAttr('style').off('mouseout mouseover click');
                        $('.confidence').removeAttr('style').off('mouseout mouseover click');
                        setupButtons();
                     }
                     else{
                        var end = Date.now();
                        decision_time.push(end-start);
                        processQuestion(picked,confidence);
                    }
                 });
             }
     }


     function endQuiz() {
         $('#result').remove();
         $('#score').remove();
         $('#question').empty();
         $('#choice-block').remove();
         $('#confidence-block').remove();
         $('#submitbutton').remove();
         $('#pager').remove();
         var data2 = [user_correct,user_answers,user_confidence,review_time,decision_time,reading_time];
         if(stage ==2){
            if(group == 0){
            $('#question').html("Congratulations on finishing the quiz! Your final score was " + score + " out of a possible 60 points. You now have the option to review the passage for any amount of time before taking one last quiz. Click on the passage and press the proceed to quiz button when you are ready.");
        }
        else{
            $('#question').html("Congratulations on finishing the quiz! Your final score was " + ((score / 20)*100) + "%. You now have the option to review the passage for any amount of time before taking one last quiz. Click on the passage and press the proceed to quiz button when you are ready.");
        }
        $(document.createElement('div')).addClass('choice-box').attr('id', 'nextbutton').text('Next').css({
                'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
            }).appendTo('#frame');
                $('#nextbutton').on('click', function () {
                $('#title').remove();
                $('#question').remove();
                $('#nextbutton').remove();
                stage++;
                reading();
        })
        }
        else{
            $('#question').html("Finished! Thank you for participating!");
            exportToCsv("Trial1",data2);
        }
    }
         // var trial1 = "Trial1";
         // $.ajax({
         //    url: "/experiment/quiz",
         //    type: "POST",
         //    data: {"data": data2, dataType: "json"}
         // })
         


     function init() {

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');

             //add result and score
             $(document.createElement('ul')).addClass('scorer').attr('id', 'result').appendTo('#frame');
             $(document.createElement('ul')).addClass('scorer').attr('id', 'score').appendTo('#frame').text("Score: 0");
             

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
             $(document.createElement('ul')).attr('id', 'confidence-block').appendTo('#frame');

             //add choices
             addChoices(quiz[0]['choices']);

             // $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                 'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
             }).appendTo('#frame');

             setupButtons();
         }
    }
     function reading(){
        var start = Date.now();
        if (stage == 1) {
             $(document.createElement('h1')).attr('id', 'title').text("Experiment Part 1").appendTo('#frame');
         } else {
             $(document.createElement('h1')).text("Experiment Part 2").appendTo('#frame');
         }
        $('<iframe src="https://docs.google.com/document/d/1rSs2rIZWuivtGQy3IjLrgBfcUX4SjfvWcPCIpxIIAVU/pub?embedded=true" id="myFrame"></iframe>').appendTo('#frame');
        if (stage!=3){
        $(document.createElement('div')).addClass('choice-box').attr('id', 'nextbutton').text('Next').css({
                'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
            }).appendTo('#frame');
                $('#nextbutton').on('click', function () {
                    var end = Date.now();
                    reading_time.push(end-start);
                    $('#nextbutton').remove();
                    $('#myFrame').remove();
                    prompt();
        });
        }
        else{
            $(document.createElement('div')).addClass('choice-box').attr('id', 'nextbutton').text('Proceed to Quiz').css({
                'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
            }).appendTo('#frame');
                $('#nextbutton').on('click', function () {
                $('#nextbutton').remove();
                $('#myFrame').remove();
                var end = Date.now();
                reading_time.push(end-start);
                currentquestion = 0;
                score = 0;
                init();
        }); 
        }
    }
     function prompt(){
        if(stage == 0){
            $(document.createElement('div')).attr('id', 'intro').text('Part 1 Instructions').appendTo('#frame');
            $(document.createElement('div')).attr('id', 'intro2').text('Before you begin, please make sure you’re in a quiet location where you will not be disturbed for about 20-30 minutes.We’re going to give you a reading about your body’s initial response to cell injury.Read through the passage once and click the next button when you are done. You will then be given a short quiz on this passage. ' ).css({
                 'color': '#222',
                 'padding': '30px 0'
            }).appendTo('#frame');
        }
        if(stage == 1 && group == 0){
            $(document.createElement('div')).attr('id', 'intro2').text('You will now take a 20 question multiple choice quiz. Click the answer you believe to be correct - there should only be one correct answer per question. Then, rate your confidence in your answer on a scale from 1-3. If you are correct, you will earn as many points as your confidence rating. If you are incorrect, you will be deducted your confidence rating.').appendTo('#frame');
        }
        if(stage == 1 && group == 1){
            $(document.createElement('div')).attr('id', 'intro').text('Part 1 Instructions').appendTo('#frame');
            $(document.createElement('div')).attr('id', 'intro2').text('You will now take a 20 question multiple choice quiz. Click the answer you believe to be correct - there should only be one correct answer per question.').appendTo('#frame');
        }
        $(document.createElement('div')).addClass('choice-box').attr('id', 'nextbutton').text('Next').css({
                'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
            }).appendTo('#frame');
        $('#nextbutton').on('click', function () {
                $('#intro').remove();
                $('#intro2').remove();
                $('#nextbutton').remove();
                if(stage == 0){
                    stage++;
                    reading();
                }
                else if(stage == 1){
                    stage++
                    init();
                }
             });
     }
     prompt();
 });

 function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
  

 var quiztitle = "Experiment Part 2";


 var quiz = [
        {
            "question" : "Q1: What is the function of the kidney?",
            "choices" : [
                                    "The kidney is responsible for filtering the liquid in our bodies, but it will not filter alternative uses of this kind.",
                                    "It would create a spiraling nature",
                                    "Albert Einstein",
                                    "Ralph Waldo Emmerson"
                                ],
            "correct" : "Albert Einstein",
            "explanation" : "Albert Einstein drafted the special theory of relativity in 1905.",
        },
        {
            "question" : "Q2: Who is on the two dollar bill?",
            "choices" : [
                                    "Thomas Jefferson",
                                    "Dwight D. Eisenhower",
                                    "Benjamin Franklin",
                                    "Abraham Lincoln"
                                ],
            "correct" : "Thomas Jefferson",
            "explanation" : "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note.",
        },
        {
            "question" : "Q3: What event began on April 12, 1861?",
            "choices" : [
                                    "First manned flight",
                                    "California became a state",
                                    "American Civil War began",
                                    "Declaration of Independence"
                                ],
            "correct" : "American Civil War began",
            "explanation" : "South Carolina came under attack when Confederate soldiers attacked Fort Sumter. The war lasted until April 9th 1865.",
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
     user_time =[];
     decision_time =[];
     result =0;

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
             if(confidence == 1){
                result = 0;
             }
             if(confidence == 2){
                result = 2;
             }
             if(confidence == 3){
                result = 4;
             }

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
            user_time.push(end-start);
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
         $('#choice-block').empty();
         $('#confidence-block').empty();
         $('#submitbutton').remove();
         $('#question').html("Your score is " + score  +"<br>"+ user_answers+ "<br>" + user_confidence + "<br>" + user_time);
         var data2 = [user_correct,user_answers,user_confidence,user_time,decision_time];
         var trial1 = "Trial1";
         // $.ajax({
         //    url: "/experiment/quiz",
         //    type: "POST",
         //    data: {"data": data2, dataType: "json"}
         // })
         // exportToCsv(trial1,data);
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('#frame');
         }

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

     init();
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
  

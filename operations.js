
var expandedPanel = null;
var minimizedGallerySize = 300; // (in px)

function p(strg) {
    console.log(strg);
}

function px(int) {
    return int + "px";
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function addImagePost(imgURL, title, author) {

  var errorMessage = 'error with image :O';
  var id = title.replace(/\s|\W/g, '');

  var description = "This is a really cool description for a cool art piece! Crocodiles are yummy and aligators are a little scary O:) noo but its always good to eat healthily because otherwise youd be unhealthy! But healthiness isnt the only thing I think about I swearrrr";

  p(id);

  $('#visual').append(
      "<div class='imagePanel' id='" + id + "'>"
    +   "<div class='imageContainer'>"
    +     "<button class='close'> &times </button>"
    +     "<img src='" + imgURL + "' alt='" + errorMessage + "'>"
    +   "</div>"
    +   "<div class='text'>"
    +     "<div class='title'>" + title + "</div>"
    +     "<div class='author'> - " + author + "</div>"
    +     "<div class='description'>" + description + "</div>"
    +   "</div>"
    + "</div>"
    );

  var img = $('#' + id + ' .imageContainer img');

  img.css('opacity', 0);

  img.on('load', function(){
    
    p(title + " image is loaded!");

    var imgHeight = img.height();
    var imgWidth = img.width();

    if (imgWidth > imgHeight) {
      img.css( "width", "auto" );
      img.css( "height", "100%" );
    } else {
      img.css( "height", "auto" );
      img.css( "width", "100%" );
    }

    img.css('opacity', 1);

  });

};


function shrinkImage() {
  p("shrink image has been called!");

  if (expandedPanel != null) {
    var img = expandedPanel.find('.imageContainer img');

    var imgHeight = img.height();
    var imgWidth = img.width();

    if (imgWidth > imgHeight) {
      img.css( "width", "auto" );
      img.css( "height", "100%" );
    } else {
      img.css( "height", "auto" );
      img.css( "width", "100%" );
    }

    expandedPanel.find('.imageContainer').css( "width", '300px');
    expandedPanel.find('.imageContainer').css( "height", '300px');
    // expandedPanel.find('.imageContainer img').css( "width", "100%" );
    // expandedPanel.find('.imageContainer img').css( "height", "auto" );

    $('.text').show();
    $('.imageBlurb').hide(100);
    unconvertBlurbStyle(expandedPanel)
    expandedPanel.find('.close').hide(1400);
    expandedPanel.find('.description').hide(1400);

    expandedPanel = null;
    
  }
}

function scrollToTopOfEntity(entity) {
  setTimeout(function() {
    // top position relative to the document
    var pos = entity.offset().top;

    var menuBottom = $('.menu').outerHeight();

    // animated top scrolling
    $('body, html').animate({scrollTop: pos - menuBottom});

  }, 1000);
}


function spaceExistsToLeftOrRight(entity) {
  var screenWidth = $(window).width();
  var imagePanelWidth = entity.width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var totalWidthOfNonImagePanelArea = screenWidth - imagePanelWidth;

  p("screenWidth: " + screenWidth);
  p("imagePanelWidth: " + imagePanelWidth);
  p("marginBorderSize: " + marginBorderSize);
  p("totalWidthOfNonImagePanelArea: " + totalWidthOfNonImagePanelArea);
  p("collapsedPanelSize: " + (minimizedGallerySize + marginBorderSize));

  return (totalWidthOfNonImagePanelArea >= minimizedGallerySize + marginBorderSize);
}

function spaceExistsUnderCollapsedPanel(entity) {
  var screenHeight = $(window).height();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var spaceCollapsedPanelTakesUp = minimizedGallerySize + marginBorderSize + 0.5 * marginBorderSize; //(to account for text underneath - need a better safe way to do this though)
  var spaceForDescriptionToTakeUp = minimizedGallerySize + marginBorderSize; // in the future this might want to be an input value so that size can depend on description length

  var totalHeightOfNonImagePanelArea = screenHeight - spaceCollapsedPanelTakesUp;

  p("-- Is there space below?");
  p("screenHeight: " + screenHeight);
  p("totalHeightOfNonImagePanelArea: " + totalHeightOfNonImagePanelArea);
  p("collapsedPanelSize: " + spaceCollapsedPanelTakesUp);

  return (totalHeightOfNonImagePanelArea >= spaceForDescriptionToTakeUp);
}

function isThereSpaceOnTheLeft(entity) {
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();

  p("-- Is there space on left?");
  p("left: " + elemRect.left);
  p("collapsedPanelSize: " + (minimizedGallerySize + 1.5 * marginBorderSize));

  return (elemRect.left >= minimizedGallerySize + 1.5 * marginBorderSize);
}

function isThereSpaceOnTheRight(entity) {
  var imagePanelWidth = entity.width();
  var screenWidth = $(window).width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();

  p("-- Is there space on right?");
  p("rightcornerSpace: " + (screenWidth - (elemRect.left + imagePanelWidth)));
  p("collapsedPanelSize: " + (minimizedGallerySize + 1.5 * marginBorderSize));

  return ((screenWidth - (elemRect.left + imagePanelWidth)) >= minimizedGallerySize + 1.5 * marginBorderSize);
}

function placeDescription(entity, leftOrRight, aboveOrBelow) {
  if ((leftOrRight != "right" && leftOrRight != "left") || (aboveOrBelow != "above" && aboveOrBelow != "below")){
    p("Error: Bad input in 'placeDescription' function...")
    return;
  }

  var imagePanelWidth = entity.width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));
  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();

  var left = 0;
  var top = 0;

  if (leftOrRight == "left") {
    left = elemRect.left - minimizedGallerySize - marginBorderSize;
  } else if (leftOrRight == "right") {
    left = elemRect.left + imagePanelWidth + marginBorderSize;
  }

  if (aboveOrBelow == "above") {
    // top = elemRect.top - bodyRect.top;
    setDescriptionToRight(entity);
    return;
  } else if (aboveOrBelow == "below") {
    top = (elemRect.top - bodyRect.top) + minimizedGallerySize + marginBorderSize * 3;
  }

  var blurb = $('.imageBlurb');
  blurb.find('.title').html(entity.find('.title').html());
  blurb.find('.author').html(entity.find('.author').html());
  blurb.find('.description').html(entity.find('.description').html());


  blurb.css( "top", top + "px" );
  blurb.css( "left", left + "px" );

  blurb.show('fade', 1000);

  p("-- Placing description...");
  p("top: " + top);
  p("left: " + left);

}


function setDescriptionToBottom(entity) {
  convertBlurbStyle(entity);
  entity.find('.text .description').show();
  entity.find('.text').show('blind', 1000);
}

function setDescriptionToRight(entity) {
  entity.find('.text .description').show();

  entity.find('.imageContainer').css({'display': 'inline-block',
                                      'vertical-align': 'top'});
  entity.find('.text').css({'display': 'inline-block',
                            'margin-left': '20px'});
  convertBlurbStyle(entity);
}

function convertBlurbStyle(entity) {
  entity.find('.title').css({'font-size': '25px',
                             'text-align': 'center',
                             'display': 'block'});
  entity.find('.author').css({'font-size': '12px',
                              'text-align': 'center',
                              'display': 'block'});
  entity.find('.author').css({'font-size': '15px'});
}

function unconvertBlurbStyle(entity) {
  entity.find('.imageContainer').css({'display': ''});
  entity.find('.text').css({'display': '',
                            'margin-left': ''});
  entity.find('.title').css({'font-size': '',
                             'text-align': '',
                             'display': ''});
  entity.find('.author').css({'font-size': '',
                              'text-align': '',
                              'display': ''});
  entity.find('.author').css({'font-size': ''});
}



function makeBlueEnclosingBox(entity) {

  var imagePanelWidth = entity.width();
  var imagePanelHeight = entity.height();

  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  // var rect = entity[0].getBoundingClientRect();
  // console.log(rect.top, rect.bottom, rect.left, rect.right);

  var test = $('#testSquare');


  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();
  var offset = elemRect.top - bodyRect.top;

  test.css( "top", (elemRect.top - bodyRect.top) + "px" );
  test.css( "left", (elemRect.left) + "px" );
  // test.css( "right", (screenWidth - imagePanelWidth - elemRect.left) + "px" );

  test.height(imagePanelHeight);
  test.width(imagePanelWidth);

  p(test.css( "top"));
  p(test.css( "left"));

}



$(document).on('click','.close',function(evt){
  p("close clicked");
  // evt.stopPropagation();
  var scrollTo = expandedPanel;
  shrinkImage();
  scrollToTopOfEntity(scrollTo);
});


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 900);
        return false;
      }
    }
  });
});

$(document).ready(function() {

  addImagePost('images/spider.jpg', 'Spiderman', 'Peter Parker');
  addImagePost('images/guard.JPG', 'Guardian', 'Peter Quill');
  addImagePost('images/planets.png', 'Planets', 'Galactus');
  addImagePost('images/tahu.JPG', 'Tahu', 'Mata Nui');
  addImagePost('images/newt.png', 'Newt', 'Frog');

  addImagePost('images/night.jpg', 'Nighttime Monster', 'Godzilla');   
  addImagePost('images/pixar-incredibles-lou-romano-colour-script.jpg', 'This is a really really cool colorscript from the movie the Incredibles', 'Brad Bird');
  addImagePost('images/training_0014_by_sergioxdva-dadcne0.jpg', 'Doesnt this look exactly like a statue?!', 'I am a cool artist');
   
  addImagePost('images/rabbit.jpg', 'Rambling Magician of Westerly', 'Bunnicula');     
  addImagePost('images/feathers.jpg', 'A Feathered Beast', 'Trex');     
  addImagePost('images/good.jpg', 'A Good Dinosaur', 'Pixar is the best');

  
  

  $(".imagePanel").hover(
    function(){

      if (!$(this).is(expandedPanel)){
        var img = $(this).find('.imageContainer img');

        var imgHeight = img.height();
        var imgWidth = img.width();

        if (imgWidth > imgHeight) {
          img.css( "width", "auto" );
          img.css( "height", "105%" );
        } else {
          img.css( "height", "auto" );
          img.css( "width", "105%" );
        }
      }

    }, 
    function(){
      if (!$(this).is(expandedPanel)){
        var img = $(this).find('.imageContainer img');

        var imgHeight = img.height();
        var imgWidth = img.width();

        if (imgWidth > imgHeight) {
          img.css( "width", "auto" );
          img.css( "height", "100%" );
        } else {
          img.css( "height", "auto" );
          img.css( "width", "100%" );
        }
      }
    });




  $(".imagePanel").click(function(e){

    p($(e.target).hasClass("close"));
    if ($(e.target).hasClass("close")) {
      p("close click registered in imagePanel click -- aborting...")
      return;
    }


    p("hi");
    //var requestId = $(this).attr("class");
    //$(this).find('.imageContainer').css( "overflow", "show" );

    shrinkImage();



    // $('.imageContainer').css( "width", '300px');
    // $('.imageContainer').css( "height", '300px');
    // $('.imageContainer img').css( "width", "100%" );
    // $('.imageContainer img').css( "height", "auto" );

    expandedPanel = $(this);
    $(this).find('.text').hide();

    var imgHeight = $(this).find('.imageContainer img').height();
    var imgWidth = $(this).find('.imageContainer img').width();

    var marginBorders = 2 * parseInt($(this).css("marginRight").replace('px', ''));


    //expandedPanel.find('.description').show();
    var maxHeight = $(window).height() - $('.menu').outerHeight() - marginBorders; //- $(this).find('.text').outerHeight();
    //expandedPanel.find('.description').hide();
    var maxWidth = $(window).width() - marginBorders;


    // $(this).find('.imageContainer').css( "width", "auto" );
    // $(this).find('.imageContainer').css( "height", "auto" );
    // $(this).find('.imageContainer').css( "max-height", $(window).height() + $('.menu').outerHeight() + "px");
    // $(this).find('.imageContainer').css( "max-width", "100%");

    // if (imgHeight > imgWidth) {
    //   $(this).find('.imageContainer img').css( "height", "100%" );
    //   $(this).find('.imageContainer img').css( "width", "auto" );
    // } else {
    //   $(this).find('.imageContainer img').css( "width", "100%" );
    //   $(this).find('.imageContainer img').css( "height", "auto" );
    // }

    // $(this).find('.imageContainer').css( "width", "auto" );
    //     $(this).find('.imageContainer').css( "height", "auto" );
    // $(this).find('.imageContainer').css( "max-width", "100%" );
    //$(this).find('.imageContainer').css( "max-height", $(window).height().toString());

    
    // $(this).find('.imageContainer').css( "width", "auto" );
    // $(this).find('.imageContainer').css( "height", "auto" );
    // $(this).find('.imageContainer').css( "max-height", px(maxHeight));
    // $(this).find('.imageContainer').css( "max-width", px(maxWidth));

    // p(maxHeight);
    // p(maxHeight * imgWidth / imgHeight);

    // p(maxWidth);
    // p(maxWidth * imgHeight / imgWidth);

    // if (!$(this).is(expandedPanel)){
    //   var img = $(this).find('.imageContainer img');

    //   if (imgWidth > imgHeight) {
    //     img.css( "width", "auto" );
    //     img.css( "height", "100%" );
    //   } else {
    //     img.css( "height", "auto" );
    //     img.css( "width", "100%" );
    //   }
    // }



    var newWidth = maxHeight * imgWidth / imgHeight;
    var newHeight = maxWidth * imgHeight / imgWidth;

    if (newWidth < maxWidth) {
      // $(this).find('.imageContainer img').css( "height", "100%" );
      // $(this).find('.imageContainer img').css( "width", "auto" );

      $(this).find('.imageContainer').css( "height", px(maxHeight));
      $(this).find('.imageContainer').css( "width", px(newWidth));

    } else {

      // $(this).find('.imageContainer img').css( "width", "100%" );
      // $(this).find('.imageContainer img').css( "height", "auto" );

      $(this).find('.imageContainer').css( "height", px(newHeight));
      $(this).find('.imageContainer').css( "width", px(maxWidth));
    }





    // if (imgHeight > imgWidth) {
    //   p("height("+imgHeight+") is larger than width("+imgWidth+")");

      

    //   var newHeight = maxHeight;
    //   var newWidth = maxHeight * imgWidth / imgHeight;

    //   if (newWidth < maxWidth) {
    //     $(this).find('.imageContainer img').css( "height", "100%" );
    //     $(this).find('.imageContainer img').css( "width", "auto" );

    //     $(this).find('.imageContainer').css( "height", px(maxHeight));
    //     $(this).find('.imageContainer').css( "width", px(maxHeight * imgWidth / imgHeight));

    //   } else {

    //     $(this).find('.imageContainer img').css( "width", "100%" );
    //     $(this).find('.imageContainer img').css( "height", "auto" );

    //     $(this).find('.imageContainer').css( "width", px(maxWidth));
    //     $(this).find('.imageContainer').css( "height", px(maxWidth * imgHeight / imgWidth));
    //   }

      
    // } else {
    //   p("height("+imgWidth+") is larger than or equal to width("+imgHeight+")");
    //   $(this).find('.imageContainer img').css( "width", "100%" );
    //   $(this).find('.imageContainer img').css( "height", "auto" );

    //   $(this).find('.imageContainer').css( "width", px(maxWidth));
    //   $(this).find('.imageContainer').css( "height", px(maxWidth * imgHeight / imgWidth));
    // }

    
    expandedPanel.find('.close').show(1400);
    //expandedPanel.find('.description').show(1400);

    setTimeout(function() {

      if (isThereSpaceOnTheLeft(expandedPanel) && spaceExistsUnderCollapsedPanel(expandedPanel)) {
        placeDescription(expandedPanel, "left", "below")
      } else if (isThereSpaceOnTheRight(expandedPanel) && spaceExistsUnderCollapsedPanel(expandedPanel)) {
        placeDescription(expandedPanel, "right", "below");
      } else if (isThereSpaceOnTheLeft(expandedPanel) || isThereSpaceOnTheRight(expandedPanel)) {
        setDescriptionToRight(expandedPanel);
      } else {
        setDescriptionToBottom(expandedPanel);
      }

      p(spaceExistsToLeftOrRight(expandedPanel));
      p(spaceExistsUnderCollapsedPanel(expandedPanel));

      p(isThereSpaceOnTheLeft(expandedPanel));
      p(isThereSpaceOnTheRight(expandedPanel));

      scrollTo(expandedPanel, 0);

    }, 1400);



    //document.getElementById(expandedPanel.attr('id')).scrollIntoView();
    //window.location.href = "#" + expandedPanel.attr('id');


  });


function scrollTo(entity, timeout) {
  setTimeout(function() {
      // prevent standard hash navigation (avoid blinking in IE)
      // e.preventDefault();

      // top position relative to the document
      var pos = entity.offset().top;

      var menuBottom = $('.menu').outerHeight();

      // animated top scrolling
      $('body, html').animate({scrollTop: pos - menuBottom});
    }, timeout);
}





  $(document).click(function(e){

    p($(e.target))

    // if (!($(e.target).hasClass('imagePanel') 
    //   ||  $(e.target).hasClass('close')
    //   ||  $(e.target).hasClass('imageContainer')



    //   )) {
    //   shrinkImage();
    // }

    if (!$(e.target).closest('.imagePanel').length) {
      var scrollTo = expandedPanel;
      shrinkImage();
      scrollToTopOfEntity(scrollTo);
    }


    
  });




});


// // handle links with @href started with '#' only
// $(document).on('click', 'a[href^="#"]', function(e) {
//     // target element id
//     var id = $(this).attr('href');

//     // target element
//     var $id = $(id);
//     if ($id.size() === 0) {
//         return;
//     }

//     // prevent standard hash navigation (avoid blinking in IE)
//     e.preventDefault();

//     // top position relative to the document
//     var pos = $(id).offset().top;
//     var menuBottom = $('.menu').outerHeight();

//       // animated top scrolling
//       $('body, html').animate({scrollTop: pos - menuBottom});
// });


$(function() {
    $("a").click(function(e) {

      // target element id
      var id = $(this).attr('href');

      // target element
      var $id = $(id);
      if ($id.size() === 0) {
          return;
      }

      // prevent standard hash navigation (avoid blinking in IE)
      e.preventDefault();

      // top position relative to the document
      var pos = $(id).offset().top;
      var menuBottom = $('.menu').outerHeight();

      // animated top scrolling
      $('body, html').animate({scrollTop: pos - menuBottom});

    });
});






// // function openNav() {
// //     document.getElementById("mySidenav").style.width = "250px";
// // }

// // function closeNav() {
// //     document.getElementById("mySidenav").style.width = "0";
// // }

// var splitter = "_-_-_-_-_-_";

// var currRequestId = "None";
// var currChatId = "None";
// var currSpId = "None";

// var finalQuote = false;


// // // Function to take care of what happens when enter key is pressed while editing input field
// // $.fn.pressEnter = function(fn) {  

// //     return this.each(function() {  
// //         $(this).bind('enterPress', fn);
// //         $(this).keyup(function(e) {
// //             if(e.keyCode == 13) {
// //               $(this).trigger("enterPress");
// //             }
// //         })
// //     });  
// //  }; 

// // $( function () {
// //     $('chatInput').pressEnter(function(){
// //         console.log("sending message?");
// //         sendMessageInputted();

// //     });
// // });






// // //use it:
// // $('chatInput').pressEnter(function(){
// //     console.log("sending message?");
// //     sendMessageInputted();

// // });


// function enterToSend(e) { 
//     // look for window.event in case event isn't passed in
//     e = e || window.event;
//     if (e.keyCode == 13) {
//         sendMessageInputted();
//     }
// }



// // Closes the Popup displayed for submitting a Queue
// function closePopup(){

//     // Hide the popup and background
//     $("#dimmer").hide(50);
//     $("#quoteform").hide(50);

//     // Erase the text inputs
//     $('#quoteform').find('input').val('');
//     resetHighlights();
// }


// // Adjusts heights of the list of data and the chat to fill the screen
// function refreshHeights(){
    

//     var height1 = $(window).height()-$(".left").offset().top;
//     var height2 = $(window).height()-$(".logininfo").offset().top;

//     var height = Math.min(height1, height2);

//     // // Attempt at animating the height changing
//     // var curr_height = $("#right").height();
//     // if (curr_height = height){
//     //     return;
//     // } else if (curr_height > height){
//     //     $("#left").height((curr_height - 1) + "px");
//     //     $("#right").height((curr_height - 1) + "px");
//     //    setTimeout(function(){
//     //        refreshHeights();
//     //    }, 10) 
//     // } else if (curr_height < height){
//     //     $("#left").height((curr_height + 1) + "px");
//     //     $("#right").height((curr_height + 1) + "px");
//     //    setTimeout(function(){
//     //        refreshHeights();
//     //    }, 10) 
//     // }

//     var padding = 20;

//     $("#tabBar").height(padding*2);
//     $("#tabBar").width($(".left").width());
//     $(".left").height(height - $("#tabBar").height()+ padding/2);


//     var chatHeight = height - $(".right").css("padding").replace("px", "")*2 - padding*3.5;

//     $(".right").height(chatHeight);

//     //$(".rightBottom").width($(".right").width() + padding*2);
//     $(".rightBottom").width("40%");
//     $(".rightBottom").height(height - chatHeight - $(".rightBottom").css("padding").replace("px", "")*2);
//     // $(".rightBottom").css('right', '0');
//     // $(".rightBottom").css('bottom', '0');

//     $("#sendMessage").css('right', padding.toString());
//     $("#sendMessage").css('bottom', padding.toString());
//     $("#chatInput").css('right', ($("#sendMessage").width() + padding + padding).toString());
//     $("#chatInput").css('bottom', padding.toString());
//     $("#chatInput").width($(".right").width() - $("#sendMessage").width() - padding*3);

//     $("#sendBusiness").css('right', padding.toString());
//     $("#sendBusiness").css('bottom', (height/2).toString());
//     $("#businessInput").css('right', ($("#sendMessage").width() + padding + padding).toString());
//     $("#businessInput").css('bottom', (height/2).toString());
//     $("#businessInput").width($(".right").width() - $("#sendMessage").width() - padding*3);
    

//     // $(".requestCard").css('margin-left', (($(".left").width() - $(".requestCard").width())/2).toString() + ' px');

//     resizeChat();
//     scrollUp();
// }


// function scrollUp() {
//     //$('.right').animate({scrollTop: $(".right").height()});
//     // THIS IS CAUSING A WIERD BUG ---- CHECK LATER
// }

// function resizeChat() {
//     $('.message').width($(".right").width()*0.75);
// }

// function resetHighlights() {
//     $('.requestCard').css('background-color', '#FFFFFF');
//     $('.requestCardText').css('color', 'black');
// }

// function highlightActiveRequest(requestId) {
//     console.log("request colored");

//     if (requestId == "") {
//         requestId = currRequestId;
//     }

//     $('#request' + requestId).css('background-color', '#404040');
//     $('#request' + requestId + ' .requestCardText').css('color', '#FFFFFF');
// }

// function highlightActiveFavorite(chatId) {

//     if (chatId == "") {
//         chatId = currChatId;
//     }

//     $('#favorite' + chatId).css('background-color', '#404040');
//     $('#favorite' + chatId + ' .requestCardText').css('color', '#FFFFFF');
// }

// // A timer value to make sure that the refresh screen function isnt called
// // repeatedly while the screen is actively being resized
// var globalResizeTimer = null;

// $(window).resize(function() {
//     // if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
//     // globalResizeTimer = window.setTimeout(function() {
//         refreshHeights()
//     // }, 200);
// });


// // Deals with clicking of buttons
// $(document).ready(function() {

//     $('.left').click(resetHighlights);

//     // useful for development purposes
//     //$('.logininfo').hide();

//     // By default
//     $('#OperationsPanel').hide();
//     $("#quoteform").hide();
//     $("#invoiceformFields").hide();

//     $("#dimmer").hide();
//     $("#sendMessage").hide();
//     $("#chatInput").hide();

//     $("#businessInput").hide();
//     $("#sendBusiness").hide();

//     $('#userList').hide();
//     $('#favoritesList').hide();
//     $('.right').hide();

//     $('#tabBar').hide();
//     $('#logoutButton').hide();

//     startListeners();

//     // When logging in
//     $("#submit").click(function(){
//         var email = $('#email').val();
//         var password = $('#password').val();

//         console.log("email is " + email);
//         console.log("password is " + password);

//         // Check if valid password and username were entered
//         firebase.auth().signInWithEmailAndPassword(email, password).then(

//             function(success) {
//                 console.log("hi success");

//                 // if valid, execute
//                 $('.logininfo').hide(); 
//                 $('#OperationsPanel').show();
//                 $("#header").css("padding", "5%");
//                 $("#header h1").css("font-size", "1.7em");
//                 $("#header h2").css("font-size", "0.7em");
//                 setTimeout( function() {
//                     refreshHeights();
//                     //startListeners();
//                     $('#userList').show(500);
//                     $('.right').show(100);
//                     $('#tabBar').show(100);
//                     $('#logoutButton').show(500);
//                }, 1000);
//             },
//             function(error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//                 console.log("hi fail");
//                 console.log(errorMessage);
//                 console.log(errorCode);

//                 $('#loginError').html(errorMessage);
//         });
//     });

    
//     // When space outside the popup is clicked while the popup is open
//     $("#dimmer").click(function(){
//         if (!finalQuote) {
//             closePopup();
//         }
//     });

//     // When the logoutButton is clicked while signed in
//     $("#logoutButton").click(function(){
        
//         firebase.auth().signOut().then(function() {
//             // Sign-out successful.
//             $('#OperationsPanel').hide();
//             $("#quoteform").hide();
//             $("#invoiceformFields").hide();

//             $("#dimmer").hide();
//             $("#sendMessage").hide();
//             $("#chatInput").hide();

//             $("#businessInput").hide();
//             $("#sendBusiness").hide();

//             $('#userList').hide();
//             $('#favoritesList').hide();
//             $('.right').hide();

//             $('#tabBar').hide();
//             $('#logoutButton').hide();

//             $('.logininfo').show(500); 
//             $("#header").css("padding", "15%");
//             $("#header h1").css("font-size", "2em");
//             $("#header h2").css("font-size", "1em");

//         }, function(error) {
//             // An error happened.
//         });
//     });

//     // When the cancel button is clicked while the popup is open
//     $("#cancelQuote").click(function(){
//         closePopup();
//     });

//     // When the sumbit button is clicked while the popup is open
//     $("#submitQuote").click(function(){
//         //closePopup();
//         console.log($(this).attr("class"));

//         var requestId = $(this).attr("class");
        

//         if (finalQuote) {
//             // Fetch request id
//             // var requestId = evt.currentTarget.id;
//             updateInvoice(requestId);

//             firebase.database().ref('activeRequests/' + requestId).once('value').then(function(snapshot) {
//                 var request = snapshot.val();
//                 var spId = request.spId;
//                 var ssId = request.ssId;
//                 var chatId = request.chatId;
                
//                 // firebase.database().ref('inactiveRequests/' + requestId).update({
//                 //     requestId : request
//                 // });

//                 firebase.database().ref('completedRequests/').child(requestId).update(request);

//                 firebase.database().ref('users/' + ssId + '/appointmentsList/' + requestId).remove();
//                 firebase.database().ref('users/' + spId + '/appointmentsList/' + requestId).remove(); 

//                 firebase.database().ref('activeRequests/' + requestId).off();
//                 firebase.database().ref('activeRequests/' + requestId).remove();
                

//                 //firebase.database().ref('users/' + ssId).child('historyList').update({requestId: "true"});
//                 firebase.database().ref('users/' + ssId + '/historyList/' + requestId).set(true);
//                 firebase.database().ref('users/' + spId + '/historyList/' + requestId).set(true);

//                 firebase.database().ref('users/' + ssId + '/ratingsNeeded/' + requestId).set(true);

//                 firebase.database().ref('ratings/' + requestId).update({
//                     comment: "",
//                     rating: -1.0
//                 });

//                 var updates = {};
//                 updates['chatInfo/' + chatId + '/currRequest/' + requestId] = null;
//                 updates['chatInfo/' + chatId + '/latestCompletedRequest/'] = requestId;
//                 firebase.database().ref().update(updates);

//                 firebase.database().ref('requestsToCharge/' + requestId).set(true);

//                 finalQuote = false;
                
//                 // Reset Quote
//                 $("#cancelQuote").show();

//                 $("#quoteformFields").show();
//                 $("#invoiceformFields").hide();

//                 closePopup();
//             });
//         } else {

//             updateQuote(requestId);
//             closePopup();
//         }
        
//     });

//     // When the sendMessage button is clicked and a message needs to be sent
//     $("#sendMessage").click(function(){
//         sendMessageInputted();
//     });

// // When the sendBusiness button is clicked and a message needs to be sent
//     $("#sendBusiness").click(function(){
//         // Fetch user's name and request id
//         var requestId = currRequestId;
//         var spId = $("#businessInput").val();

//         // firebase.database().ref('activeRequests/' + requestId).update({
//         //     spId: $("#businessInput").val()
//         // });

//         addBusinessAndChat(requestId, spId);

//         //updateAppointmentsLists(requestId);

//         $("#businessInput").val("");
//         console.log($("#businessInput").val());

//         $("#businessInput").hide();
//         $("#sendBusiness").hide();
//     });

//     $("#activeRequests").click(function(){
//         $('#userList').show(100);
//         $('#favoritesList').hide();

//         $("#activeRequests").css('color', "black");
//         $("#favorites").css('color', "lightgrey");

//         $("#activeRequests:hover").css('color', "black");
//         $("#favorites:hover").css('color', "black");
//     });

//     $("#favorites").click(function(){
//         $('#userList').hide();
//         $('#favoritesList').show(100);

//         $("#activeRequests").css('color', "lightgrey");
//         $("#favorites").css('color', "black");

//         $("#activeRequests:hover").css('color', "black");
//         $("#favorites:hover").css('color', "black");
//     });

// });


// function addBusinessAndChat(requestId, spId) {

//     firebase.database().ref('/activeRequests/' + requestId).once('value').then(function(snapshot) {
//         var request = snapshot.val();
//         ssId = request.ssId;
//         currTime = new Date().getTime();

//         firebase.database().ref('/users/' + spId).once('value').then(function(snapshot) {
//             var spUser = snapshot.val();

//             var chatId;

//             if (snapshot.child('businessList').exists() && snapshot.child('businessList/' + ssId).exists()) {

//                 chatId = spUser.businessList[ssId];


//                 firebase.database().ref("activeRequests").child(requestId).update({
//                     spId: spId,
//                     chatId: chatId
//                 }, function(){

//                     var updates = {};

//                     // updates['chatInfo/' + chatId] = {
//                     //     timestamp: currTime,
//                     //     currRequest: requestId
//                     // };

//                     updates['chatInfo/' + chatId + '/timestamp/'] = currTime;
//                     updates['chatInfo/' + chatId + '/currRequest/' + requestId] = currTime;

//                     updates['users/' + ssId + '/appointmentsList/' + requestId] = currTime;
//                     updates['users/' + spId + '/appointmentsList/' + requestId] = currTime;

//                     firebase.database().ref().update(updates);

//                     // Here we know chat exists, so open listener to listen to changes in the chat
//                     openChatInfoListener(chatId);
//                 });



                

//                 // firebase.database().ref().update(updates, function(){
//                 //     firebase.database().ref("activeRequests").child(requestId).update({
//                 //         spId: spId,
//                 //         chatId: chatId
//                 //     });

//                 //     // Here we know chat exists, so open listener to listen to changes in the chat
//                 //     openChatInfoListener(chatId);
//                 // });










//             } else {




//                 var newChat;

//                 newChat = firebase.database().ref("messages/").push({
//                     messages: {
//                         messageId : true
//                     }
//                 }, function(){
//                     chatId = newChat.key;


//                     firebase.database().ref("activeRequests").child(requestId).update({
//                             spId: spId,
//                             chatId: chatId
//                     }, function(){

//                         var updates = {};

//                         updates['chatInfo/' + chatId] = {
//                             ssId: ssId,
//                             spId: spId,
//                             timestamp: currTime
//                         };

//                         updates['users/' + ssId + '/businessList/' + spId] = chatId;
//                         updates['users/' + spId + '/businessList/' + ssId] = chatId;

//                         updates['users/' + ssId + '/appointmentsList/' + requestId] = currTime;
//                         updates['users/' + spId + '/appointmentsList/' + requestId] = currTime;
                        
//                         firebase.database().ref().update(updates, function(){

//                             var updates2 = {};
//                             updates2['chatInfo/' + chatId + '/currRequest/' + requestId] = currTime;
//                             firebase.database().ref().update(updates2, function(){
//                                 // Here we know chat exists, so open listener to listen to changes in the chat
//                                 openChatInfoListener(chatId);
//                             });
//                         });
//                     });
//                 });











//                 // Make new chat

//                 // var newChat;

//                 // newChat = firebase.database().ref("messages/").push({
//                 //     messages: {
//                 //         messageId : true
//                 //     }

//                 // }).then(function(){
//                 //     chatId = newChat.key;

//                 //     var updates = {};

//                 //     updates['chatInfo/' + chatId] = {
//                 //         ssId: ssId,
//                 //         spId: spId,
//                 //         timestamp: currTime,
//                 //         currRequest: requestId
//                 //     };

//                 //     updates['users/' + ssId + '/businessList/' + spId] = chatId;
//                 //     updates['users/' + spId + '/businessList/' + ssId] = chatId;

//                 //     updates['users/' + ssId + '/appointmentsList/' + requestId] = currTime;
//                 //     updates['users/' + spId + '/appointmentsList/' + requestId] = currTime;
                    
//                 //     console.log(updates);

//                 //     firebase.database().ref().update(updates);

//                 // }).then(function(){
//                 //     chatId = newChat.key;

//                 //     firebase.database().ref("activeRequests").child(requestId).update({
//                 //         spId: spId,
//                 //         chatId: chatId
//                 //     });
//                 // })

//                 // var newChat;

//                 // newChat = firebase.database().ref("messages/").push({
//                 //     messages: {
//                 //         messageId : true
//                 //     }
//                 // }, function(){
//                 //     chatId = newChat.key;

//                 //     var updates = {};

//                 //     updates['chatInfo/' + chatId] = {
//                 //         ssId: ssId,
//                 //         spId: spId,
//                 //         timestamp: currTime,
//                 //         currRequest: requestId
//                 //     };

//                 //     updates['users/' + ssId + '/businessList/' + spId] = chatId;
//                 //     updates['users/' + spId + '/businessList/' + ssId] = chatId;

//                 //     updates['users/' + ssId + '/appointmentsList/' + requestId] = currTime;
//                 //     updates['users/' + spId + '/appointmentsList/' + requestId] = currTime;
                    
//                 //     firebase.database().ref().update(updates, function(){
//                 //         firebase.database().ref("activeRequests").child(requestId).update({
//                 //             spId: spId,
//                 //             chatId: chatId
//                 //         });

//                 //         // Here we know chat exists, so open listener to listen to changes in the chat
//                 //         openChatInfoListener(chatId);
//                 //     });
//                 // });


                

//                 // firebase.database().ref("chatInfo").child(chatId).update({
//                 //     ssId: ssId,
//                 //     spId: spId,
//                 //     timestamp: currTime,
//                 //     currRequest: requestId
//                 // });

//                 // firebase.database().ref('users/' + ssId + '/businessList/').child(spId).set(chatId);
//                 // firebase.database().ref('users/' + spId + '/businessList/').child(ssId).set(chatId);

//                 // firebase.database().ref('users/' + ssId + '/appointmentsList/').child(requestId).set(currTime);
//                 // firebase.database().ref('users/' + spId + '/appointmentsList/').child(requestId).set(currTime);

//                 // firebase.database().ref("activeRequests").child(requestId).update({
//                 //     spId: spId,
//                 //     chatId: chatId
//                 // }); 

//                 // var newChat = firebase.database().ref("messages/").push({
//                 //     messages: {
//                 //         messageId : true
//                 //     }
//                 // });

//                 // chatId = newChat.key;

//                 // firebase.database().ref("chatInfo").child(chatId).update({
//                 //     ssId: ssId,
//                 //     spId: spId,
//                 //     timestamp: currTime,
//                 //     currRequest: requestId
//                 // });

//                 // firebase.database().ref('users/' + ssId + '/businessList/').child(spId).set(chatId);
//                 // firebase.database().ref('users/' + spId + '/businessList/').child(ssId).set(chatId);

//                 // firebase.database().ref('users/' + ssId + '/appointmentsList/').child(requestId).set(currTime);
//                 // firebase.database().ref('users/' + spId + '/appointmentsList/').child(requestId).set(currTime);

//                 // firebase.database().ref("activeRequests").child(requestId).update({
//                 //     spId: spId,
//                 //     chatId: chatId
//                 // });                
//             }
//         });
//     });
// }



// function updateAppointmentsLists(requestId) {
//     firebase.database().ref('activeRequests/' + requestId).once('value').then(function(snapshot) {
//         var request = snapshot.val();
//         var spId = request.spId;
//         var ssId = request.ssId;

//         var currTime = new Date().getTime();

//         firebase.database().ref('users/' + ssId + '/appointmentsList/' + requestId).remove();
//         firebase.database().ref('users/' + spId + '/appointmentsList/' + requestId).remove(); 

//         firebase.database().ref('users/' + ssId + '/appointmentsList/').child(requestId).set(currTime);
//         firebase.database().ref('users/' + spId + '/appointmentsList/').child(requestId).set(currTime);
//     });
// }



// function sendMessageInputted() {
//     var textToSend = $("#chatInput").val();

//     if (textToSend != "") {
//         console.log("time to send message!");
//         $("#chatInput").val('');

//         //firebase.database().ref('messagesTest/' + 'chatId' + '/messages').push({

//         console.log("This is in sendMessageInputted -- Chatid: " + currChatId + " userid: " + currSpId);

//         currTime = new Date().getTime();

//         firebase.database().ref('messages/' + currChatId + '/messages').push({
//             message: textToSend,
//             userId: currSpId,
//             timestamp: currTime
//         });

//         firebase.database().ref('chatInfo/' + currChatId + '/timestamp').set(currTime);
        
//         if (currRequestId != "None") {
//             firebase.database().ref('chatInfo/' + currChatId + '/currRequest/' + currRequestId).set(currTime);

//             updateAppointmentsLists(currRequestId);
//         } 

        

//         // if (currRequestId != "None") {
//         //     firebase.database().ref('activeRequests/' + currRequestId + '/updatedTimestamp').set(currTime);

//         //     //updateAppointmentsLists(currRequestId);
//         // } 
//     }
// }

// function updateQuote(requestId) {

//     var startDateAndTime = Date.parse($("#startDate").val() + " " + $("#startTime").val());

//     var endDateAndTime = Date.parse($("#endDate").val() + " " + $("#endTime").val());

//     firebase.database().ref('activeRequests/' + requestId + '/quote').set({
//         description: $("#description").val(),
//         address: $("#address").val(),
//         cost: Number($("#cost").val()),
//         tax: Number($("#tax").val()),
//         fee: Number($("#fee").val()),
//         quoteVerified: false,
//         quoteSeen: false,
//         startTimeOfTask: startDateAndTime.getTime(),
//         endTimeOfTask: endDateAndTime.getTime()
//     });

//     // firebase.database().ref('activeRequests/' + requestId + '/quote').set({
//     //     description: "Hello",
//     //     address: "34 Beep Rd",
//     //     cost: 34,
//     //     tax: 352,
//     //     fee: 352,
//     //     quoteVerified: false,
//     //     quoteSeen: false,
//     //     startTimeOfTask: Date.parse("12/3/2017 2:34 AM").getTime(),
//     //     endTimeOfTask: Date.parse("12/5/2019 2:37 AM").getTime()
//     // });

//     updateAppointmentsLists(requestId);
// }

// function updateInvoice(requestId) {
//     firebase.database().ref('activeRequests/' + requestId + '/invoice').set({
//         description: $("#invoiceDescription").val(),
//         cost: Number($("#costInvoice").val()),
//         tax: Number($("#taxInvoice").val()),
//         fee: Number($("#feeInvoice").val())
//     });

//     // firebase.database().ref('activeRequests/' + requestId + '/invoice').set({
//     //     description: "Hello",
//     //     cost: 23,
//     //     tax: 5,
//     //     fee: 20
//     // });
// }


// var chatIds = {};

// function openChatInfoListener(chatId) {

//     // dont open more listeners than nessesary
//     if (chatIds[chatId] == "opened") {
//         return; // listeners are already open!
//     }

//     chatIds[chatId] = "opened";


//     p("chatInfo Listener opened for " + chatId);

//     // firebase.database().ref('chatInfo/' + chatId).on('value', function(snapshot) {
//     //     var chat = snapshot.val();

//     //     // for older chats:
//     //     if (chat == null) {
//     //         return;
//     //     }

//     //     var timestamp = chat.timestamp;
//     //     var requestId = chat.currRequest;

//     //     p("chatInfo was updated!");

//     //     var date = new Date(timestamp);
//     //     var time = date.toLocaleTimeString('en-US', {
//     //         hour12: true, 
//     //         hour: "numeric", 
//     //         minute: "numeric"
//     //     });

//     //     if (requestId != "") {
//     //         $('#request' + requestId).find('.requestCardUpdateBadge').text(time);
//     //     }

//     //     $('#favorite' + chatId).find('.requestCardUpdateBadge').text(time);

//     // });

//     firebase.database().ref('chatInfo/' + chatId + '/timestamp/').on('value', function(snapshot) {
//         var timestamp = snapshot.val();
//         var time = millisecondsToTimeString(timestamp);
//         $('#favorite' + chatId).find('.requestCardUpdateBadge').text(time);

//         p("favorite updated!");
//     });

//     firebase.database().ref('chatInfo/' + chatId + '/currRequest').on('child_changed', function(snapshot) {
//         updateRequestsWithMessages(snapshot);
//         p("new request timstamp!");
//     });

//     firebase.database().ref('chatInfo/' + chatId + '/currRequest').on('child_added', function(snapshot) {
//         updateRequestsWithMessages(snapshot);
//         p("request timstamp update!");
//     });
// }


// function millisecondsToTimeString(timestamp) {
//     var date = new Date(timestamp);
//     var time = date.toLocaleTimeString('en-US', {
//         hour12: true, 
//         hour: "numeric", 
//         minute: "numeric"
//     });
//     return time;
// }


// function updateRequestsWithMessages(snapshot) {
//     var timestamp = snapshot.val();
//     var requestId = snapshot.key;

//     // p(value);
//     // p(snapshot.key);

//     // // for older chats:
//     // if (chat == null) {
//     //     return;
//     // }

//     // var timestamp = chat.timestamp;
//     // var requestId = chat.currRequest;

//     p("chatInfo was updated!");

//     var time = millisecondsToTimeString(timestamp);

//     if (requestId != "") {
//         $('#request' + requestId).find('.requestCardUpdateBadge').text(time);
//     }
// }



// function closeChatInfoListener(requestId, chatId) {

//     p("chatInfo Listener closed for " + chatId);



//     // firebase.database().ref('chatInfo/' + chatId).once('value').then(function(snapshot) {
//     //     var chat = snapshot.val();

//     //     // for older chats:
//     //     if (chat == null) {
//     //         firebase.database().ref('chatInfo/' + chatId).off();
//     //         return;
//     //     }

//     //     var timestamp = chat.timestamp;
//     //     var currRequestId = chat.currRequest;

//     //     if (currRequest != requestId) {
//     //         return; // because listener doesnt have to be closed
//     //     }





//     // });
    
// }



// // When the request card is clicked
// $(document).on('click','.requestCard',function(evt){
//     console.log("card clicked");
//     //$('#quoteform').find('input').val('');

//     var requestPlusRequestId = $(this).attr("id");

//     var currBadge = $('#'+requestPlusRequestId).find('.requestCardUpdateBadge').text();

//     if (currBadge == "new") {
//         $('.left').find('#'+requestPlusRequestId).find('.requestCardUpdateBadge').text("");
//     }
    
// });


// // When 'quote' button is clicked
// //$(".opener").click(function(evt){ // works only with non-dynamically added buttons
// $(document).on('click','.opener',function(evt){

//     // Position Popup in center of page
//     //  (show and hide are used because jQuery can only get the 
//     //   height and width attributes of an element while it is not hidden)
//     $("#quoteform").show();
//     $("#quoteform").css('top', (window.innerHeight - $("#quoteform").height())/2 + 'px');
//     $("#quoteform").css('left', (window.innerWidth-$("#quoteform").width())/2 + 'px');
//     $("#quoteform").hide();

//     // Fetch user's name and request id
//     var buttonId = evt.currentTarget.id;
//     var splitButtonId = buttonId.split(splitter);
//     var name = splitButtonId[0];
//     var requestId = splitButtonId[1];

//     // Set title to match the user
//     $("#quoteform").find('#title').html("Quote to show <span style='color: #20CE87;font-size: 30px;'>" + name + "</span>");

//     // Set class of submit button to be the requestId so that the quote can be added to the request when submitted
//     $("#submitQuote").attr("class", requestId);

//     // Show to popup with a nice transition
//     $("#dimmer").show(50);
//     $("#quoteform").show(100);
//     // $("#invoiceformFields").hide(200);

//     resetHighlights();
//     highlightActiveRequest(requestId);
// });

// function initiateAndDisplayChat(chatId) {
//     // firebase.database().ref('messages/' + chatId).once('value').then(function(snapshot1) {
//     //     //firebase.database().ref('messagesTest/' + 'chatId').once('value').then(function(snapshot1) {
//     //     var chat = snapshot1.val();

//         firebase.database().ref('chatInfo/' + chatId).once('value').then(function(snapshot1andHalf) {

//             var spId = snapshot1andHalf.val().spId;
//             currSpId = spId;

//             //console.log(chat);

//             firebase.database().ref('messages/' + chatId + '/messages').on('child_added', function(snapshot2) {
//             //firebase.database().ref('messagesTest/' + 'chatId' + '/messages').on('child_added', function(snapshot2) {

//                 var message = snapshot2.val();
//                 var messageText = message.message;

//                 // Update webpanel only if message wasnt a dummy message
//                 if (messageText != undefined) {
                    
//                     var timestamp = message.timestamp;
//                     var userId = message.userId;

//                     var direction = "center";
//                     if (userId == spId) {
//                         direction = "right";
//                     } else {
//                         direction = "left";
//                     }

//                     $('.right').append('<div class="message" align="'+ direction +'" style="float:'+ direction +';">' + messageText + '</div>');

//                     // resize new message that was added
//                     resizeChat();
//                     scrollUp();
//                     resetHighlights();
//                     highlightActiveRequest("");
//                     highlightActiveFavorite("");
//                 }
//             });
//         });
//     //});
// }

// // When 'chat' button is clicked (done like this to work with dynamically added buttons as well)
// $(document).on('click','.chat',function(evt){
//     $("#businessInput").hide();
//     $("#sendBusiness").hide();
//     $("#sendMessage").show();
//     $("#chatInput").show();

//     console.log("chat button clicked");

//     // Fetch user's name and request id
//     var requestId = evt.currentTarget.id;

//     // console.log($('#'+requestId).find('.requestCardUpdateBadge').text());

//     // console.log($('.left').find('#'+requestId).find('.requestCardUpdateBadge'));


//     $('.left').find('#request'+requestId).find('.requestCardUpdateBadge').text("");


//     // Set corresponding request card's badge value to nothing
//     //$('#'+requestId).find('.requestCardUpdateBadge').text("");

//     // detach any previous listeners if nessesary
//     if (currChatId != "None") {
//         firebase.database().ref('messages/' + currChatId + '/messages').off();
//         //firebase.database().ref('messagesTest/' + 'chatId' + '/messages').off();
//     }

//     // Keep track of the current requestId
//     //$(".right").attr("id", requestId);
//     currRequestId = requestId;
//     console.log("chat assigned id of " + requestId);

//     // Clear chat screen
//     $(".right").html('');

//     firebase.database().ref('activeRequests/' + currRequestId).once('value').then(function(snapshot) {
//         var request = snapshot.val();
//         var chatId = request.chatId;
//         currChatId = chatId;

//         initiateAndDisplayChat(chatId);
        
//     });
// });

// // When 'chat' button is clicked in a favorites panel (done like this to work with dynamically added buttons as well)
// $(document).on('click','.favChat',function(evt){
//     $("#businessInput").hide();
//     $("#sendBusiness").hide();
//     $("#sendMessage").show();
//     $("#chatInput").show();

//     // Fetch chat id
//     var chatId = evt.currentTarget.id;

//     // detach any previous listeners if nessesary
//     if (currChatId != "None") {
//         firebase.database().ref('messages/' + currChatId + '/messages').off();
//         //firebase.database().ref('messagesTest/' + 'chatId' + '/messages').off();
//     }

//     // Clear chat screen
//     $(".right").html('');

//     currChatId = chatId;
//     currRequestId = "None";

//     initiateAndDisplayChat(chatId);
// });

// // When 'addBusiness' button is clicked (done like this to work with dynamically added buttons as well)
// $(document).on('click','.addBusiness',function(evt){
//     $("#sendMessage").hide();
//     $("#chatInput").hide();

//     // Clear chat screen
//     $(".right").html('');

//     $("#businessInput").show();
//     $("#sendBusiness").show();

//     // Fetch user's name and request id
//     var requestId = evt.currentTarget.id;

//     // Keep track of the current requestId
//     currRequestId = requestId;

//     highlightActiveRequest("");
// });

// // When 'cancel request' button is clicked (done like this to work with dynamically added buttons as well)
// $(document).on('click','.cancelRequest',function(evt){
    
//     // Fetch request id
//     var requestId = evt.currentTarget.id;

//     firebase.database().ref('activeRequests/' + requestId).once('value').then(function(snapshot) {
//         var request = snapshot.val();
//         var spId = request.spId;
//         var ssId = request.ssId;
//         var chatId = request.chatId;
        
//         // firebase.database().ref('inactiveRequests/' + requestId).update({
//         //     requestId : request
//         // });

//         firebase.database().ref('cancelledRequests/').child(requestId).update(request);

//         firebase.database().ref('users/' + ssId + '/appointmentsList/' + requestId).remove();
//         firebase.database().ref('users/' + spId + '/appointmentsList/' + requestId).remove(); 

//         firebase.database().ref('activeRequests/' + requestId).off();
//         firebase.database().ref('activeRequests/' + requestId).remove();

//         var updates = {};
//         updates['chatInfo/' + chatId + '/currRequest/' + requestId] = null;
//         firebase.database().ref().update(updates);
        
//     });
// });

// // When 'complete request' button is clicked (done like this to work with dynamically added buttons as well)
// $(document).on('click','.completeRequest',function(evt){

//     console.log("complete clicked");

//     // Position Popup in center of page
//     //  (show and hide are used because jQuery can only get the 
//     //   height and width attributes of an element while it is not hidden)
//     $("#quoteform").show();
//     $("#quoteform").css('top', (window.innerHeight - $("#quoteform").height())/2 + 'px');
//     $("#quoteform").css('left', (window.innerWidth-$("#quoteform").width())/2 + 'px');
//     $("#quoteform").hide();

//     // Fetch user's name and request id
//     var buttonId = evt.currentTarget.id;
//     var splitButtonId = buttonId.split(splitter);
//     var name = splitButtonId[0];
//     var requestId = splitButtonId[1];

//     // Set title to match the user
//     $("#quoteform").find('#title').html("Final description and cost for <span style='color: #20CE87;font-size: 30px;'>" + name + "</span>");

//     // Set class of submit button to be the requestId so that the quote can be added to the request when submitted
//     $("#submitQuote").attr("class", requestId);

//     // Show to popup with a nice transition
//     $("#dimmer").show(50);
//     $("#quoteform").show(100);

//     // Hide the cancel button so that they cant cancel
//     $("#cancelQuote").hide();

//     $("#quoteformFields").hide();
//     $("#invoiceformFields").show();

//     finalQuote = true;
// });



// function startListeners() {

//     firebase.database().ref('activeRequests').on('child_added', function(snapshot) {
//         var request = snapshot.val();
//         var chatId = request.chatId;
//         var requestMessage = request.requestMessage;
//         var spId = request.spId;
//         var ssId = request.ssId;
//         var zipcode = request.zipcode;
//         var quote = request.quote;

//         var quoteStatus = "status of quote uncertain";
//         if (quote == undefined) {
//             quoteStatus = "not yet sent";
//         } else if (quote.quoteVerified == undefined) {
//             quoteStatus = "old version of quoting engine used here";
//         } else if (quote.quoteVerified) {
//             quoteStatus = "quote accepted!";
//         } else {
//             quoteStatus = "quote not yet accepted by service seeker";
//         }

//         var requestId = snapshot.key;

//         console.log(request);
//         console.log(requestId);

//         //if (spID == firebase.auth().currentUser.uid) {
//             firebase.database().ref('/users/' + ssId).once('value').then(function(snapshot) {
//                 var name = snapshot.val().name;

//                 // if (spId == "Need to get from backend") {
//                 //     $('#userList').prepend( "<a><span></span><label>" + name + "</label><span>"+ zipcode +"</span><p>" + requestMessage +"</p><button class=\"addBusiness\" id=" + requestId + " >Add Business</button></a>" );
//                 // } else {
//                 //     $('#userList').prepend( "<a><span></span><label>" + name + "</label><span>"+ zipcode +"</span><p>" + requestMessage +"</p><button class=\"opener\" id=" + name + splitter + requestId + ">Quote</button><br><button class=\"chat\" id=" + requestId + " >Chat</button></a>" );
//                 // }

//                 if (spId == "Need to get from backend" || spId == "") {
//                     $('#userList').append(
//                         "<div class='requestCard' id='request" + requestId + "'>"
//                         + "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><button class='roundedButton requestCardButton addBusiness' id=" + requestId + " >Add Business</button></div><br>"



//                         + "<div class='requestCardUpdateBadge'>new</div>"



//                         + "</div>");
                
//                 } else if (chatId == "") {
//                     $('#userList').append( 

//                     "<div class='requestCard' id='request" + requestId + "'>"
//                     + "<div class='requestCardName'>"+ name +"</div>"

//                     + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                     + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                     + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"
//                     + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                     + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"


//                     + "<div class='requestCardUpdateBadge'>new</div>"
                    


//                     + "</div>");

//                 } else {

//                     // Here we know chat exists, so open listener to listen to changes in the chat
//                     openChatInfoListener(chatId);


//                     $('#userList').append( 

//                     "<div class='requestCard' id='request" + requestId + "'>"
//                     + "<div class='requestCardName'>"+ name +"</div>"

//                     + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                     + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                     + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                     + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"
//                     + "<button class='requestCardButton roundedButton chat' id=" + requestId + "> Open Chat </button>"
                    
//                     + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                     + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"



//                     + "<div class='requestCardUpdateBadge'>new</div>"


//                     + "</div>");

//                 }

//             });
//     });

//     firebase.database().ref('activeRequests').on('child_changed', function(snapshot) {
//         var request = snapshot.val();
//         var chatId = request.chatId;
//         var requestMessage = request.requestMessage;
//         var spId = request.spId;
//         var ssId = request.ssId;
//         var zipcode = request.zipcode;
//         var quote = request.quote;

//         var quoteStatus = "status of quote uncertain";
//         if (quote == undefined) {
//             quoteStatus = "not yet sent";
//         } else if (quote.quoteVerified == undefined) {
//             quoteStatus = "old version of quoting engine used here";
//         } else if (quote.quoteVerified) {
//             quoteStatus = "quote accepted!";
//         } else {
//             quoteStatus = "quote not yet accepted by service seeker";
//         }

//         var requestId = snapshot.key;

//         //if (spID == firebase.auth().currentUser.uid) {
//             firebase.database().ref('/users/' + ssId).once('value').then(function(snapshot) {
//                 var name = snapshot.val().name;

//                 if (spId == "Need to get from backend"  || spId == "") {
//                     $('#request' + requestId).html(
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><button class='roundedButton requestCardButton addBusiness' id=" + requestId + " >Add Business</button></div><br>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"


//                         );
//                 } else if (chatId == "") {
//                     $('#request' + requestId).html( 
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                         + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"

//                         + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                         + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"



//                         );
//                 } else {
//                     $('#request' + requestId).html( 
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                         + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"
//                         + "<button class='requestCardButton roundedButton chat' id=" + requestId + "> Open Chat </button>"

//                         + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                         + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"


//                         );
//                 }

//                 resetHighlights();
//                 highlightActiveRequest("");
//                 highlightActiveFavorite("");

//             });
//     });

//     firebase.database().ref('activeRequests').on('child_removed', function(snapshot) {
//         console.log("request removed");
//         console.log(snapshot);

//         var requestId = snapshot.key;
//         var request = snapshot.val();
//         var chatId = request.chatId;

//         closeChatInfoListener(requestId, chatId);

//         $('#request' + requestId).animate({
//             height:0, 
//             padding: 0
//         }, {
//             duration: 200, 
//             complete: function(){
//                 $('#request' + requestId).children().hide();
//                 $('#request' + requestId).remove();
//             }
//         });


//         // $('#request' + requestId).hide("slow", function(){$('#request' + requestId).remove();});
//     });

//     firebase.database().ref('allFavoritesList').on('child_added', function(snapshot) {
//         console.log("inside function");
//         var favoriteEntity = snapshot.val();
//         var chatId = snapshot.key;

//         openChatInfoListener(chatId);

//         firebase.database().ref('chatInfo/' + chatId).once('value').then(function(snapshot) {
//             var chat = snapshot.val();

//             var ssId;
//             var spId;

//             // if old version of chatting engine is being used
//             if (chat == null) {
//                 ssId = favoriteEntity.ssId;
//                 spId = favoriteEntity.spId;
//             } else {
//                 ssId = chat.ssId;
//                 spId = chat.spId;
//             }
            

//             //if (spId == firebase.auth().currentUser.uid) {
//             firebase.database().ref('/users/' + ssId).once('value').then(function(snapshot) {
//                 var ssname = snapshot.val().name;

                
//                 firebase.database().ref('/users/' + spId).once('value').then(function(snapshot) {
//                     var spname = snapshot.val().name;

//                         $('#favoritesList').prepend( 

//                         "<div class='requestCard' id='favorite" + chatId + "'>"
//                         + "<div class='requestCardName'>"+ ssname +"</div>"
//                         + "<div><div class='requestCardLabel'>SS ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spname + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>SP ID</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                         // + "<button class='requestCardButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"
//                         + "<div><div class='requestCardLabel'>Chat ID</div><div class='requestCardText'>" + chatId + "</div></div><br>"

//                         + "<button class='requestCardButton favChat roundedButton' id=" + chatId + "> Open Chat </button>"
//                         + "<div class='requestCardUpdateBadge'>new</div>"

//                         + "</div>");
//                 });
//             });

//         });

//     });

// /*

//     firebase.database().ref('activeRequests').on('child_changed', function(snapshot) {
//         var request = snapshot.val();
//         var chatId = request.chatId;
//         var requestMessage = request.requestMessage;
//         var spId = request.spId;
//         var ssId = request.ssId;
//         var zipcode = request.zipcode;
//         var quote = request.quote;

//         var quoteStatus = "status of quote uncertain";
//         if (quote == undefined) {
//             quoteStatus = "not yet sent";
//         } else if (quote.quoteVerified == undefined) {
//             quoteStatus = "old version of quoting engine used here";
//         } else if (quote.quoteVerified) {
//             quoteStatus = "quote accepted!";
//         } else {
//             quoteStatus = "quote not yet accepted by service seeker";
//         }

//         var requestId = snapshot.key;

//         //if (spID == firebase.auth().currentUser.uid) {
//             firebase.database().ref('/users/' + ssId).once('value').then(function(snapshot) {
//                 var name = snapshot.val().name;

//                 if (spId == "Need to get from backend"  || spId == "") {
//                     $('#request' + requestId).html(
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><button class='roundedButton requestCardButton addBusiness' id=" + requestId + " >Add Business</button></div><br>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"


//                         );
//                 } else if (chatId == "") {
//                     $('#request' + requestId).html( 
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                         + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"

//                         + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                         + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"



//                         );
//                 } else {
//                     $('#request' + requestId).html( 
//                         "<div class='requestCardName'>"+ name +"</div>"

//                         + "<div><div class='requestCardLabel'>ss ID</div><div class='requestCardText'>" + ssId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Request ID</div><div class='requestCardText'>" + requestId + "</div></div><br>"

//                         + "<div><div class='requestCardLabel'>Request</div><div class='requestCardText'>" + requestMessage + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Zipcode</div><div class='requestCardText'>" + zipcode + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Business</div><div class='requestCardText'>" + spId + "</div></div><br>"
//                         + "<div><div class='requestCardLabel'>Quote</div><div class='requestCardText'>" + quoteStatus + "</div></div><br>"
//                         + "<button class='requestCardButton roundedButton opener' id=" + name + splitter + requestId + "> Send Quote </button>"
//                         + "<button class='requestCardButton roundedButton chat' id=" + requestId + "> Open Chat </button>"

//                         + "<button class='requestCardButtonLarge roundedButton completeRequest' id=" + name + splitter + requestId + "> Service completed -- Seek payment </button>"
//                         + "<button class='requestCardButtonLarge roundedButton cancelRequest' id=" + requestId + "> Cancel request -- No payment </button>"


//                         + "<div class='requestCardUpdateBadge'>updated</div>"


//                         );
//                 }

//                 resetHighlights();
//                 highlightActiveRequest("");
//                 highlightActiveFavorite("");

//             });
//     });

//     firebase.database().ref('activeRequests').on('child_removed', function(snapshot) {
//         var requestId = snapshot.key;

//         $('#request' + requestId).animate({
//             height:0, 
//             padding: 0
//         }, {
//             duration: 200, 
//             complete: function(){
//                 $('#request' + requestId).children().hide();
//                 $('#request' + requestId).remove();
//             }
//         });


//         // $('#request' + requestId).hide("slow", function(){$('#request' + requestId).remove();});
//     });

// */

// }








// // function updateRequestTimestamp(requestId) {
    







// //     var textToSend = $("#chatInput").val();

// //     if (textToSend != "") {
// //         console.log("time to send message!");
// //         $("#chatInput").val('');

// //         //firebase.database().ref('messagesTest/' + 'chatId' + '/messages').push({

// //         console.log("This is in sendMessageInputted -- Chatid: " + currChatId + " userid: " + currSpId);

// //         firebase.database().ref('activeRequests/' + currRequestId + '/messages').push({
// //             message: textToSend,
// //             userId: currSpId,
// //             timestamp: new Date().getTime()
// //         });
// //     }
// // }

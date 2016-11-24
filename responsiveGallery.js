/* ISSUES TO FIX:
  - when webpage is resized, the expanded panel should reload
  - try to have images expand and shrink such that the page isnt scrolled at all but the image remains visible on screen
  - bug when click on expanded image again, sometimes only title and author, but not description show up


   FIXED
   - hypen of title to author is now no present in expanded version
*/

var expandedPanel = null;
var minimizedGallerySize = 300; // (in px)


//______________________________________________________________________________________________
//
//     BASIC HELPERS (print, pixel, wait)
//______________________________________________________________________________________________

// Simple function to print something to the console
function p(strg) {
    console.log(strg);
}

// Converts an integer input to a value in pixels
function px(int) {
    return int + "px";
}

// Runs for ms milliseconds
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}



//______________________________________________________________________________________________
//
//     CORE FUNCTIONALITY (add image, shrink image)
//______________________________________________________________________________________________

/* Adds an image and its details to the page
  imgURL - url to the image or gif to place
  title - (unique) title of the image
  author - author of image
  description - description or text of image
  containerClass - the class of the div to hold this image 
*/
function addImagePost(imgURL, title, author, description, containerClass) {
  var errorMessage = 'A problem occured with displaying the image';

  // create a unique id from the title of the image (might be a bad idea to depend on titles being unique)
  var id = title.replace(/\s|\W/g, '');

  // add image to container div
  $(containerClass).append(
      "<div class='imagePanel' id='" + id + "'>"
    +   "<div class='imageContainer'>"
    +     "<button class='close'> &times </button>"
    +     "<img src='" + imgURL + "' alt='" + errorMessage + "'>"
    +   "</div>"
    +   "<div class='text'>"
    +     "<div class='title'>" + title + "</div>"
    +     "<span class='divider'> - </span>"
    +     "<div class='author'>" + author + "</div>"
    +     "<div class='description'>" + description + "</div>"
    +   "</div>"
    + "</div>"
    );

  /* get reference to image, 
   make it opaque to hide flickering, and 
   only make it visible again after the image is loaded 
   and resized to prevent the images from appearing too large */
  var img = $('#' + id + ' .imageContainer img');
  img.css('opacity', 0);

  img.on('load', function(){
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

/* Shrinks the currently expanded imagePanel (if any) down to the minimizedGallerySize
  (The expaned image, if it exists, is expected to be saved in the expandedPanel global variable)
*/
function shrinkImage() {
  
  if (expandedPanel != null) { // Checks if there is even an expanded imagePanel

    // Find relevant parts of the expanded imagePanel
    var imgContainer = expandedPanel.find('.imageContainer');
    var img = expandedPanel.find('.imageContainer img');

    // Set height or width of img to scale as imgContainer is resized
    var imgHeight = img.height();
    var imgWidth = img.width();

    if (imgWidth > imgHeight) {
      img.css( "width", "auto" );
      img.css( "height", "100%" );
    } else {
      img.css( "height", "auto" );
      img.css( "width", "100%" );
    }

    // Set imageContainer size to minimizedGallerySize
    imgContainer.css( "width", px(minimizedGallerySize));
    imgContainer.css( "height", px(minimizedGallerySize));

    // Show text of image, hide imageBlurb, close button, description
    
    $('.imageBlurb').hide(100);
    unconvertBlurbStyle(expandedPanel)
    expandedPanel.find('.close').hide(1400);
    

    // Set expanded panel to null
    expandedPanel = null;
  }
}

/* Called automatically when a .close button is clicked
  Shrinks the imagePanel and scrolls appropriately, depending on the size of the panel being shrunk
*/
$(document).on('click','.close',function(evt){
  var scrollTo = expandedPanel;
  shrinkImage();
  scrollToTopOfEntity(scrollTo);
});



//______________________________________________________________________________________________
//
//     STYLING/CORE HELPERS (minimized text style, expanded text style)
//______________________________________________________________________________________________

/* Sets the textfields of the imagePanel to how they should look when the imagePanel is expanded
  entity - an imagePanel
*/
function convertBlurbStyle(entity) {
  entity.find('.title').css({'font-size': '25px',
                             'text-align': 'center',
                             'display': 'block'});
  entity.find('.author').css({'font-size': '12px',
                              'text-align': 'center',
                              'display': 'block'});
  entity.find('.author').css({'font-size': '15px'});


  entity.find('.divider').hide();
}

/* Sets the textfields of the imagePanel to how they should look when imagePanel is minimized
  entity - an imagePanel
*/
function unconvertBlurbStyle(entity) {
  $('.text').show();
  entity.find('.description').hide(1400);
  entity.find('.divider').show(); 


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




//______________________________________________________________________________________________
//
//     OTHER 
//______________________________________________________________________________________________



// What we really want to do here is instead of scrolling to the top of the image always, is check if it is above or below the viewport. If any part of the image is above the viewport, scroll up (size of expanded image - 300)
function scrollToTopOfEntity(entity) {
  

  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));
  var minimizedTotalHeight = minimizedGallerySize + marginBorderSize;


  var entityDistFromTop = entity.offset().top;
  var scrolledDistFromTop = $(window)['scrollTop']();
  var menuBottom = $('.menu').outerHeight();


  var topOfEntityRelativeToWindow = entityDistFromTop - scrolledDistFromTop - menuBottom;

  if (spaceExistsToLeftOrRight(entity)
    && topOfEntityRelativeToWindow <= - minimizedTotalHeight
    && topOfEntityRelativeToWindow >= - entity.outerHeight()) {
    // There is space to side (aka other imagePanels are there) and the entity is partially off the screen from the top, but still visible

    var heightOfVisiblePortion = topOfEntityRelativeToWindow + entity.outerHeight();

    if (heightOfVisiblePortion <= minimizedTotalHeight) {
      // We want scroll to have exactly that much amount still visible on the screen, even when minimized
      // UI motivation: We want the image to be visible after shrinking as much as it was when expanded to prevent scrolling up further than the user expected
      $('body, html').animate({scrollTop: scrolledDistFromTop + topOfEntityRelativeToWindow - heightOfVisiblePortion + minimizedTotalHeight});
    } else {
      // Otherwise, we can safely just scroll to the top pf the entity as its minimized
      // UI motivation: If more of the image is visible than the minimum size of the image, we might as well just show the entire minimized image and not scroll down more than that
      $('body, html').animate({scrollTop: scrolledDistFromTop + topOfEntityRelativeToWindow});
    }
  }

  if (!spaceExistsToLeftOrRight(entity)
    && topOfEntityRelativeToWindow <= - minimizedTotalHeight
    && topOfEntityRelativeToWindow >= - entity.outerHeight()) {
    // There is space to side (aka other imagePanels are there) and the entity is partially off the screen from the top, but still visible

    var heightOfVisiblePortion = topOfEntityRelativeToWindow + entity.outerHeight();

    if (heightOfVisiblePortion <= minimizedTotalHeight) {
      // We want scroll to have exactly that much amount still visible on the screen, even when minimized
      // UI motivation: We want the image to be visible after shrinking as much as it was when expanded to prevent scrolling up further than the user expected
      $('body, html').animate({scrollTop: scrolledDistFromTop + topOfEntityRelativeToWindow - heightOfVisiblePortion + minimizedTotalHeight});
    } else {
      // Otherwise, we can safely just scroll to the top pf the entity as its minimized
      // UI motivation: If more of the image is visible than the minimum size of the image, we might as well just show the entire minimized image and not scroll down more than that
      $('body, html').animate({scrollTop: scrolledDistFromTop + topOfEntityRelativeToWindow - 5* minimizedTotalHeight});
    }
  }

  if (spaceExistsToLeftOrRight(entity)
    && topOfEntityRelativeToWindow < - entity.outerHeight()) {
    // There is space side to side and the entity is completely off the screen from the top
    
    // We want to scroll up enough to offset the shrinking of the expanding image so that the user lefts off at close to where they started
    $('body, html').animate({scrollTop: scrolledDistFromTop - entity.outerHeight() });
  }

  if (!spaceExistsToLeftOrRight(entity)
    && topOfEntityRelativeToWindow < - entity.outerHeight()) {
    // There is no space side to side and the entity is completely off the screen from the top
    
    // We want to scroll enough to offset the shrinking of the large image, but also scroll up extra to account for the shrunk image merging with another row of images
    $('body, html').animate({scrollTop: scrolledDistFromTop - entity.outerHeight() - minimizedTotalHeight});
  }


//// This old version of code simply scrolled to the top of the entity
  // setTimeout(function() {
  //   // top position relative to the document
  //   var pos = entity.offset().top;

  //   var menuBottom = $('.menu').outerHeight();

  //   // animated top scrolling
  //   $('body, html').animate({scrollTop: pos - menuBottom});

  // }, 1000);
}


function spaceExistsToLeftOrRight(entity) {
  var screenWidth = $(window).width();
  var imagePanelWidth = entity.width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var totalWidthOfNonImagePanelArea = screenWidth - imagePanelWidth;

  // p("screenWidth: " + screenWidth);
  // p("imagePanelWidth: " + imagePanelWidth);
  // p("marginBorderSize: " + marginBorderSize);
  // p("totalWidthOfNonImagePanelArea: " + totalWidthOfNonImagePanelArea);
  // p("collapsedPanelSize: " + (minimizedGallerySize + marginBorderSize));

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


/* Resizes the img of a imagePanel (if it is not expanded) to the specified percentage
  imagePanel - the class, id, or identity of the desired imagePanel
  percent - a string percent value to resize the img to
*/
function resizeImageOnHover(imagePanel, percent) {
  if (!$(imagePanel).is(expandedPanel)){
    var img = $(imagePanel).find('.imageContainer img');

    var imgHeight = img.height();
    var imgWidth = img.width();

    if (imgWidth > imgHeight) {
      img.css( "width", "auto" );
      img.css( "height", percent );
    } else {
      img.css( "height", "auto" );
      img.css( "width", percent );
    }
  }
}



$(document).ready(function() {

  var desc = "This is a really cool description for a cool art piece! Crocodiles are yummy and aligators are a little scary O:) I don't really know what I'm saying but am just trying to say some giberish. Because afterall, I have to fill this space with something!";

  addImagePost('images/spider.jpg', 'Spiderman', 'Peter Parker', desc, '#visual');
  addImagePost('images/guard.JPG', 'Guardian', 'Peter Quill', desc, '#visual');

  addImagePost('images/guard.JPG', 'Guardian2', 'Peter Quill', desc, '#visual');

  addImagePost('images/planets.png', 'Planets', 'Galactus', desc, '#visual');
  addImagePost('images/tahu.JPG', 'Tahu', 'Mata Nui', desc, '#visual');
  addImagePost('images/newt.png', 'Newt', 'Frog', desc, '#visual');

  addImagePost('images/night.jpg', 'Nighttime Monster', 'Godzilla', desc, '#visual');   
  addImagePost('images/pixar-incredibles-lou-romano-colour-script.jpg', 'This is a really really cool colorscript from the movie the Incredibles', 'Brad Bird', desc, '#visual');
  addImagePost('images/training_0014_by_sergioxdva-dadcne0.jpg', 'Doesnt this look exactly like a statue?!', 'I am a cool artist', desc, '#visual');
   
  addImagePost('images/rabbit.jpg', 'Rambling Magician of Westerly', 'Bunnicula', desc, '#visual');     
  addImagePost('images/feathers.jpg', 'A Feathered Beast', 'Trex', desc, '#visual');     
  addImagePost('images/good.jpg', 'A Good Dinosaur', 'Pixar is the best', desc, '#visual');

  
  

  $(".imagePanel").hover(
    function(){ 
      resizeImageOnHover(this, "105%")},
    function(){
      resizeImageOnHover(this, "100%")});




  $(".imagePanel").click(function(e){

    // If it was close button that was clicked, return
    if ($(e.target).hasClass("close")) {
      return;
    }


    // resizing to 100% (experimental)
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

    // if ($(this) == expandedPanel) {
    //   return;
    // }

    // shrink the previously expandedPanel
    shrinkImage();

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


// COMMENTED TO MAKE CODE DEV EASIERRRRR
// PLEASE UNCOMMET SOOONN:
    
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


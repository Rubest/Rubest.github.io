/* ISSUES TO FIX:
 
  - try to have images expand and shrink such that the page isnt scrolled at all but the image remains visible on screen
  - bug when click on expanded image again, sometimes only title and author, but not description show up
  - Have gifs play only on mouseover: 
      https://github.com/ctrl-freaks/freezeframe.js/
      http://stackoverflow.com/questions/5818003/stop-a-gif-animation-onload-on-mouseover-start-the-activation
  - Animations:
      http://valhead.com/2013/03/11/animation-play-state/
  - Videos to gifs:
      ezgif.com
  – 'scroll for more' tag in long descriptions
  _ when hover, have not just image expand, but the image container and padding decrease for a more dynamic feel
  - havent considered devices in landscape



   FIXED
   - hypen of title to author is now no present in expanded version
    - when webpage is resized, the expanded panel should reload
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
    +     "<span class='divider'> | </span>"
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
  entity.find('.title').css({'font-size': '20px',
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


// A timer value to make sure that the refresh screen function isnt called
// repeatedly while the screen is actively being resized
var globalResizeTimer = null;

$(window).resize(function() {
    if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(function() {
        // NOTE: CODE BELOW IS DIRECTLY COPIED AND MODIFIED FROM BELOW -- MAKE A PROPER HELPER FUNCTION THAT EXPANDS PANELS INSTEAD THAT BOTH OF THOSE CAN CALL
        

        if (expandedPanel == null) { return;}


        currPanel = expandedPanel;

        shrinkImage();

        expandedPanel = currPanel;
        expandedPanel.find('.text').hide();

        var imgHeight = expandedPanel.find('.imageContainer img').height();
        var imgWidth = expandedPanel.find('.imageContainer img').width();

        var marginBorders = 2 * parseInt(expandedPanel.css("marginRight").replace('px', ''));

        var maxHeight = $(window).height() - $('.menu').outerHeight() - marginBorders;
        var maxWidth = $(window).width() - marginBorders;
        var newWidth = maxHeight * imgWidth / imgHeight;
        var newHeight = maxWidth * imgHeight / imgWidth;

        if (newWidth < maxWidth) {
          expandedPanel.find('.imageContainer').css( "height", px(maxHeight));
          expandedPanel.find('.imageContainer').css( "width", px(newWidth));

        } else {
          expandedPanel.find('.imageContainer').css( "height", px(newHeight));
          expandedPanel.find('.imageContainer').css( "width", px(maxWidth));
        }

        expandedPanel.find('.close').show(1400);

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

          //scrollTo(expandedPanel, 0);

        }, 1400);


    }, 200);
});





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

  // var desc = "This is a really cool description for a cool art piece! Crocodiles are yummy and aligators are a little scary O:) I don't really know what I'm saying but am just trying to say some giberish. Because afterall, I have to fill this space with something!";


  var why = "<br><span style='font-weight: 900;'>Why:</span> ";
  var how = "<br><br><span style='font-weight: 900;'>How:</span> ";
  var next = "<br><br><span style='font-weight: 900;'>Whats Next:</span> ";
  
  var respGal = 
  why
  + "to design a museum-inspired digital gallery experience that allows multiple images to coexist with latent textual descriptions – that are able to appear without isolating or encroaching on the images"
  + how
  + "created a structure of CSS div classes and 800 lines of Javascript functions to add and regulate the interactions between panels of images and their respective descriptions. These used many systems of checks and calculations to have images expand to as large as possible without going off the screen, to determine the method and type of scrolling behavior after the completion of an action, and to figure out the most intuitive and undisruptive location to place the description of an enlarged image."
  + next
  + "I hope to work out some more subtle kinks and spin it off into a public GitHub package so other people can use it as well!"
  + "<br><br><span style='font-weight: 900;'>I’ve used it in the gallery that you are currently viewing!</span>";

  var micro =  
  why
  + "to create a more simplified and intuitive microwave experience."
  + how
  + "worked with a team to (1) Research the current use-cases of microwaves amongst various groups of users (2) Conceptualize a touchscreen interface with simplified options and a unique time-keeping system (3) Design various paper prototypes and mockups (4) Conduct user testing and feedback sessions to create further iterations (5) Present a 2 min pitch for public feedback and criticism."
  + "<br><br><a href='https://www.youtube.com/watch?v=6DrnK7Flaxc'><span style='font-weight: 900;'>See a 2 minute demo video!</span></a>";

  var airp = 
  why
  + "to provide a simple way for Brown students traveling to and from the Providence airport to find other Brown students to split the cost of an Uber or Lyft with."
  + how
  + "worked with a team to flesh out the idea, with an emphasis on making the process as simple and intuitive as possible for a user, while also taking care to not make assumptions that would restrict the webapp to only certain kinds of students. Over the next month, we created a sqlite database of users and their requests and a Java backend to match students and to connect to the Twillio API (to text users updates), flight API (to check flight information to allow scheduling of matching requests and account for delays), and email API (to verify emails for the creation of accounts). Lastly, I created the frontend with HTML/CSS/Javascript of the entire project, again with an emphasis on clarity and conciseness (in terms of words and time)."
  + next
  + "we are in the process of finding a suitable server hosting service to host the backend, and aim to release the webapp soon for Brown students to use!";

  var virgw = 
  why
  + "to create a central web-accessible portal for Virgo App Inc. employees to see and update customer requests and their status’ in real time, and chat with customers directly."
  + how
  + "after settling the structure and contents of the data that would be stored with another developer, I worked in Javascript (as well as a little HTML and CSS) to (1) establish a connection to the data stored in the Firebase ‘realtime database’, (2) implement a secure login system, (3) create a scrolling panel of cards, one per customer request, that would be each assigned a unique ID and updated with every change, (4) a system of buttons and popups that would an employee to update pricing and logistical information specific to a request, and (5) a chat system that would sync through Firebase to allow an employee to chat directly with a customer. I was given a lot of control over the user’s interaction with the webpanel and so developed a system of descriptions, ‘new’ and ‘updated’ card badges, and ‘material design’ inspired shadowed panels and animations to make as clear as possible to employees the relations and connections between components."
  + next
  + "some of the general patterns developed here like creating a field of separate request cards with the same structure and rules have continued to be used in later work (like responsiveWebGallery in this case)";

  var virga =
  why
  + "to allow consumers  to request household services of any type (like laundry, walking a dog, etc) from trusted small businesses in their vicinity through a mobile app."
  + how
  + "worked with another developer to create a 40-screen app from a combination of Swift and the Xcode visual editor. Unlike my other project at Virgo, this had a (fairly) detailed Illustrator mockup set before we started work that served as a guiding hand. Throughout the process of implementing every aspect of the app, from login to messaging, we strived to follow the design templates as closely as possible, while also changing some aspects (after approval) for the sake of a better user experience.";

  var water =
  why
  + "to design a resonant visual representation of the global water crisis for the organization B for Water."
  + how
  + "depicted the world’s population as a series of water droplets which grew progressively ‘muddier’ with decrease in access to clean water. The stark contrast between the muddy-brown droplets with the clean-white droplets tries to really impress the idea of just how many people around the world don’t have enough or any clean water."
  + "<br><br><a href='http://www.bforwater.org/about/#aboutus'><span style='font-weight: 900;'>Check out the infographic here!</span></a>";

  var dent =
  why
  + "to bridge the literal and figurative space between poetry and graphics"
  + how
  + "worked with a writer to create a graphic poem where the traditional boundaries between text and illustration are blurred. The graphics of the piece encompass the words to reflect and represent the overarching themes of the poem."
  + "<br><br><span style='font-weight: 900;'>Exhibited at the Granoff Center for Creative Arts in October 2016</span>";



  addImagePost('images/responsiveGalleryGif.gif', 'responsiveWebGallery', 'the lightbox redesigned', respGal, '#visual');
  addImagePost('images/microwaveRedesign.png', 'Touchscreen Interface Design', 'the microwave reimagined', micro, '#visual');
  addImagePost('images/airpoolerGif.gif', 'Airpooler', 'a ride-sharing webapp for student travelers', airp, '#visual');
  addImagePost('images/virgoWebappMain.png', 'Operations Webpanel', 'for coordinating Virgo Inc business', virgw, '#visual');
  addImagePost('images/AppMain.gif', 'Virgo iOS App', 'connecting consumers to small businesses', virga, '#visual');
  addImagePost('images/dental.jpeg', 'Illustrative Graphic Design', 'when poetry and design collide', dent, '#visual');
  addImagePost('images/BforWaterInfog.png', 'Water Consumption Infographic', 'representing a global crisis', water, '#visual');


  

  // addImagePost('images/spider.jpg', 'Spiderman', 'Peter Parker', desc, '#visual');
  // addImagePost('images/guard.JPG', 'Guardian', 'Peter Quill', desc, '#visual');

  // addImagePost('images/guard.JPG', 'Guardian2', 'Peter Quill', desc, '#visual');

  // addImagePost('images/planets.png', 'Planets', 'Galactus', desc, '#visual');
  // addImagePost('images/tahu.JPG', 'Tahu', 'Mata Nui', desc, '#visual');
  // addImagePost('images/newt.png', 'Newt', 'Frog', desc, '#visual');

  // addImagePost('images/night.jpg', 'Nighttime Monster', 'Godzilla', desc, '#visual');   
  // addImagePost('images/pixar-incredibles-lou-romano-colour-script.jpg', 'This is a really really cool colorscript from the movie the Incredibles', 'Brad Bird', desc, '#visual');
  // addImagePost('images/training_0014_by_sergioxdva-dadcne0.jpg', 'Doesnt this look exactly like a statue?!', 'I am a cool artist', desc, '#visual');
   
  // addImagePost('images/rabbit.jpg', 'Rambling Magician of Westerly', 'Bunnicula', desc, '#visual');     
  // addImagePost('images/feathers.jpg', 'A Feathered Beast', 'Trex', desc, '#visual');     
  // addImagePost('images/good.jpg', 'A Good Dinosaur', 'Pixar is the best', desc, '#visual');

  
  

  $(".imagePanel").hover(
    function(){ 
      resizeImageOnHover(this, "110%");


      // var imgContainer = $(this).find('.imageContainer');

      // // Set imageContainer size to minimizedGallerySize
      // imgContainer.css( "width", px(minimizedGallerySize * 1.03));
      // imgContainer.css( "height", px(minimizedGallerySize * 1.03));

      // //$(this).css("margin", px(10- ((minimizedGallerySize * 1.05 - minimizedGallerySize)/2)));


      // $(this).animate({ 'margin': px(10-((minimizedGallerySize * 1.03 - minimizedGallerySize)/2))}, 1000);


    },
    function(){
      resizeImageOnHover(this, "100%");

      // var imgContainer = $(this).find('.imageContainer');

      // // Set imageContainer size to minimizedGallerySize
      // imgContainer.css( "width", px(minimizedGallerySize));
      // imgContainer.css( "height", px(minimizedGallerySize));

      // // $(this).css("margin", px(10));
      // $(this).animate({ 'margin': px(10)}, 500);


    });




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


    var arbitrarySizeBoundry = Infinity;//minimizedGallerySize * 2


    // //expandedPanel.find('.description').show();
    // var maxHeight = $(window).height() - $('.menu').outerHeight() - marginBorders; //- $(this).find('.text').outerHeight();
    // //expandedPanel.find('.description').hide();
    // var maxWidth = $(window).width() - marginBorders;


    // Setting max size to min of the max possible size of screen and arbitrarySizeBoundry (to prevent it from always filling the screen)
    var maxHeight = Math.min(arbitrarySizeBoundry, $(window).height() - $('.menu').outerHeight() - marginBorders);
    var maxWidth = Math.min(arbitrarySizeBoundry, $(window).width() - marginBorders);


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

      if( $(window).width() >= 412 && $(window).height() >= 737 ) { // is not mobile
        var scrollTo = expandedPanel;
        shrinkImage();
        scrollToTopOfEntity(scrollTo);
      }
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
      $('body, html').animate({scrollTop: pos - menuBottom/2});

    });
});


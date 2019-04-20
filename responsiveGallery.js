




/* ISSUES TO FIX:
 
  - eliminate any font issues by vectorizing any fonts
  - In cases where there is a single imagePanel per row, but then after a panel is expanded, there are two per row, the automatic scrolling scrolls too far down. 

  - Refine/Create descriptions
  - reduce quality of shrunken images even more to lower page load times and latency
  - disable ability to right-click on a shrunken imagePanel (https://swisnl.github.io/jQuery-contextMenu/demo/disabled-menu.html#example-code)
  - Mobile friendly
  - tags and filtering
  - zooming/multiple images/gifs
  - Corrent automated scrolling in cases where the margin change effects stuff
  - Paralax scrolling
  - consider eliminating header entirely or making it disappear
  - mobile scrolling
  - mobile expanding of images
  - mobile context menu

  - Update older imagepanel Descriptions
  - figure out something for while the higher resolution image is loading



  - try to have images expand and shrink such that the page isnt scrolled at all but the image remains visible on screen
  - bug when click on expanded image again, sometimes only title and author, but not description show up
  - Have gifs play only on mouseover: 
      https://github.com/ctrl-freaks/freezeframe.js/
      http://stackoverflow.com/questions/5818003/stop-a-gif-animation-onload-on-mouseover-start-the-activation
      https://github.com/krasimir/gifffer
  - Animations:
      http://valhead.com/2013/03/11/animation-play-state/
  - Videos to gifs:
      ezgif.com
  – 'scroll for more' tag in long descriptions
  _ when hover, have not just image expand, but the image container and padding decrease for a more dynamic feel
  - havent considered devices in landscape
  - have images animate only when hovering
  - line break bullet points in descriptions
  - before image is finished loading, load a colorful background! (rather than the currently white square) (gooogle images does this)


  
  - Change color of close button to be more obvious
  - Possibly move close button to the now-colored text area, to the top right corner, where it might make more sense anyway



   FIXED
    - hypen of title to author is now no present in expanded version
    - when webpage is resized, the expanded panel should reload
    Dec 29, 2016
    - changed width of the floating image blurb to properly take up all the availiable space allocated for it.


    - Huge improvements to scrolling after an element has been minimized, depending on specific cases
  
    Mar 20, 2017
    - cover image is now static and doesnt scroll even if the page does! This doesnt change much but seems to make things a little more dynamic
    - Images now do not fill the full screen, and instead expand to up to two times the size of the minimized elements
    - detection of the space around an element is better, more accurately checking the spacing below and to the side
    - Now there is an option for providing different images for the minimized state and the maximized state, to allow arrangments like: static image when minimized starts moving once you click on it, or low res image becomes higher res when you click on it -- the intent is to provide a way to allow smaller file sizes (so that the whole page isnt slow) and to make it so that certain elements arent distracting
    - added the pysadelic poster and trex
    - made it so that the minimzed image of the microwave is centered so that it looks nice when minimized, and this is switched out with the proper one (which has the buttons slightly offcenter) once maximized. This causes a slight jerk, but it seems small enough that its worth it?
    
    July 18, 2017
    - Used this awesome website: http://easings.net/
      to add easing to the transitions of both the image panels (expanding, etc) and images (expanding on hover, etc) for a much more natural look!
    - added left and right padding to #visual div so that image panels never touch the sides of the browser and theres 
      always whitespace between the edge of the browser window and the panels
    - 


    August 22, 2017
    - Prevented imagePanels from expanding again if they were already expanded and then clicked (was especially annoying on mobile because 
      attempting to just scroll would make the currently expanded image and text shrink and expand again!)
    - Introduced some global const values
    - Now description is set and page is scroll both when a panel is clicked, and after it has finished expanding.
      This means that the description appears much quicker and usually the earlier scroll is enough, meaning that things seems a lot faster and less laggy.
      The downside though is that sometimes the early scroll overcompensates when another panel is being shrunk simultaneously, which is unideal
    - Set description to be hidden immediately upon closing (rather than over some ms), which allows a much faster and cleaner shrinking of image panels

    September 6, 2017
    - Updated the Psychedelic poster from the straight edges to the jagged edges, removed the alternate final version, and replaced it with the timeline of all the iterations of the poster.
    - Added the initial sketch for dental

    September 22, 2017
    - Updated the Virgo iOS app image and gif to be much higher quality and nice

    November 13, 2017
    - Updated the Virgo Webpanel image and gif to be much better — now there is an actual gif, and there's no weird debugging text in the images shown anymore! (took many hours to get it proper)
    - Created new panel for the BMSA brochure! Tested maybe 15-20 possible arrangements before settling in with the current displays! Also wrote a blurb based on earlier drafting and added pictures of the brochure in real life and the old brochure!

    Jan 18, 2019
    - Fixed bug with margin-left being still applied after panel was shrunk
    - Restyled expanded text significantly to have more visual hierarchy and to more clearly be visually connected to the art piece
    - Switched to using CSS for some previously manually set values for cleaner code
    - Deleting imageBlurb code and functionality
    - Pointer cursor is shown now when hovering on reduced imagePanel (to show that image is clickable)
    - Scrolling is now disabled when expanding or reducing images to reduce potential for disorientation
    - cleaned up logic around background-colors of ImagePanel components to use css better
    - Upon initial page-load, there are now colorful squares on the screen that are filled by the images as they load (rather than the empty space they were before)
    - Fixed the problem of the unexplained right-side whitespace on mobile. (was text overflow of the intro, so set overflow to hidden for now)
    - Set #visual padding so that it is not used on mobile, should mean that there are no wierd size issues
    - Added a few more important entries
    - Removed fixed position of menu-bar and set image-panels to scroll to the real top of the screen (rather than being offset by menu-bar height). Also though left the menu-bar height buffer in the calculation of the image height

    March 24, 2019
    - Added Link
    - Added "Reaching" 3D hand painting
    - Updated B for Water infographic with font-safe version
    - Changed colors of YGA app and B for Water infographic to let text be more readable
    - Reordered some elements

    March 27, 2019
    - Updated the chaplain picture in the bmsa brochure -- I should've updated the image a long time ago
    - Took the opportunity to rearrange the bmsa brochure presentation layout to be more straightforward and clear (hopefully)
    - Introduced a subsystem for customizability in terms of how the expanded versions of images are resized.
    - Set the BMSA Brochure to expand to the max width always, even if the height is larger than can fit entirely in the viewport. This is because reading the brochure is more impt than seeing all the parts at the same time.
    - Updated some language in the Link Minifigure and the Reaching Hand entries
    - Commented out printing to the console -- should speed things up a little and not show up to random people looking at the website.

    April 20, 2019
    - Added logic for portfolio pieces with really long descriptions. Before, there was the image and a narrow column of text. The problem though was that when descriptions were long, the text would expand way way past below the image, and be hard to read. Thus added logic for those specfic cases for the description to be split up into two pieces whose width would be controlled more dynamically.
    - With this update to Chrome, https://www.chromestatus.com/feature/6662647093133312, restructured scroll handlers to be explicitly marked as non-passive to allow preventDefault() to work still.
    - Update of some variables




*/

var expandedPanel = null;
const REDUCED_IMAGE_SIZE = 300; // (in px)
const maximumExpandedHeight = REDUCED_IMAGE_SIZE * 3;
const maximumExpandedWidth = REDUCED_IMAGE_SIZE * 2;
const closeTime = 1400;
const openTime = 1400;
const delayTime = 1400;


const REDUCED_MARGIN_SIZE = 10; // (in px)
const APPROX_REDUCED_TEXT_HEIGHT = 2 * REDUCED_MARGIN_SIZE // (in px); Approx because this already not exact and there can be 1 line of text or it can be wrapped to multiple lines
const EXPANDED_MARGIN_TOP_SIZE = 40; // (in px)
const ARBITRARY_SLIGHT_EXTRA_SCROLL = 40;

const REDUCED_CLASS = 'reduced';
const EXPANDED_CLASS = 'expanded';

const PRIORITIZE_WIDTH = "11111";
const EXTRATEXT = "22222";

var passiveSupported = false;


//______________________________________________________________________________________________
//
//     BASIC HELPERS (print, pixel, wait)
//______________________________________________________________________________________________

// Simple function to print something to the console
function p(strg) {
    // console.log(strg);
}

// Simple function to print a warning to the console
function w(strg) {
    console.warn(strg);
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

function isExpanded(entity) {
  return entity.hasClass(EXPANDED_CLASS);
}


//______________________________________________________________________________________________
//
//     CORE FUNCTIONALITY (add image, shrink image)
//______________________________________________________________________________________________

/* Adds an image and its details to the page
  staticImgURL - a still/static url to the image or gif to place
  dynamicImgURL - a moving/dynamic url to the image or gif (if none, simply repeat the staticImgURL)
  title - (unique) title of the image
  author - author of image
  description - description or text of image
  containerClass - the class of the div to hold this image 
  backgroundColor - of panel when expanded
*/
function addImagePost(staticImgURL, dynamicImgURL, title, author, description, containerClass, backgroundColor, instructionsWhenResizing, test) {
  var errorMessage = 'A problem occured with displaying the image';

  if (dynamicImgURL == null) {
    dynamicImgURL = staticImgURL;
  }

  resizeInstructions = "";
  expandedTextClass = "";
  restOfLongDescription = "";
  if (instructionsWhenResizing == null) {
    resizeInstructions = "";
  } else if (instructionsWhenResizing == PRIORITIZE_WIDTH) {
    resizeInstructions = "<div class='resizeInstructions'>" + PRIORITIZE_WIDTH + "</div>";
  }
  if (test != '' && test != null) {
    expandedTextClass = "partOfLongDescription";

    restOfLongDescription=
        "<div class='text extratext'>"
    +     "<div class='description'>" + test + "</div>"
    +   "</div>";

  }

  // create a unique id from the title of the image (might be a bad idea to depend on titles being unique)
  var id = title.replace(/\s|\W/g, '');

  // add image to container div
  $(containerClass).append(
      // "<div class='imagePanel reduced' id='" + id + "'>"

      "<div class='imagePanel reduced' id='" + id + "' style='background-color:" + backgroundColor + "'>"      
    +   "<button class='close'> &times </button>"
    +   "<div class='imageContainer'>"

// //Experimental
//     +   "<div class='imageContainer' style='outline-color:" + backgroundColor + "'>"


    +     "<img src='" + staticImgURL + "' alt='" + errorMessage + "'>"
    +   "</div>"
    +   "<div class='text " + expandedTextClass + "'>"
    +     "<div class='title'>" + title + "</div>"
    +     "<span class='divider'> | </span>"
    +     "<div class='author'>" + author + "</div>"
    +     "<div class='description'>" + description + "</div>"
    +   "</div>"
    +   restOfLongDescription
    +   "<div class='hiddenInfo'>"
    +     "<div class='staticImg'>" + staticImgURL + "</div>"
    +     "<div class='dynamicImg'>" + dynamicImgURL + "</div>"
    +     "<div class='backgroundColor'>" + backgroundColor + "</div>"
    +     resizeInstructions
    +   "</div>"
    + "</div>"
    );

  // + "' style='background-color:" + backgroundColor + ";'>"

  /*
   get reference to image, 
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

    img.css('opacity', '');
  });
};


/* 
  Shrinks imagePanelToShrink (if it was expanded) down to the REDUCED_IMAGE_SIZE
  (The expanded image, if it exists, is expected to be saved in the expandedPanel global variable)
*/
function shrinkImage(imagePanelToShrink) {

  // Check if imagePanelToShrink is expanded
  if (imagePanelToShrink != null && isExpanded(imagePanelToShrink)) {

    imagePanelToShrink.addClass(REDUCED_CLASS);
    imagePanelToShrink.removeClass(EXPANDED_CLASS);

    // Find relevant parts of the expanded imagePanelToShrink
    var imgContainer = imagePanelToShrink.find('.imageContainer');
    var img = imagePanelToShrink.find('.imageContainer img');

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

    // Set imageContainer size to REDUCED_IMAGE_SIZE
    imgContainer.css( "width", px(REDUCED_IMAGE_SIZE));
    imgContainer.css( "height", px(REDUCED_IMAGE_SIZE));

    // Show text of image, close button, description
    unconvertBlurbStyle(imagePanelToShrink)
    imagePanelToShrink.find('.close').hide(closeTime);
    
    setGifToStatic(imagePanelToShrink);

    // Set expanded panel to null
    expandedPanel = null;
  }
}


function hasPrioritizationOfWidth(imagePanel) {
  const instructions = imagePanel.find('.resizeInstructions').html();

  // w("imagePanel hasPrioritizationOfWidth: " + (instructions != undefined && instructions == PRIORITIZE_WIDTH));
  // w("imagePanel resizeInstructions are: " + instructions);

  return (instructions != undefined && instructions == PRIORITIZE_WIDTH);

}



function expandImage(imagePanelToExpand) {
    p('inside expandImage');

    expandedPanel = imagePanelToExpand;
    imagePanelToExpand.addClass(EXPANDED_CLASS);
    imagePanelToExpand.removeClass(REDUCED_CLASS);

    imagePanelToExpand.find('.text').hide();

    var imgHeight = imagePanelToExpand.find('.imageContainer img').height();
    var imgWidth = imagePanelToExpand.find('.imageContainer img').width();

    var marginBorders = 2 * parseInt(imagePanelToExpand.css("marginRight").replace('px', ''));

    // Setting max size to min of the max possible size of screen and maximumExpandedSize (to prevent it from always filling the screen)
    var maxHeight = Math.min(maximumExpandedHeight, $(window).height() - $('.menu').outerHeight() - marginBorders);
    var maxWidth = Math.min(maximumExpandedWidth, $(window).width() - marginBorders);

    var newWidth = maxHeight * imgWidth / imgHeight;
    var newHeight = maxWidth * imgHeight / imgWidth;

    if (newWidth < maxWidth && !hasPrioritizationOfWidth(imagePanelToExpand)) {
      imagePanelToExpand.find('.imageContainer').css( "height", px(maxHeight));
      imagePanelToExpand.find('.imageContainer').css( "width", px(newWidth));
    } else {
      imagePanelToExpand.find('.imageContainer').css( "height", px(newHeight));
      imagePanelToExpand.find('.imageContainer').css( "width", px(maxWidth));
    }

    // Set the image to be dynamic
    setGifToDynamic(imagePanelToExpand);

    
    imagePanelToExpand.find('.close').show(openTime);
    // w(imagePanelToExpand.find('.close'));



    const totalOpenTime = 700;
    const constDelay = 100;
    // const iterations = 10;
    // const timeStep = totalOpenTime / iterations;


    const enableScrollWrapperFunction = disableScrollWrapper(2);

    for (var x = 0; x < 3; x++) {
      window.setTimeout(function() {
        
        if (isThereSpaceOnTheLeft(imagePanelToExpand) || isThereSpaceOnTheRight(imagePanelToExpand)) {
          setDescriptionToRight(imagePanelToExpand);
          enableScrollWrapperFunction();
        } else {
          setTimeout(function() {
            setDescriptionToBottom(imagePanelToExpand);
            enableScrollWrapperFunction();
          }, delayTime);
        }

        // setDescriptionToRight(imagePanelToExpand);

//CRAXYTEZST
        scrollTo(imagePanelToExpand, 0);
      }, (totalOpenTime * x) + constDelay);
    }
    
}




function scrollTo(entity, timeout) {
  setTimeout(function() {
      // prevent standard hash navigation (avoid blinking in IE)
      // e.preventDefault();

      // top position relative to the document
      var pos = entity.offset().top;

      var menuHeight = 0;//$('.menu').outerHeight();

      // animated top scrolling
      $('body, html').animate({scrollTop: pos - menuHeight});
    }, timeout);
}



/*
  Animated scrolling when a menubar item is clicked
*/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 300, 'easeOutCirc');
        return false;
      }
    }
  });
});



/* Resizes the img of a imagePanel (if it is not expanded) to the specified percentage
  imagePanel - the class, id, or identity of the desired imagePanel
  percent - a string percent value to resize the img to
*/
function hoverAction(imagePanel, resizePercent) {
  if (!$(imagePanel).is(expandedPanel)){
    var img = $(imagePanel).find('.imageContainer img');

    var imgHeight = img.height();
    var imgWidth = img.width();

    if (imgWidth > imgHeight) {
      img.css( "width", "auto" );
      img.css( "height", resizePercent );
    } else {
      img.css( "height", "auto" );
      img.css( "width", resizePercent );
    }
  }
}





function setDescriptionToBottom(entity) {
  p('inside setDescriptionToBottom');

  if (isExpanded(entity)) {
    convertBlurbStyle(entity);
    entity.find('.text .description').show();
    entity.find('.text').show('blind', 1000);
  }
}


function setDescriptionToRight(entity) {

  if (isExpanded(entity)) {
    entity.find('.text .description').show();
    entity.find('.imageContainer').css({'display': 'inline-block',
                                        'vertical-align': 'top'});
    entity.find('.text').css({'display': 'inline-block',
                              'margin-left': '20px'});
    convertBlurbStyle(entity);
  }
}



//______________________________________________________________________________________________
//
//     STYLING/CORE HELPERS (minimized text style, expanded text style)
//______________________________________________________________________________________________

/* Sets the textfields of the imagePanel to how they should look when the imagePanel is expanded
  entity - an imagePanel
*/
function convertBlurbStyle(entity) {
  p('inside convertBlurbStyle')

  // entity.css({'background-color': entity.find('.backgroundColor').html()});
    //should no longer be needed entity.find('.text').css({'background-color': entity.find('.backgroundColor').html()});

// CRAZY TEST
  // $(document.body).css({'background-color': entity.find('.backgroundColor').html()});
  // entity.css({'width': '100%'});
  //should no longer be needed entity.css({'background-color': entity.find('.backgroundColor').html()});
  entity.css({'width': '100%'});
  
  $('#visual').addClass(EXPANDED_CLASS);
  $('#visual').removeClass(REDUCED_CLASS);


  // $('#visual').css({'padding-left': '0px', 'padding-right': '0px'});

  // entity.addClass(EXPANDED_CLASS);
  // entity.removeClass(REDUCED_CLASS);  
}

/* Sets the textfields of the imagePanel to how they should look when imagePanel is minimized
  entity - an imagePanel
*/
function unconvertBlurbStyle(entity) {
  p('inside unconvertBlurbStyle')


  entity.find('.description').hide(0); //TODO: CSS should cover this, but its not somehow?
  entity.find('.imageContainer').css({'display': ''});

  // entity.css({'background-color': 'white'});
  // should no longer be needed entity.find('.text').css({'background-color': 'white'});


  //Undoing 'setdescription to right'
  entity.find('.text').css({'margin-left': '0px'});

  // entity.removeClass(EXPANDED_CLASS);
  // entity.addClass(REDUCED_CLASS);

// CRAZY TEST
  $(document.body).css({'background-color': 'white'});
  entity.css({'width': '300px'});
  // $('#visual').css({'padding-left': '100px', 'padding-right': '100px'});
  $('#visual').removeClass(EXPANDED_CLASS);
  $('#visual').addClass(REDUCED_CLASS);


}


function setGifToStatic(entity) {
  // Find the link to the static version of the image
  staticImg = entity.find('.staticImg').html();

  // Find and change the image currently on display
  img = entity.find('.imageContainer img');
  img.attr("src", staticImg);
}


function setGifToDynamic(entity) {
  // Find the link to the static version of the image
  dynamicImg = entity.find('.dynamicImg').html();

  // Find and change the image currently on display
  img = entity.find('.imageContainer img');
  img.attr("src", dynamicImg);
}










//______________________________________________________________________________________________
//
//     OTHER 
//______________________________________________________________________________________________


function imagePanelCountPerRow() {
  const imagePanelWidth = REDUCED_IMAGE_SIZE + (2 * REDUCED_MARGIN_SIZE);
  const imageContainerWidth = $('#visual').width();//$(window).width();

  return Math.floor(imageContainerWidth/imagePanelWidth)
}

function isFirstInRow(imagePanel) {
  const imagePanelCountBeforeThis = imagePanel.prevAll('.imagePanel').size();
  return 0 == (imagePanelCountBeforeThis % imagePanelCountPerRow());
}


// What we really want to do here is instead of scrolling to the top of the image always, is check if it is above or below the viewport. If any part of the image is above the viewport, scroll up (size of expanded image - 300)
function pageScrollAfterShrinking(entity) {

  /* Havent yet closely considered/verified the following cases:
  - Mobile screen
  - When the margin-reducing of #visible causes more blocks to fit per row

  */

  const enableScrollWrapperFunction = disableScrollWrapper(0);

  
  // const currentDistanceOfEntityTopFromTop = entity.offset().top;
  // const currentScrolledDistanceFromTop = $(window)['scrollTop']();
  const menuHeight = 0;//$('.menu').outerHeight();
  const currentEntityHeight = entity.outerHeight();
  const totalMinimizedPanelHeight = REDUCED_IMAGE_SIZE + (2 * REDUCED_MARGIN_SIZE);

  const webpageTop = 0;
  const viewportTop = $(window)['scrollTop']();
  const entityTop = entity.offset().top;


/*

   ________________﹍﹍﹍﹍﹍﹍ webpageTop﹍﹍﹍﹍﹍﹍﹍
  |                |                         ▲  ▲
  |                |                         |  |
  |                |                         ▼  |
  |        ___﹍﹍﹍|﹍﹍﹍﹍﹍ entityTop﹍﹍﹍﹍﹍ | 
  |       |  |     | }-currentEntityHeight      |
  |        --      |                            |
  |                |                            ▼
  |  ____________﹍|﹍﹍﹍﹍﹍ viewportTop﹍﹍﹍﹍﹍﹍﹍
  | |------------| | }-menuHeight    ﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍﹍ 'visibleTop' (what you can actually see)
  | |            | |
  | |            | |
  | |            | | 
  | |            | |
  |  ------------  |    
  |                |
  |                |
  |                |
  |                |
  |                |
   ----------------    
*/


  /*
    Negative  if entityTop is above viewportTop
    Zero      if entityTop is at/equal to viewportTop
    Positive  if entityTop is below viewportTop
  */
  const entityTopFromVisibleTop = entityTop - (viewportTop + menuHeight);

  const visiblePortionOfEntityHeight = entityTopFromVisibleTop + currentEntityHeight;

  const entityTopIsAboveVisibleTop = entityTopFromVisibleTop < 0;
  const entityBottomIsBelowVisibleTop = (visiblePortionOfEntityHeight) > 0;
  const visiblePortionOfEntityHeightIsLessThanMinimizedHeight = visiblePortionOfEntityHeight < totalMinimizedPanelHeight;
  const entityIsFirstInRow = isFirstInRow(entity); // If true, means that there is no extra that needs to be scrolled up

  const entityTopIsInFirstFullyVisibleRowOrHigher = entityTop - (viewportTop + menuHeight) <= totalMinimizedPanelHeight + APPROX_REDUCED_TEXT_HEIGHT;


  // entityTopIsAboveVisibleTop ? w("entityTop is above visibleTop") : 0;
  // entityBottomIsBelowVisibleTop ? w("entity is at least partially below visibleTop") : 0;


  if (entityIsFirstInRow && entityTopIsAboveVisibleTop && entityBottomIsBelowVisibleTop) {
    // There is space to side (aka other imagePanels are there) and the entity is partially off the screen from the top, but still visible

    if (visiblePortionOfEntityHeightIsLessThanMinimizedHeight) {
      // We want scroll to have exactly that much amount still visible on the screen, even when minimized
      // UI motivation: We want the image to be visible after shrinking as much as it was when expanded to prevent scrolling up further than the user expected
      $('body, html').animate({scrollTop:
        viewportTop // Current scroll
        + entityTopFromVisibleTop // Will be a negative value; will cause window to scroll up to top of entity
        - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
        - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
        + (totalMinimizedPanelHeight - visiblePortionOfEntityHeight) // Scroll down enough to hide some of the minimized panel, leaving visiblePortionOfEntityHeight visible
      },{
        done: enableScrollWrapperFunction
      });
      return;
    

    } else {
      // Otherwise, we can safely just scroll to the top pf the entity as its minimized
      // UI motivation: If more of the image is visible than the minimum size of the image, we might as well just show the entire minimized image and not scroll down more than that
      
      // w("Scrolling from " + viewportTop.toString() + " to " + (viewportTop + entityTopFromVisibleTop).toString());

      $('body, html').animate({scrollTop:
        viewportTop // Current scroll
        + entityTopFromVisibleTop // Will be a negative value; will cause window to scroll up to top of entity
        - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
        - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
      },{
        done: enableScrollWrapperFunction
      });
      return;
    }
  }


  if (!entityIsFirstInRow && entityTopIsAboveVisibleTop && entityBottomIsBelowVisibleTop) {

    if (visiblePortionOfEntityHeightIsLessThanMinimizedHeight) {
      // Same as above
      $('body, html').animate({scrollTop:
          viewportTop // Current scroll
          + entityTopFromVisibleTop // Will be a negative value; will cause window to scroll up to top of entity
          - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
          - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
          + (totalMinimizedPanelHeight - visiblePortionOfEntityHeight) // Scroll down enough to hide some of the minimized panel, leaving visiblePortionOfEntityHeight visible
          - (totalMinimizedPanelHeight + APPROX_REDUCED_TEXT_HEIGHT) // Since !entityIsFirstInRow, that means current imagePanel will join the row above, so we have to scroll up by one row extra
      },{
        done: enableScrollWrapperFunction
      });
      return;
    
    } else {
      // Same as above
      $('body, html').animate({scrollTop: 
        viewportTop // Current scroll
        + entityTopFromVisibleTop // Will be a negative value; will cause window to scroll up to top of entity
        - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
        - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
        - (totalMinimizedPanelHeight + APPROX_REDUCED_TEXT_HEIGHT) // Since !entityIsFirstInRow, that means current imagePanel will join the row above, so we have to scroll up by one row extra
      },{
        done: enableScrollWrapperFunction
      });
      return;
    }
  }

  if (entityTopIsAboveVisibleTop && !entityBottomIsBelowVisibleTop) {
    // Entity is entirely non-visible and is off the screen to the top. 
    // We want to scroll up enough to offset the shrinking of the expanding image so that the user lefts off at close to where they started
    $('body, html').animate({scrollTop: 
      viewportTop // Current scroll
      - currentEntityHeight
      + (totalMinimizedPanelHeight + APPROX_REDUCED_TEXT_HEIGHT)
    },{
      done: enableScrollWrapperFunction
    });
    return;

    // w("Entity is entirely above viewport");
  }


  if (entityIsFirstInRow && !entityTopIsAboveVisibleTop && entityTopIsInFirstFullyVisibleRowOrHigher) {

    $('body, html').animate({scrollTop:
        viewportTop // Current scroll
        - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
        - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
    },{
      done: enableScrollWrapperFunction
    });
    return;

    // w("Entity is first in row and entityTop is visible and close to visibleTop");

  }

  if (!entityIsFirstInRow && !entityTopIsAboveVisibleTop && entityTopIsInFirstFullyVisibleRowOrHigher) {

    $('body, html').animate({scrollTop:
      viewportTop // Current scroll
      - EXPANDED_MARGIN_TOP_SIZE // Since expanded panel has big margins that will shrink, need to scroll up by that amount too
      - ARBITRARY_SLIGHT_EXTRA_SCROLL // To show the bottom of the row above to look less like something is cut off
      - totalMinimizedPanelHeight
    },{
      done: enableScrollWrapperFunction
    });
    return;

    // w("Entity is NOT first in row and entityTop is visible and close to visibleTop");

  }

  // w("no conditions met")
  enableScrollWrapperFunction();

  // // THIS PORTION STILL ISNT BEHAVING CORRECTLY
  // if (!spaceExistsToLeftOrRight(entity)
  //   && entityTopFromVisibleTop <= - totalMinimizedPanelHeight
  //   && entityTopFromVisibleTop >= - entity.outerHeight()) {
  //   // There is no space to side (aka other imagePanels are there) and the entity is partially off the screen from the top, but still visible

  //   var visiblePortionOfEntityHeight = entityTopFromVisibleTop + entity.outerHeight();

  //   if (visiblePortionOfEntityHeight <= totalMinimizedPanelHeight) {
  //     // We want scroll to have exactly that much amount still visible on the screen, even when minimized
  //     // UI motivation: We want the image to be visible after shrinking as much as it was when expanded to prevent scrolling up further than the user expected
  //     $('body, html').animate({scrollTop: currentScrolledDistanceFromTop + entityTopFromVisibleTop - visiblePortionOfEntityHeight + totalMinimizedPanelHeight});
  //   } else {
  //     // Otherwise, we can safely just scroll to the top pf the entity as its minimized
  //     // UI motivation: If more of the image is visible than the minimum size of the image, we might as well just show the entire minimized image and not scroll down more than that
  //     $('body, html').animate({scrollTop: currentScrolledDistanceFromTop + entityTopFromVisibleTop - 5* totalMinimizedPanelHeight});
  //   }
  // }

  // if (spaceExistsToLeftOrRight(entity)
  //   && entityTopFromVisibleTop < - entity.outerHeight()) {
  //   // There is space side to side and the entity is completely off the screen from the top
    
  //   // We want to scroll up enough to offset the shrinking of the expanding image so that the user lefts off at close to where they started
  //   $('body, html').animate({scrollTop: currentScrolledDistanceFromTop - entity.outerHeight() });
  // }

  // if (!spaceExistsToLeftOrRight(entity)
  //   && entityTopFromVisibleTop < - entity.outerHeight()) {
  //   // There is no space side to side and the entity is completely off the screen from the top
    
  //   // We want to scroll enough to offset the shrinking of the large image, but also scroll up extra to account for the shrunk image merging with another row of images
  //   $('body, html').animate({scrollTop: currentScrolledDistanceFromTop - entity.outerHeight() - totalMinimizedPanelHeight});
  // }



/* Right now possibly not accounting for:
   - entity with panels to its sides shrinking, and when it shrinks, it merges with a row above, meaning that we should scroll up more than we do currently (how do we check if an image would run into that? could we check the space to the right of the previous element?)
   - same problem with images with no space to the side
   - i dont remember if the description shrinking (when it is below) is accounted for in the scroll offsetting

*/




//// This old version of code simply scrolled to the top of the entity
  // setTimeout(function() {
  //   // top position relative to the document
  //   var pos = entity.offset().top;

  //   var menuHeight = $('.menu').outerHeight();

  //   // animated top scrolling
  //   $('body, html').animate({scrollTop: pos - menuHeight});

  // }, 1000);
}


function spaceExistsToLeftOrRight(entity) {
  p('inside spaceExistsToLeftOrRight');

  var screenWidth = $(window).width();
  var imagePanelWidth = entity.width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var totalWidthOfNonImagePanelArea = screenWidth - imagePanelWidth;

  // p("screenWidth: " + screenWidth);
  // p("imagePanelWidth: " + imagePanelWidth);
  // p("marginBorderSize: " + marginBorderSize);
  // p("totalWidthOfNonImagePanelArea: " + totalWidthOfNonImagePanelArea);
  // p("collapsedPanelSize: " + (REDUCED_IMAGE_SIZE + marginBorderSize));

  return (totalWidthOfNonImagePanelArea >= REDUCED_IMAGE_SIZE + marginBorderSize);
}


function isThereSpaceOnTheLeft(entity) {
  p('inside isThereSpaceOnTheLeft');

  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();

  p("-- Is there space on left?");
  p("left: " + elemRect.left);
  p("collapsedPanelSize: " + (REDUCED_IMAGE_SIZE + 1.5 * marginBorderSize));

  return (elemRect.left >= REDUCED_IMAGE_SIZE + 1.5 * marginBorderSize);
}

function isThereSpaceOnTheRight(entity) {
  p('inside isThereSpaceOnTheRight');

  var imagePanelWidth = entity.width();
  var screenWidth = $(window).width();
  var marginBorderSize = 2 * parseInt(entity.css("marginRight").replace('px', ''));

  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = entity[0].getBoundingClientRect();

  p("-- Is there space on right?");
  p("rightcornerSpace: " + (screenWidth - (elemRect.left + imagePanelWidth)));
  p("collapsedPanelSize: " + (REDUCED_IMAGE_SIZE + 1.5 * marginBorderSize));

  return ((screenWidth - (elemRect.left + imagePanelWidth)) >= REDUCED_IMAGE_SIZE + 1.5 * marginBorderSize);
}



$(document).ready(function() {

  const withHeading = "<br><br><span class='descriptionHeading'>WITH</span><br>";
  const why = "<br><br><span class='descriptionHeading'>WHY</span><br>";
  const how = "<br><br><span class='descriptionHeading'>HOW</span><br>";
  const next = "<br><br><span class='descriptionHeading'>NEXT</span><br>";
  const ideas = "<br><br><br><span class='descriptionHeading'>CORE IDEAS & INSPIRATIONS</span><br>";
  const br = "<br>";
  
  const respGal = 
  why
  + "to design a museum-inspired digital gallery experience that allows multiple images to coexist with latent textual descriptions – that are able to appear without isolating or encroaching on the images"
  + how
  + "created a structure of CSS div classes and 800 lines of Javascript functions to add and regulate the interactions between panels of images and their respective descriptions. These used many systems of checks and calculations to have images expand to as large as possible without going off the screen, to determine the method and type of scrolling behavior after the completion of an action, and to figure out the most intuitive and undisruptive location to place the description of an enlarged image."
  + next
  + "I hope to work out some more subtle kinks and spin it off into a public GitHub package so other people can use it as well!"
  + "<br><br><span style='font-weight: 900;'>I’ve used it in the gallery that you are currently viewing!</span>";

  const micro =  
  why
  + "to create a more simplified and intuitive microwave experience."
  + how
  + "worked with a team to (1) Research the current use-cases of microwaves amongst various groups of users (2) Conceptualize a touchscreen interface with simplified options and a unique time-keeping system (3) Design various paper prototypes and mockups (4) Conduct user testing and feedback sessions to create further iterations (5) Present a 2 min pitch for public feedback and criticism."
  + "<br><br><a href='https://www.youtube.com/watch?v=6DrnK7Flaxc'><span style='font-weight: 900;'>See a 2 minute demo video!</span></a>";

  const airp = 
  why
  + "to provide a simple way for Brown students traveling to and from the Providence airport to find other Brown students to split the cost of an Uber or Lyft with."
  + how
  + "worked with a team to flesh out the idea, with an emphasis on making the process as simple and intuitive as possible for a user, while also taking care to not make assumptions that would restrict the webapp to only certain kinds of students. Over the next month, we created a sqlite database of users and their requests and a Java backend to match students and to connect to the Twillio API (to text users updates), flight API (to check flight information to allow scheduling of matching requests and account for delays), and email API (to verify emails for the creation of accounts). Lastly, I created the frontend with HTML/CSS/Javascript of the entire project, again with an emphasis on clarity and conciseness (in terms of words and time)."
  + next
  + "we are in the process of finding a suitable server hosting service to host the backend, and aim to release the webapp soon for Brown students to use!";

  const virgw = 
  why
  + "to create a central web-accessible portal for Virgo App Inc. employees to see and update customer requests and their status’ in real time, and chat with customers directly."
  + how
  + "after settling the structure and contents of the data that would be stored with another developer, I worked in Javascript (as well as a little HTML and CSS) to (1) establish a connection to the data stored in the Firebase ‘realtime database’, (2) implement a secure login system, (3) create a scrolling panel of cards, one per customer request, that would be each assigned a unique ID and updated with every change, (4) a system of buttons and popups that would an employee to update pricing and logistical information specific to a request, and (5) a chat system that would sync through Firebase to allow an employee to chat directly with a customer. I was given a lot of control over the user’s interaction with the webpanel and so developed a system of descriptions, ‘new’ and ‘updated’ card badges, and ‘material design’ inspired shadowed panels and animations to make as clear as possible to employees the relations and connections between components."
  + next
  + "some of the general patterns developed here like creating a field of separate request cards with the same structure and rules have continued to be used in later work (like responsiveWebGallery in this case)";

  const virga =
  why
  + "to allow consumers  to request household services of any type (like laundry, walking a dog, etc) from trusted small businesses in their vicinity through a mobile app."
  + how
  + "worked with another developer to create a 40-screen app from a combination of Swift and the Xcode visual editor. Unlike my other project at Virgo, this had a (fairly) detailed Illustrator mockup set before we started work that served as a guiding hand. Throughout the process of implementing every aspect of the app, from login to messaging, we strived to follow the design templates as closely as possible, while also changing some aspects (after approval) for the sake of a better user experience.";

  const water =
  why
  + "to design a resonant visual representation of the global water crisis for the organization B for Water."
  + how
  + "depicted the world’s population as a series of water droplets that grow progressively ‘muddier’ with decrease in access to clean water. The stark contrast between the muddy droplets with the clean droplets tries to really impress the idea of just how many people around the world don’t have enough or any clean water. Because numbers and data are not easy to remember, it ends with a simple memorable statement for people to take away. Though it’s usually irresponsible to simplify data too much, the reader here has some context by the time they reach that last statement."
// + "<br><br><a href='http://www.bforwater.org/about/#aboutus'><span style='font-weight: 900;'>Check out the infographic here!</span></a>";
  + "<br><br><span style='font-weight: 900;'>Used by the water sustainability organization 'B for Water' in 2016</span>";

  const dent =
  why
  + "to bridge the literal and figurative space between poetry and graphics"
  + how
  + "worked with a writer to create a graphic poem where the traditional boundaries between text and illustration are blurred. The graphics of the piece encompass the words to reflect and represent the overarching themes of the poem."
  + "<br><br><span style='font-weight: 900;'>Exhibited at the Granoff Center for Creative Arts in October 2016</span>"
  + "<br> <br> My initial pitch and sketch: <img src='images/DentalPitch.png' alt='' style='max-width:100%;max-height:100%;'>";


  const bmsa =
  why
  + "Designing and promoting a brochure was the start to framing a more deliberate and inclusive narrative about what the Muslim community at Brown entails and represents. As a brochure, it provides an unique opportunity to not only assist new members with useful information, but also to shape some of the very first impressions that newcomers make of the community."
  + br + br
  + "Information in/of this community had traditionally been ambiguous and ill-defined. Thus, it tended to be concentrated among the most well-connected/social members. This knowledge gap would be one more barrier of entry for newcomers, especially those who are not as outgoing. Power dynamics like these had resulted in the community being occassionally percieved as unwelcoming or even at times, hostile. This was one of multiple efforts to start to conciously undo that."
  + how
  + "First I identified the most salient info that would benefit people new to the community. This was primarily through analyzing existing documentation and data on the questions recieved by the board and the chaplain. Then I simplified and grouped this information into digestible chunks. I put emphasis on creating information that could be easily scanned and indexed, since most readers would not intend to read through every word, and might only want a specific piece of information or just want a general sense of the community."
  + br
  + "Then I refined the word choice and presentation to not only be concise and accessible, but also to create a more well-defined narrative about the community. Things like the rounded font ‘Quicksand’ were used to help further a sense of friendliness."
  + br
  + "At the same time, I tweaked and refined the map, arrangments, and colors to maximize clarity and professionalism. This was to lend the brochure (and thus the community it represents) with an air of legitimacy."
  + br
  + "All the graphics and words used were created from scratch by me, with the exception of the satellite image from Google Maps and the aformentioned font."
  + "<br> <br> A physical print: <img src='images/bmsaBrochurePrintedV2.jpg' alt='' style='max-width:100%;max-height:100%;'>"
  + "<br> <br> Past version of brochure: <br> <img src='images/bmsaOldBrochurePg1.png' alt='' style='max-width:50%;max-height:100%;'><img src='images/bmsaOldBrochurePg2.png' alt='' style='max-width:50%;max-height:100%;'>";




  const psych = 
  why
  + "to design a poster to advertise a performance at the Hamilton House for Adult Learning Exchange for senior citizens"
  + how
  + "researched 60s era San Francisco psychedelic rock art and worked to develop a poster that would invoke the twisting and vibrant qualities and the 'if people care enough, they’ll lean in and look closer' (Wes Wilson) philosophy associated with psychedelic art, while trying to strike a balance with modern design focus on readibility and simplicity. Ended up with the final version after 59 distinct iterations in Illustrator:"
  + "<br> <br> <img src='images/HamiltonHousePosterTimeline.png' alt='' style='max-width:100%;max-height:100%;'>"


  const winter = 
  why
  + "As the first large-scale event open to the broader Brown University community in years, the Brown Muslim Student Association needed clear and engaging advertising material for an upcoming event with a distinguished speaker."
  + how
  + "Overall, I was striving towards a design that had a calm, warm, and dignified feel. This was achieved especially through the colors and arrangements. The eye-catching picture was used to place special emphasis on the important guest speaker. Snowflakes that I based on traditional Islamic tilework patterns were created to represent the winter theme of the banquet, while also providing an element of visual delight for those who looked closely. Key information was refined and grouped at the bottom for fast, at-a-glance understanding, each topic indexed by unambiguous icons. Information like “Free; All Welcome” is usually not explicitly stated on college campus posters, but was specifically included here to ensure zero doubt that everyone was invited. After creating the final version, it was also adapted it to some other sizes for various advertising platforms."
  + "<br> <br> Some later Illustrator iterations: <img src='images/winterBanquetTimeline.png' alt='' style='max-width:100%;max-height:100%;'>"


  const ygaAppDescription = 
  withHeading
  + "<dl>"
  +   "<dt>Young Guru Academy (YGA)</dt>"
  +     "<dd>"
  +       "a Turkey-based non-profit NGO responsible for targeted social innovation programming to improve long-term outlooks for youth"
  +     "</dd>"
  +   "<dt>Brown University Department of Computer Science</dt>"
  +     "<dd>"
  +       "senior capstone project"
  +     "</dd>"
  + "</dl>"
  + why
  + "Pre-teens and early teens in Turkey, especially those of disadvantaged socio-economic backgrounds or refugee status, frequently have"
  + "<ul>"
  +   "<li>Limited exposure and comfort with science and problem-solving</li>"
  +   "<li>A sense that higher education is too difficult and unattainable</li>"
  +   "<li>Low levels of self-confidence</li>"
  + "</ul>"

  const ygaAppDescription2 = 
  how
  + "Based on information from interviews conducted with students and YGA instructors, we created a prototype for a social experience designed to foster creative thinking, encourage experimentation, build self confidence, and form bonds among others their age."
  + br + br 
  + "This was a project of four, and my primary contributions were"
  + "<ul>"
  +   "<li>Qualitative research</li>"
  +   "<li>UX planning and synthesizing</li>"
  +   "<li>UI mocks and implementation</li>"
  +   "<li>Programming of the ‘creations’ and ‘collections’ functionalities of the mobile app</li>"
  + "</ul>"
  + br 
  + "We thought critically about the kinds of behaviors we wanted to optimize for, and drew a lot of inspiration from existing products and services. A lot of deliberation was put on avoiding common social media trademarks (in particular the mechanisms and algorithms that: promote unhealthy social comparison/ranking; reward sensationalism; create filter bubbles; and maximize the time users spend glued to the service)."
  + ideas
  + "The overall experience can be summarized with three core concepts:"
  + "<dl>"
  + br 
  +   "<dt>The ‘Creation’:</dt>"
  +     "<dd>"
  +       "The whole experience revolves around creations the user has made with a combination of: household materials, ‘TWIN Science Kits’, and any other toys."
  +       br + "(‘TWIN Science Kits’ are easy-to-use LEGO-compatible electronic kits designed by YGA to make science more accessible. These kits are being donated in Turkey by the thousands.)"
  +     "</dd>"
  + br
  +   "<dt>A Feed of Public ‘Challenges’:</dt>"
  +     "<dd>"
  +       "A ‘challenge’ is either a step-by-step tutorial or a more open-ended creative prompt. These are displayed in a dedicated feed visible to all users of the app. Though some of these ‘challenges’ are made by YGA professionals, the majority are community-submitted."
  +       br + "Any user is able to ‘respond’ to a challenge. Such a response is not in the form of a textual comment, but instead a ‘creation’ that the user has made after being inspired by the challenge itself or even by the responses that others had submitted. Users are encouraged to contribute anything from carbon copies to creations that have the thinnest thread of similarity with what’s come before. All submissions set to ‘public’ are visible right under the ‘challenge’ itself for all users to see."
  +       br + br + "One goal with ‘challenges’ was to provide a lot of inspiration and instructions for all users. Just as LEGO instructions do, the challenges provide some structure that makes it easier to start building things that might have seemed unachievable otherwise."
  +       br + "The other goal was to deliberately structure the social interaction between users. In the traditional social network, especially when it comes to images and art, a ‘post’ ordinarily to be about oneself and one’s own work/thoughts/experiences. We wanted to organize our experience to be more explicitly like a back-and-forth conversation one might see in a design class: When a user submits a ‘challenge’, they are either asking an open-ended question to the community, or are literally making a creation of their own more accessible by making a tutorial of it. Even when a user simply responds with one of their own creations, it is in the context of a specific, ongoing ‘conversation’ of creations influenced and inspired directly by each other."
  +     "</dd>"
  + br
  +   "<dt>A Personal ‘Collection’ of Creations:</dt>"
  +     "<dd>"
  +       "As the user responds to the challenges with their creations (or simply logs their creations directly through the app), a ‘collection’ of their past and present work starts to form in the app. This allows them to have documentation of every creation they’ve uploaded in a centralized location. Even if the user isn’t inclined to put concious effort into registering every creation they’ve made, at minimum their collection grows as they make creations to respond and interact with the community."
  +       br + br + "The goal here was to faciliate a mindset of seeing ones own ‘exercises in creation’ as experiences that could be tangibly ‘collected’, almost as though they were coins or Pokemon. Not only that, with the help of the documentation, these creations are able to be revisited and recreated at any time as well. For a subset of users, this also provides a form of security and helps lower the emotional barrier to break apart something they were really proud of to make the next thing."
  +       br + "And of course, naturally over time, the user’s creations would get more complicated, developed, and unique, and so the hope was that this personal ‘portfolio’ would also provide a sense of pride and acomplishment in the specific things they’ve made and how far they’ve come."
  +     "</dd>"
  + "</dl>"
  + next
  + "Transferred assets to YGA’s development team, who plan build off the app and to create a matching sibling app for Android.";



  const symbiosis =
  why
  + "For the final project of the course Designing Human-Centered Robots, I and two others were really interested in developing a concept that would involve exploring nudge theory, habit-forming, tragedy of the commons, and related themes within behavioral economics. We settled on an unusual challenge for ourselves: How could we foster and incentivize more of a symbiotic relationship between two people? How could we provide motivatation to actively help the other along?"

  const symbiosis2 =
  how
  + "This project involved a lot of divergent and convergent ideation, sketching, research, and many iterations of physical prototyping."
  + " The process is documented in-depth on the blog here."
  + br + br
  + "The final iteration of the concept was as follows:"
  + br
  + "Person1 enters their major tasks for the week into a Google Sheets spreadsheet that we designed. As Person1 makes progress on a task, they update the progress of the task in spreadsheet via a dropdown with the options: Started, 25%, 50%, 75%, Done."
  + br
  + "Now at the same time, Person2 carries a small device (pictured) that we also designed. This badge would be updated in real-time with the current status of the task that Person1 is working on. This allows Person2 to have at-a-glance information about how Person1 is progressing. With this information, it becomes easier for Person2 to know when might be a good time to check in with Person1 (perhaps if progress has stagnated for some time for example.) It also makes it much easier for Person2 to provide real positive encouragement by celebrating the work of Person1. And not only when a task is completed, but even as progress towards it is made."
  + br
  + "The additional twist is that Person2 actually wears said device on their chest! Similar to the mechanisms with the 'I voted' sticker, this provides Person2 with a tiny bit of additional extrinsic motivation to help Person1 fulfill their task. Especially once the task is completed, Person2 could feel proud about the 'I helped someone today 👍' message displayed on their chest for the rest of the day."
  + br
  + "Ideally, Person1 would simultaneously be wearing a badge for Person2 and helping them along with their tasks as well, which would ensure a more reciprocal relationship."
  + br
  + "This is more speculative, but it would be interesting to study whether people who see Person2's tag would be slightly more inclined to be friendly to those around them right after."
  + br
  + "It would also be interesting to explore how/whether this task-badge system could be used between people who didn't know each other well beforehand. That would be a good opportunity to form bonds with others based essentially what is shared work."




  const odni =
  withHeading
  + "Office of the Director of National Intelligence (ODNI) virtual internship program"
  + why
  + "Under President Obama’s administration, a far-reaching transparency initiative was started for the US Intelligence community to have more open communication with US citizens. Understandably though, some Intelligence employees were hesitant about the benefits of such a program. My task was to create a workplace poster to help employees in the Intelligence community see more value in the transparency initiatives."
  + how
  + "I first researched the main motivations behind the hesitancies that Intelligence employees might have. Among other concerns, there was a sense that more transparency wasn’t really neccessary, and that it seemed unideal to then put resources into something that wasn’t needed. Because a poster has to be quickly digested, I decided I had to find an extrememly simple argument to make that could be communicated in seconds. After a lot of deliberation, I had the idea of literalizing the concept of transparency and taking advantage of my ‘outsider’ perspective. I settled on communicating the idea that when the wider US public lacks views into the Intelligence community, they end up imagining the worst and relying on tropes from the only exposure they do have – exaggerated movies and shows."
  + br + "After this, I went through many iterations on the poster itself. One constant was the presence of elements like the alien dissection, which I hoped would provide employees with some levity. :)"


  const reaching = 
  why
  + "Through this piece, I wanted to represent my drive to always keep reaching for the ‘next thing’. Though our undying urge for new innovation is often uncritically framed as one of humanity's greatest strengths, it’s not necessarily purely positive. Without introspection, such drive can lead to change for the sake of change alone while reinforcing a discontentment for the magic that exists even now. Worse, it can become detached from any real needs of real people. (For example, there are many examples of audacious architecture that is different for the sake of being different, with really no other meaning or intent. Sometimes these literally worsen the lives of the surrounding community, precisely because of the sacrifices made to accommodate that novelty.) I tried to represent this all with a disembodied hand that is eternally reaching, but for nothing in particular. The hand was rendered as a painting in a literal three dimensions, which one could easily argue was a gimmick for the sake of novelty in itself!"
  + "<br> <br> A closer view: <img src='images/reachCloseReducedHighRes.png' alt='' style='max-width:100%;max-height:100%;'>"
  + how
  + "After challenging myself to extend a painting out of the traditional two dimensions, I explored many possibilities. I was inspired by lightboxes and decided to make many layers that would be stacked on top of each other. Eventually I learned about acetate sheets, and their transparency made the end result possible."
  + br + "Planning out the hand itself was tricky because it required thought not only about usual factors like pose, outline, shape, and shadows, but about the cross-sections of the hand too. This took a lot of measurements and careful planning."
  + br + "Constructing the housing was another challenge. It had to be open from both sides and non-distracting while also being really stable.";
  

  const link = 
  why
  + "The Lego ‘minifigure’ is a beautifully designed, minimalist toy. I wanted to build off of it by creating a minifigure design of my own. This one is based on the character ‘Link’ from Nintendo’s iconic ‘Legend of Zelda’ series. The whole figure is 4 centimeters tall."
  + how
  + "Used clay, paper, glue, and paint overlaid on a white Lego minifigure. Some of the pieces, like the arm guard, belts, and the shield layers, were less than a millimeter thick and took many tries to get right.";

  // “psychedelic” is a combination of the Greek words psyche and delos, and means “mind manifesting” or “soul manifesting.”









  // I like all these color options alot :/ Finalized choice soon
  // addImagePost('images/winterBanquetLowRes.png', 'images/winterBanquetV1.svg', 'Banquet Poster', 'representing tranquility', winter, '#visual', '#4E3D42');
  // addImagePost('images/winterBanquetLowRes.png', 'images/winterBanquetV1.svg', 'Banquet Poster', 'representing tranquility', winter, '#visual', '#92B6B1');
  addImagePost('images/winterBanquetLowRes.png', 'images/winterBanquetV1.svg', 'Banquet Poster', 'representing tranquility', winter, '#visual', '#666A86', null, '');
  // addImagePost('images/winterBanquetLowRes.png', 'images/winterBanquetV1.svg', 'Banquet Poster', 'representing tranquility', winter, '#visual', '#788AA3');
  // Also considered colors: #136F63, 

  addImagePost('images/HamiltonHousePosterVer3.svg', null, '60s Psychedelic Poster', 'invoking nostalgia', psych, '#visual', '#491d7c', null, '');

  addImagePost('images/dentalV3.svg', null, 'Dent to Deal', 'visualizing poetry', dent, '#visual', '#6c698D', null, '');
  // Also considered colors: #54442B, black

  addImagePost('images/ygaAppV5LowRes.png', 'images/ygaAppV6ClearHighRes.png', 'Non-profit Teen Social Network', 'encouraging creation and confidence', ygaAppDescription, '#visual', '#1db5a0', null, ygaAppDescription2);
  // Initially wanted #2FD2BB but it was probs too light 

  // addImagePost('images/bmsaMapV1LowRes.png', 'images/bmsaBrochure.png', 'Informational Brochure', 'welcoming new faces', bmsa, '#visual', '#202023');  
  addImagePost('images/bmsaMapV2LowRes.png', 'images/bmsaBrochureV2HighRes.png', 'Informational Brochure', 'welcoming new faces', bmsa, '#visual', '#202023', PRIORITIZE_WIDTH, '');



  // addImagePost('images/BforWaterInfo.svg', null, 'Water Consumption Infographic', 'representing a global crisis', water, '#visual', '#9d712c');
  addImagePost('images/bwater.svg', null, 'Water Consumption Infographic', 'representing a global crisis', water, '#visual', '#7490a7', null, '');

  addImagePost('images/badgeV1LowRes.jpeg', 'images/badgeV1HighRes.jpeg', 'Social Symbiosis Prototype', 'facilitating collaboration', symbiosis, '#visual', '#15599e', null, symbiosis2);


  addImagePost('images/reachLowRes.png', 'images/reachReducedHighRes.png', 'Reaching', 'painting in three dimensions', reaching, '#visual', '#5d2c26', null, '');

  addImagePost('images/linkLowRes.png', 'images/linkHighRes.png', 'Link from ‘Legend of Zelda’', 'sculpting delicately', link, '#visual', '#5d332a', null, '');
  // Also considered colors: #a2695b

  addImagePost('images/odniPosterV7ReducedLowRes.png', 'images/odniPosterV2HighRes.png', 'ODNI Poster', 'making a case for transparency', odni, '#visual', '#c5a07e', null, '');




  // addImagePost('images/responsiveGalleryGifStatic.gif','images/responsiveGalleryGif.gif', 'responsiveWebGallery', 'the lightbox redesigned', respGal, '#visual', '#781260');
  

  addImagePost('images/microwaveRedesignCent.png', 'images/microwaveRedesign.png', 'Touchscreen Interface Design', 'the microwave reimagined', micro, '#visual', '#4B4237', null, '');
  // Also considered colors: #D6A2AD, #ADC698, #157A6E, #813405, #f17013

  addImagePost('images/airpoolerGifStatic.png', 'images/airpoolerGif.gif', 'Airpooler', 'a ride-sharing webapp for student travelers', airp, '#visual', '#018192', null, '');
  addImagePost('images/VirgoOpStill.png', 'images/VirgoOp.gif', 'Operations Webpanel', 'for coordinating Virgo Inc business', virgw, '#visual', '#2ea165', null, '');
  addImagePost('images/VirgoAppDemoV2Still.png', 'images/VirgoAppDemoV3.gif', 'Virgo iOS App', 'connecting consumers to small businesses', virga, '#visual', '#2bb370', null, '');









  



  $(".imagePanel").hover(
    function(){ 
      hoverAction(this, "110%");
    },
    function(){
      hoverAction(this, "100%");
    });


function beeep(entity, timeout) {
  setTimeout(function() {
      // prevent standard hash navigation (avoid blinking in IE)
      // e.preventDefault();

      // top position relative to the document
      var pos = entity.offset().top;

      var menuHeight = $('.menu').outerHeight();

      // animated top scrolling
      $('body, html').animate({scrollTop: pos - menuHeight*2});
    }, timeout);
}



  $(".imagePanel").click(function(e){
    p('inside .imagePanel clicked');

    // If it was close button that was clicked, return
    if ($(e.target).hasClass("close")) {
      //Shrinks the imagePanel and scrolls appropriately, depending on the size of the panel being shrunk
      var scrollTo = $(e.target).closest('.imagePanel');
      
      pageScrollAfterShrinking(scrollTo);
      shrinkImage(scrollTo);
      //beeep(scrollTo, 100);
      
      return;
    }

    // If the clicked image panel was already expanded, we don't want to shrink and enlarge again!
    if (expandedPanel != null && expandedPanel.is($(this))) {
      return;
    }

    // Only option left is that a reduced imagePanel was clicked
    // shrink the previously expandedPanel
    shrinkImage(expandedPanel);
    expandImage($(this));

//CRAZY TEST
// Attempts to open a link
    // var opened = window.open("");
    // opened.document.write($(this)[0].outerHTML);


    // var opened = window.open("");
    // opened.document.write(
    //   "<html><head><title>MyTitle</title></head><body>" 
    //   + $(this)[0].outerHTML
    //   + "</body></html>");


    // var opened = window.open("");
    // opened.document.write(
    //   "<html><head>"
    //   + "<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\" />    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">    <title>Ruban's Personal Website</title>        <link rel=\"stylesheet\" href=\"jquery-ui.css\">    <script src=\"jquery-2.1.1.js\"></script>    <script src=\"jquery-ui.js\"></script>    <link href=\"default.css\" rel=\"stylesheet\" type=\"text/css\" />    <!-- <script src=\"https://rubest.github.io/Artblog/responsiveGallery.js\"></script> -->    <script src=\"responsiveGallery.js\"></script>    <!-- <link href=\"https://fonts.googleapis.com/css?family=Raleway\" rel=\"stylesheet\">    <link href=\"https://fonts.googleapis.com/css?family=Lato|Poppins|Rubik:300\" rel=\"stylesheet\"> -->    <link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700,900\" rel=\"stylesheet\">"
    //   + "</head><body>" 
    //   + $(this)[0].outerHTML
    //   + "</body></html>");


  });







  try {
    var options = {
      get passive() { // This function will be called when the browser
                      //   attempts to access the passive property.
        passiveSupported = true;
      }
    };

    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch(err) {
    passiveSupported = false;
  }











// //Uncomment/modify if want to have clicks on not the imagePanel to collapse expanded imagePanels (if any)
//   $(document).click(function(e){

//     if (!$(e.target).closest('.imagePanel').length) {

//       if( $(window).width() >= 412 && $(window).height() >= 737 ) { // is not mobile
//         var scrollTo = expandedPanel;
        
//         pageScrollAfterShrinking(scrollTo);
//         shrinkImage(expandedPanel);
        
//       }
//     }    
//   });




});





// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


// Added more explicit handling of 'passive'ness of the listeners after this recent update: https://www.chromestatus.com/feature/6662647093133312
function disableScroll() {

    if (window.addEventListener) {// older FF
        window.addEventListener('DOMMouseScroll', preventDefault, passiveSupported ? { passive: false } : false);

        window.addEventListener('scroll', preventDefault, passiveSupported ? { passive: false } : false);
        window.addEventListener('wheel', preventDefault, passiveSupported ? { passive: false } : false);
        window.addEventListener('keydown', preventDefault, passiveSupported ? { passive: false } : false);
        window.addEventListener('touchmove', preventDefault, passiveSupported ? { passive: false } : false);
    } else {
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

}

function enableScroll() {

    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, passiveSupported ? { passive: false } : false);

        window.removeEventListener('scroll', preventDefault, passiveSupported ? { passive: false } : false);
        window.removeEventListener('wheel', preventDefault, passiveSupported ? { passive: false } : false);
        window.removeEventListener('keydown', preventDefault, passiveSupported ? { passive: false } : false);
        window.removeEventListener('touchmove', preventDefault, passiveSupported ? { passive: false } : false);
    } else {
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;      
    }

}





/*
absorptionCount - the number of times enable scrolling has to be called before scrolling is fully re-enabled. This exists to account for cases where there are multiple scrolling-related checks.
*/
//https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
function disableScrollWrapper(absorptionCount) {

  disableScroll();

  var sharedAbsorptionCounter = 0;
  if (absorptionCount == null || isNaN(absorptionCount)) {
    sharedAbsorptionCounter = 0;
  } else {
    sharedAbsorptionCounter = absorptionCount;
  }


  function enableScrollWrapper() {
    if (sharedAbsorptionCounter <= 0) {
      enableScroll();
      // w("scroll enabled");
      return
    } else {
      sharedAbsorptionCounter--;
      // w("scroll NOT YET enabled");
      return
    }
  }


  return enableScrollWrapper;
}





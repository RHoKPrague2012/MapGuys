
/**
 * Expand/collapse code for the view style plugin "Expanding Teaser"
 * @author Sam Lerner
 */

var expandingTeaserQueueNodes = new Array();  // list of all nids of items that expand
var expandingTeaserOpenNID = null;

// Swaps open a single node, after closing all other open ones.
function expandingTeaserSwap(nid) {
  if (expandingTeaserOpenNID == nid) {
    expandingTeaserOpenNID = null;
  } else if (expandingTeaserOpenNID) {
    expandingTeaserUpdate(expandingTeaserOpenNID);
    expandingTeaserOpenNID = nid;
  } else {
    expandingTeaserOpenNID = nid;
  }
  expandingTeaserUpdate(nid);
  
  return false;
}

// Toggle the display of a view item.
function expandingTeaserUpdate(nid) { 
  if ($(".expanding-teaser-"+nid).is(".expanding-teaser-expanded")) {
    expandingTeaserClose(nid);
  } else {
    expandingTeaserOpen(nid);
  }
}

// Expands a vew item.
function expandingTeaserOpen(nid) {
  expandingTeaserOpenNID = nid;
  if ($(".expanding-teaser-"+nid).is(".expanding-teaser-collapsed")) {
    $(".expanding-teaser-"+nid).removeClass("expanding-teaser-collapsed").addClass("expanding-teaser-expanded");
    $(".expanding-teaser-"+nid+" .content").show();
    $(".expanding-link-"+nid).html("-");
  }
}

// Collapses a view item.
function expandingTeaserClose(nid) {
  expandingTeaserOpenNID = null;
  if ($(".expanding-teaser-"+nid).is(".expanding-teaser-expanded")) {
    $(".expanding-teaser-"+nid).removeClass("expanding-teaser-expanded").addClass("expanding-teaser-collapsed");
    $(".expanding-teaser-"+nid+" .content").hide();
    $(".expanding-link-"+nid).html("+");
  }
}

// Adds a node to the queue of nodes to be collapsed when the page loads.
function expandingTeaserQueue(nid) {
  var foundNID = false;
  for (var i=0; i<expandingTeaserQueueNodes.length; i++) {
    if (expandingTeaserQueueNodes[i] == nid) {
      foundNID = true;
      break;
    }
  }
  
  if (!foundNID) {
    expandingTeaserQueueNodes[expandingTeaserQueueNodes.length] = nid;
  }
}

// Collapses all but the top node on page load.
$(document).ready(function() {
  if (expandingTeaserQueueNodes.length > 1) {
    for (var i=1; i<expandingTeaserQueueNodes.length; i++) {
      expandingTeaserUpdate(expandingTeaserQueueNodes[i]);
    }
  }
  
  expandingTeaserOpenNID = expandingTeaserQueueNodes[0];
});
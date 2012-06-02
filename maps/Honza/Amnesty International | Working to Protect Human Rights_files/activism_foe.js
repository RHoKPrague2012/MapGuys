function clearText(field) {
  if (field.defaultValue == field.value && field.value == field.title) {
    field.value = '';
  } else if (field.value == '') {
    if (field.defaultValue != field.value) {
      field.value = field.title;
    }
  }

}

function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

var height_of_preview_div = 655;
var error_str = '';
var error_visible = 0;
/**
 * Displays preview popup
 */
function activism_foe_preview_popup(vt) {
  // alert("activism_foe.js l29: vt=" + vt);
  document.getElementById('fax-send-header').style.display = 'none';
  document.getElementById('fax-form-2').style.display = 'none';

  document.getElementById('fax-preview-outer').style.height = height_of_preview_div + 'px';
  document.getElementById('fax-preview').style.height = height_of_preview_div + 'px';
  document.getElementById('fax-preview').innerHTML = "";

  if (vt == 'u') {
    document.getElementById('fax-preview-header-xlated').style.display = 'block';
  } else {
    document.getElementById('fax-preview-header-target').style.display = 'block';
  }
  document.getElementById('fax-preview-outer').style.display = 'block';
  document.getElementById('fax-close-btn-outer').style.display = 'block';
}

/**
 * Hides preview popup
 */
function activism_foe_preview_close() {
  // alert("activism_foe.js l50: close");
  document.getElementById('fax-send-header').style.display = 'none';
  document.getElementById('fax-form-2').style.display = 'block';
  document.getElementById('fax-preview-header-xlated').style.display = 'none';
  document.getElementById('fax-preview-header-target').style.display = 'none';
  document.getElementById('fax-preview-outer').style.display = 'none';
  document.getElementById('fax-close-btn-outer').style.display = 'none';
}

/*
 * Call popup after ahaha completes
 */
if (Drupal.jsEnabled) {

  var about_is_clicked = 0;

  function toggleFaxAboutDiv(orig_img) {
    if (about_is_clicked == 1) {
      about_is_clicked = 0;
      $('#fax-about-extra').hide();
      $('#fax-about-arrow').attr("src", orig_img);
    } else {
      about_is_clicked = 1;
      $('#fax-about-extra').show();
      // -replace
      $('#fax-about-arrow')
          .attr(
              "src",
              '/' + Drupal.settings.activism_foe_path + '/images/foe_about_dd_down.gif');
    }
    return false;

  }

  $(document).ready(function() {
    $('.fax-submit-btn').hide();

    $('.panel-layout-onecol #tabs-tabset .ui-tabs-nav').hide();

    var orig_img = $('#fax-about-arrow').attr("src");

    // --SWITCH THE ABOUT CAMPAIGN IMG AND SHOW TXT
      $('#fax-about').click(function() {
        return toggleFaxAboutDiv(orig_img);
      });

      $('#close-fax-about').click(function() {
        return toggleFaxAboutDiv(orig_img);
      });

      // --SWITCH CTA MORE TXT
      $('#link-cta-more').click(function() {
        $('#fax-content-left .strapline-extra').show();
        $(this).hide();
        return false;
      });

      $('#link-cta-less').click(function() {
        $('#fax-content-left .strapline-extra').hide();
        $('#link-cta-more').show();
        return false;
      });

      // document.getElementById('fax-content-right').innerHTML =
      // orig_content + form_content;
    });

  // --FUNCTION - DISPLAYS THE PREVIEW
  window.activism_foe_display_preview = function(node, lang, view_type) {
    activism_foe_preview_popup(view_type);
    activism_foe_preview_change_lang(node, lang, view_type);
  }

  // --FUNCTION - DISPLAYS THE Fax
  window.activism_foe_display_fax_sending = function(nid, lang) {
    // --1) style.display='block';ALL FIELDS REQUIRED
    // node,lang,view_type

    var valid = activism_foe_validate_fields(nid);
    //alert("display_preview: valid=" + valid);
    if (valid) {

      // --1) hide languages
      $('div#fax-preview').empty();
      $('div#fax-preview').html('<div id="activism-fax-send"></div>');

      $('#fax-preview-header-xlated').hide();
      $('#fax-preview-header-target').hide();
      $('#fax-close-btn-outer').hide();

      // --2) DISPLAY POPUP
      $('#fax-form-2').hide();
      $('#fax-preview-header').hide();
      $('#fax-send-header').show();
      $('#fax-progress-sending').show();
      $('#fax-preview-outer').show();

      $('#fax-preview-outer').height(height_of_preview_div);
      $('#activism-fax-send').height(height_of_preview_div);

      // --3) DISPLAY PROGRESS BAR

      // --4) CAll TRANSMISSION
      var menu_url = '/activism-foe/jsfax/u' + '/' + lang + '/' + nid;

      var post_vars = {
        node : nid,
        activism_signup_first_name : $('#edit-activism-signup-first-name')
            .val(),
        activism_signup_last_name : $('#edit-activism-signup-last-name').val(),
        activism_signup_country : $('#edit-activism-signup-country').val(),
        activism_signup_mail : $('#edit-activism-signup-mail').val()
      }
      var response = $
          .post(menu_url, post_vars, function(img_url) {
            // alert("img_url: " + img_url);
              var faxDiv = $("div#activism-fax-send");
              var playerDiv = $('#activism-foe-player');
              var playerUrl = playerDiv.attr("player");
              var fileUrl = playerDiv.attr("file");
              // alert("Player URL=" + playerUrl + "; file=" +
              // fileUrl);

              jwplayer('activism-foe-player').setup( {
                autostart : true,
                flashplayer : playerUrl,
                file : fileUrl,
                height : 1,
                width : 1
              });

              faxDiv.css('background', "url('" + img_url + "') no-repeat");
              faxDiv.css('background-position', "0px -" + height_of_preview_div
                  + "px");
              faxDiv.animate( {
                backgroundPosition : '0 0px'
              }, 10000, 'linear', function() {
                $('.fax-submit-btn').click();
              });

              var sendingDiv = $("div#fax-progress-sending");
              var sendingBarDiv = $("div#fax-progress-sending .fax-progress-colour");

              sendingBarDiv.css("width", "0");

              sendingBarDiv.animate( {
                width : '100%'
              }, 10000, 'linear', function() {
                sendingDiv.css('display', 'none')
              });

            });

    } else {
      activism_foe_show_error_msg();
    }

  }

  // --FUNCTION - SHOW ERROR MSG
  window.activism_foe_show_error_msg = function() {
    var error_pos = $('#fax-form-1').offset().top;

    $('html').animate( {
      scrollTop : error_pos
    }, 5);

    if (error_visible == 0) {
      error_visible = 1;

      error_str = '<ul>' + error_str + '</ul>';
      $('#error-msg-content').html(error_str);
      $('#error-msg').show();
    }

  }

  // --FUNCTION - SEND LANG REQUEST VIA AJAX
  window.activism_foe_preview_change_lang = function(nid, lang, view_type) {
    var msg;

    if (view_type == '') {
      view_type = 'p';
    }

    var url = '/activism-foe/js/' + view_type + '/' + lang + '/' + nid;
    var post_vars = {
      activism_signup_first_name : $('#edit-activism-signup-first-name').val(),
      activism_signup_last_name : $('#edit-activism-signup-last-name').val(),
      activism_signup_country : $('#edit-activism-signup-country').val(),
      activism_signup_mail : $('#edit-activism-signup-mail').val()
    };

    $('#fax-preview').load(url, post_vars, function(response, status, xhr) {
      // alert("Response=" + response + "; status=" + status+";
        // xhr="+xhr);
        if (status == "error") {
          alert(msg + xhr.status + " " + xhr.statusText);
        }
        // activism_foe_set_active_lang(lang);

      });
  }

  // --FUNCTION - SET ACTIVE LANG
  window.activism_foe_set_active_lang = function(lang) {
    $('#fax-preview-languages A').removeClass('active');
    $('#fax-preview-link-' + lang).addClass('active');
  }

  // --ADD TOGGLER TO CAMPAIGNING TOPIC
  $(document).ready(function() {
    $('#show_campaign').click(function() {
      $('#campaign_desc').slideToggle();
      return false;
    });

  });

  // --FUNCTION - VALIDATE FIELDS
  window.activism_foe_validate_fields = function(nid) {

    // return false;
    var errors = false;

    var first_name = $('#edit-activism-signup-first-name');
    var last_name = $('#edit-activism-signup-last-name');
    var country = $('#edit-activism-signup-country');
    var email = $('#edit-activism-signup-mail');

    $('#activism-foe-activism-cta-form :input').removeClass('error');

    // Check for duplicate signups
    jQuery.ajaxSetup({async:false});
    var menu_url = '/activism-foe/jsfax-validate';
    var data = {nid: nid, email: email.val()};
    var response = $.post(menu_url, data, function(isValid) {
      jQuery.ajaxSetup({async:true});
      var valid = parseInt(isValid);
      //alert("validate_fields: " + isValid)
      if (isValid == 0) {
        error_str += '<li>' + Drupal.t('Email: that email address has already signed up for this action') + '</li>';
        errors = true;
        // Bail immediately - no further checks
        return false;
      }
    });

    if (first_name.val() == '' || first_name.val() == Drupal.t('First name')) {
      first_name.addClass('error');
      error_str += '<li>' + Drupal.t('First name') + '</li>';
      errors = true;
    }

    if (last_name.val() == '' || last_name.val() == Drupal.t('Last name')) {
      last_name.addClass('error');
      error_str += '<li>' + Drupal.t('Last name') + '</li>';
      errors = true;
    }

    if (country.val() == '') {
      country.addClass('error');
      error_str += '<li>' + Drupal.t('Country of residence') + '</li>';
      errors = true;
    }

    if (email.val() == '') {
      email.addClass('error');
      error_str += '<li>' + Drupal.t('Email') + '</li>';
      errors = true;
    }

    if (errors == false) {
      return true;
    }

    return false;

  }

  // --FUNCTION - CLEAR FORM FIELDS
  window.activism_foe_clear_fields = function() {
    $(':text, SELECT', '#activism-foe-activism-cta-form').val('');
  }

  // --FUNCTION
  window.activism_foe_set_links = function(view_type) {
    /* alert('view is '+ view_type); */
  }

  // --FUNCTION
  window.activism_foe_hide_error = function() {
    $('#error-msg').hide();
    error_str = '';
    error_visible = 0;
    $('#error-msg-content').html('');

    return false;
  }
}

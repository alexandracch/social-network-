$(document).ready(function () {
  var config = {
    apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
    authDomain: 'red-social-a1aeb.firebaseapp.com',
    databaseURL: 'https://red-social-a1aeb.firebaseio.com',
    projectId: 'red-social-a1aeb',
    storageBucket: 'red-social-a1aeb.appspot.com',
    messagingSenderId: '445743781768'
  };
  firebase.initializeApp(config);
  $('input.autocomplete').autocomplete({
    data: {
      'Apple': null,
      'Microsoft': null,
      'Google': 'https://placehold.it/250x250',
      'Hola': null,
      '¿Cómo estás?': null,
      'Jajajaja': null,
      'Bueno': null,
      'Está bien': null,
      'Laboratoria': null,
      'calle': null,
      'bootcamp': null,
      'sororidad': null,
      'feminismo': null,
      'Elena': null,
      'Alexandra': null,
      'Laura': null,
      'Hackaton': null,
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  var $input = $('#autocomplete-input');
  var nameUser = localStorage.name;
  var $btnSend = $('#send');
  var $chatUl = $('#messages-ul');
  var $btnSendAttr = $('button[type=submit]');
  $input.on('input', function() {
    if ($(this).val().length === 0 || $(this).val().length === ' ' || $(this).val().length === '') {
      $btnSendAttr.attr('disabled', true); // desabilita el boton
      // textArea contiene algo
    } else if ($(this).val().length >= 1) {
      $btnSendAttr.attr('disabled', false); // habilita el boton
    }
  });
  $btnSend.on('click', function() {
    var nameUser = localStorage.name;
    var $inputVal = $input.val();
    var $messages = '<div class="col s12 box">'+'<div class="right"><img src="_photo_"  style="width:50px; height: 50px; border-radius: 50% "></div>' + '<div class="div-name"><h4></h4></div>'+'<div class="message-box"><span></span></div>'+'</div>';
    var appenReplace = $messages.replace('<span></span>', $input.val()).replace('_photo_', localStorage.photo);
    $('#messages').append(appenReplace);

    firebase.database().ref('chat').push({
      name: localStorage.name,
      message: $inputVal,
    });
    
    $inputVal = $input.val('');

    if ( $inputVal = $input.val('')) {
      $btnSendAttr.attr('disabled', true); // desabilita el boton
    }
  });
 
  
});
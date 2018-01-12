$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('#foto').attr('src', localStorage.photo);
  var config = {
    apiKey: 'AIzaSyBTyPXp0vll8d2Fvi5nViLsKntlNxapEFY',
    authDomain: 'red-social-a1aeb.firebaseapp.com',
    databaseURL: 'https://red-social-a1aeb.firebaseio.com',
    projectId: 'red-social-a1aeb',
    storageBucket: 'red-social-a1aeb.appspot.com',
    messagingSenderId: '445743781768'
  };
  firebase.initializeApp(config);
  var $textArea = $('#textarea1');
  var $postButton = $('#postButton');
  // var $date = moment().format('LT');

  var $valueTextTarea = $textArea.val();
  var $postButton2 = $('button[type=submit]');
  // var dbRef = firebase.database().ref('usuarios');
  $('#fileButton').change(function() {
    var file = event.target.files[0];
    var storageRef = firebase.storage().ref('/' + localStorage.name + '/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed', function(snapshot) {

    }, function(error) {

    }, function(error) {
      var postKey = firebase.database().ref('Posts/').push().key;
      var downloadURL = task.snapshot.downloadURL;
      var updates = {};
      var postData = {
        url: downloadURL,
        user: localStorage.id,
        name: localStorage.name
      };
      updates['/Posts/' + postKey] = postData;
      firebase.database().ref().update(updates);
      // console.log(downloadURL);
    });
    var appen = '<div class="row">' +
      '<div class="col s12 align decoration">' + 
      '<div class="left"><img src="_photo_"  style="width:50px; height: 50px; border-radius: 50% "></div>' + '<div class="div-name"><h4></h4></div>' + '<br>' +
      '<img src="_pub_" alt="" class="img-pub">' +
      '</div>' +
      '<br>' + '<br>' +
      '<div style="width:100%"><a style="color:  rgb(197, 197, 197)" class="a-icon"><i class="material-icons left">favorite</i></a><a style="color:  rgb(197, 197, 197)" class="a-icon"><i class="material-icons left">question_answer</i></a><a style="color: rgb(197, 197, 197)" class="a-icon"><i class="material-icons right">more_horiz</i></span></a></div>' + '<div>' + '</div><textarea class="materialize-textarea" id="textarea-comment"></textarea><button class="btn" id="comment2">Post</button></div>' + '</div>' +
      '<div id="comentario"></div>' +
      '<br>';
     
    var reader = new FileReader();
    reader.onload = function(event) {
      var appenReplace = appen.replace('_pub_', event.target.result).replace('_photo_', localStorage.photo).replace('<h4></h4>', localStorage.name);
      $('#publicaciones').append(appenReplace);
      var $textareaComment = $('#textarea-comment');
      var $textareaComment2 = $('#textarea-comment').val();
  
      $('#comment2').on('click', function() {
        var $appendComment = '<div><i style="font-size: 3em; color: rgb(45, 171, 255)" class="material-icons left">account_circle</i><span style="font-size: 1.2em">Hola</<span></div>';
    
        var $commentReplace = $appendComment.replace('Hola', $('#textarea-comment').val());
    
        $('#commetario').append($commentReplace);
  
        $textareaComment2 = $('#textarea-comment').val(' ');
      });
    };
    reader.readAsDataURL(this.files[0]);
  });

  $textArea.on('keyup', function(event) {
    // Si textArea no contiene nada o contiene un vacío el boton se desabilita
    if ($(this).val().length === 0 || $(this).val().length === ' ') {
      $postButton2.attr('disabled', true); // desabilita el boton
      // textArea contiene algo
    } else if ($(this).val().length >= 1) {
      $postButton2.attr('disabled', false); // habilita el boton
    }
  });

  $postButton.on('click', function() {
    var $append = '<div class="row">' +
    '<div class="col s12 align">' +
    '<div class="left"><img  src="_photo_" style="width:50px; height: 50px; border-radius: 50% "></div>' + '<div style="margin-top: 2vh" class="div-name"><h4></h4></div>' + '<br>' +
    '<div class="div-post"><span></span></div>' +
    '<br>' + '<br>' +
    '<div style="width:100%"><a style="color:  rgb(197, 197, 197)" class="a-icon"><i class="material-icons left">favorite</i></a><a style="color:  rgb(197, 197, 197)" class="a-icon"><i class="material-icons left">question_answer</i></a><a style="color: rgb(197, 197, 197)" class="a-icon"><i class="material-icons right">more_horiz</i></span></a></div>' + '<div>' + '</div><textarea class="materialize-textarea" id="textarea-comment"></textarea><button class="btn" id="comment">Post</button></div>' + '</div>' +
    '<div></div>' +
    '<br>';

    var $appendReplace = $append.replace('<span></span>', $textArea.val()).replace('_photo_', localStorage.photo).replace('<h4></h4>', localStorage.name);

    $('#publicaciones').append($appendReplace);
    
    $valueTextTarea = $textArea.val('');

    var $textareaComment = $('#textarea-comment');
    var $textareaComment2 = $('#textarea-comment').val();

    $('#comment').on('click', function() {
      var $appendComment = '<div class=""><i style="font-size: 3em; color: rgb(45, 171, 255)" class="material-icons left">account_circle</i><span style="font-size: 1.2em">Hola</<span></div><div></div>';
  
      var $commentReplace = $appendComment.replace('Hola', $('#textarea-comment').val());
  
      $('#commentDiv').append($commentReplace);

      $textareaComment2 = $('#textarea-comment').val(' ');
    });
  });
});
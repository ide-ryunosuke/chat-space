$(function(){
  function buildSendMessageHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${insertImage}
                  </div>
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildSendMessageHTML(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
      $('input').prop("disabled",false);
    })
    .fail(function(){
      alert('error');
    })
  })

  function buildMESSAGE(new_message){
    var insertImage = '';
    if (new_message.image_url) {
      insertImage = `<img src="${new_message.image_url}">`;
    }
    var html = `<div class="message" data-message_id= ${new_message.id} >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${new_message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${new_message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${new_message.content}
                    </p>
                      ${insertImage}
                  </div>
                </div>`
    $('.messages').append(html)
  }
  setInterval(update, 5000);
  function update(){
    if($('.message')[0]){
      var message_id = $('.message:last').data('message_id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: message_id },
      dataType: 'json'
    })
    .done(function(new_message){
      new_message.messages.forEach(function(autoMessage){
        buildMESSAGE(autoMessage);
      });
    });
  }
});

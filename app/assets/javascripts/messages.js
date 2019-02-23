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
})

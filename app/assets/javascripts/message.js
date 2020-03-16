$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    // messageは仮引数、本引数にはdataが入っている。json.jbuilderで定義した部分をdataとして受け取る
    // message.imageはdata.imageってこと
    // ${}で記述される部分はjson形式でビューを返しているから、キーとバリューの形で値を取り出してきている
    if (message.image) {
      var html =
                `<div class="posts">
                  <div class="post-messages">
                    <div class="post-messages__group-name">
                    ${message.user_name}
                    </div>
                    <div class="post-messages__post-date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="message-text">
                    <p class="message-text__lower">
                    ${message.content}
                    </p>  
                  </div>
                  <img src=${message.image} >
                </div>`//メッセージに画像が含まれる場合のHTMLを作る
      return html;
    } else {
      var html =
                `<div class="posts">
                  <div class="post-messages">
                    <div class="post-messages__group-name">
                    ${message.user_name}
                    </div>
                    <div class="post-messages__post-date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="message-text">
                    <p class="message-text__lower">
                    ${message.content}
                    </p>  
                  </div>
                </div>`//メッセージに画像が含まれない場合のHTMLを作る
    }
    return html
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html)
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.input-submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});
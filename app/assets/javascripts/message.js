$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="posts" data-message-id="${message.id}">
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
                      <img src="${message.image}" class="message-text__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="posts" data-message-id="${message.id}">
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
                  </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="posts" data-message-id="${message.id}">
                    <div class="post-messages">
                      <div class="post-messages__group-name">
                      ${message.user_name}
                      </div>
                      <div class="post-messages__post-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="message-text">
                      <img src="${message.image}" class="message-text__image" >
                    </div>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function(){
     // postsクラスの最後のノードを取得してmessage-idを取得してくる
    var last_message_id = $('.posts:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType:'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages,function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  
  

  
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
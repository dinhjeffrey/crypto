// hides crypto div
$(document).ready(function(){
  $('#crypto').hide(0); 
  
  // blur-background
  $(function() {
    $( ".box" ).draggable();
  });
  });

$('#prelogin').click(function(event) {
  // event.preventDefault(); // prevents page from refreshing



  // properties
  var privateKey = "c5dcf5005ff89226887f8c841fce83a9"
  var seconds = Math.floor(new Date() / 1000)
  var uid = document.forms["myForm"]["username"].value //'abc@abc.com'
  var publicKey = "06f980e1e4442b60676610f2dfb54e6c"
  var ip = "127.0.0.1"

  var message = privateKey+seconds+uid+publicKey
  var signature = CryptoJS.HmacSHA1(message, privateKey).toString()

  $.ajax({
    type: "POST",
    url: 'http://cryptophoto.com/api/get/session',
    data: { 
      publickey: publicKey, 
      uid : uid, 
      time: seconds, 
      signature: signature,
      ip: ip,
      authentication: false
    } ,
    success: function (data) {
      $('#crypto').show()
      var parsedData = data.split(/\n/)
      

      // add sd script (only first time)

      if (parsedData[2] == "false") {
        var script = document.createElement('script')
        script.setAttribute('src', 'https://CryptoPhoto.com/api/token?sd=' + parsedData[1])
        document.head.appendChild(script)
      }
      // add tv script
      // let script2 = document.createElement('script')
      // script2.setAttribute('src', 'https://cryptophoto.com/api/tv?key=66551793516cc975d90c663fe85ecaca&sid=' + parsedData[1])
      // script2.setAttribute('async', 'true')
      // document.head.appendChild(script2)

      // add challenge script
      var script3 = document.createElement('script')
      script3.setAttribute('src', 'https://CryptoPhoto.com/api/challenge?sd=' + parsedData[1])
      document.head.appendChild(script3)

      console.log(data)


    }
  })
})
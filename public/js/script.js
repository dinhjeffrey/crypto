// hides crypto div
$(document).ready(function(){
  $('#crypto').hide(0); 
  
  // blur-background
  $(function() {
    $( ".box" ).draggable();
  });

  // snap scroll
  $(".main").onepage_scroll({
   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
});

  //login
  $("#login,#login1").click(function(e) {
    $(".main").moveTo(3);
  })

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
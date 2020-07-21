var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}

var mobileAgents = ['Android', 'iPhone', 'iPad'];
var agent = navigator.userAgent;
var data = mobileAgents.find(user => agent.includes(user));

function change() {
  var header = document.getElementsByTagName('header')[0];
  header.style.width = '90vw';
  header.style.position = 'relative';

  var section = document.getElementsByTagName('section')[0];
  section.style.width = '90vw';
  section.style.left = '2vw';
  var height = window.innerHeight > window.innerWidth? Math.floor(window.innerHeight/10): Math.floor(window.innerHeight * 0.5);
  section.style.marginTop = `${height}px`;
}

if (data) {
  change();
}
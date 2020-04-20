
// const el = document.getElementById('vanilla-demo');
// console.log(el);
// const vanilla = new Croppie(el, {
//   viewport: { width: 100, height: 100 },
//   boundary: { width: 300, height: 300 },
//   showZoomer: false,
//   enableOrientation: true,
// });
// vanilla.bind({
//   url: '../images/lp/background-img-00.png',
//   orientation: 4,
// });
// // on button click
// vanilla.result('blob').then((blob) => {
//   // do something with cropped blob
//   console.log(blob);
// });

let isUpload = false;

var basic = $('#main-cropper').croppie({
  viewport: { width: 140, height: 140 },
  boundary: { width: 260, height: 260 },
  showZoomer: false,
  url: '../images/dashboard/placeholderUpload.png',
});

function readFile(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#main-cropper').croppie('bind', {
        url: e.target.result,
      });
      if (!isUpload) {
        $('.action-done').toggle();
        $('.action-upload').toggle();
        isUpload = true;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$('.action-upload input').on('change', function () { readFile(this); });
$('#action-new-upload input').on('change', function () { readFile(this); });

// $('.action-done').on('click', function(){
// $('.action-done').toggle();
// $('.action-upload').toggle();
// })
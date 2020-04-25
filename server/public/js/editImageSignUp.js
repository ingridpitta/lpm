let isUpload = false;

const basic = $('#main-cropper').croppie({
  viewport: { width: 140, height: 140 },
  boundary: { width: 260, height: 260 },
  showZoomer: false,
  url: '../images/dashboard/placeholderUpload.png',
});

function readFile(input) {
  if (input.files && input.files[0]) {
    if (!isUpload) {
      $('.action-done').toggle();
      $('#upload').toggle();
      isUpload = true;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      $(basic).croppie('bind', {
        url: e.target.result,
      });
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$('.action-upload input').on('change', function () { readFile(this); });
// $('.btn').on('click', () => {
//   $(basic).croppie('result', {
//     type: 'base64',
//     size: 'viewport',
//   }).then((resp) => {
//     // const image = new Image();
//     // image.src = resp;
//     // document.body.appendChild(image);
//     $('#vai').attr('src', resp);
//   });
// });

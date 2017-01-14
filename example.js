$('#get-data').click(function () {
  $.getJSON('data.json', function (data) {
    $('#show-data').html(data);
  });
});
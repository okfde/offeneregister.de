$(function(){
  $('#search').keyup(function(e){
    if(e.keyCode == 13) {
      $('#searchbutton').click()
    }
    e.preventDefault();
  });
  $('#searchbutton').click(function(e){
    var val = $('#search').val();
    if (!val) {
      return
    }
    var url = 'https://db.offeneregister.de/openregister.json?sql=select+officer.name+as+officer_name%2C+officer.position%2C+company.name+from+officer%0D%0Ajoin+company+on+officer.company_id%3Dcompany.company_number%0D%0Awhere+officer.rowid+in+%28select+rowid+from+officer_fts+where+officer_fts+match+%3Asearch%29+limit+10&search='
    url = url + encodeURIComponent(val)
    $.getJSON(url, function (data) {
      var html = []
      for (var i= 0; i < data.rows.length; i += 1) {
        var row = data.rows[i];
        html.push('<tr>')
        for (var j = 0; j < row.length; j += 1) {
          html.push('<td>' + (row[j] ? row[j] : '') + '</td>')
        }
        html.push('</tr>')
      }
      $('#tablebody').html(html.join(''));
      url = url.replace('.json?sql', '?sql');
      $('#tablelink').attr('href', url).show();
    })
  })
});
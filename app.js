/*
    API
*/
const api_query_url = (query) => {
  return `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`;
};



/*

     JQuery Hooks
    
  
  Note: jquery ui is required after jquery

*/


$("#search-query").autocomplete({

  // use a function as a source
  source: function (request, response) {

    // Autocomplete trigger term
    console.log("Searching " + request.term);

    // Use Jquery to request json
    $.ajax({
      url: api_query_url(request.term),

      success: function (result) {
        // return the array to response
        // console.log(result.query.search);
        var response_array = result.query.search.map(function (e) {
          return { title: e.title, description: e.snippet, link: e.title.replaceAll(" ", "_") };
        });

        // instead of using the jquery
        // response(response_array);

        // We Use the results to add to #results
        clearResults();
        response_array.forEach(e => {
          addResult("https://en.wikipedia.org/wiki/" + e.link, e.title, e.description)
        });
        
      }
    })
  },
});



/*

		Results Controller

*/

function clearResults() {
  // removes all result contents
  $("#results").empty();
}

function addResult(link, title, description) {
  // add a result element
  var result = `<div class="col-10 m-2">
        <div class="card">
          <div class="card-body">
            <a href="${link}" class="text-decoration-none">
              <p class="card-title fw-bold">${title}</p>
            </a>
            <p>
              <a href="${link}" class="text-decoration-none text-success">
                ${link}
              </a>
            </p>
            <p class="card-text text-capitalize">
            	${description}
            </p>
          </div>
        </div>
      </div>`;
  $("#results").append(result);
}


// Clean results when string is ""
$("#search-query").on('input', function(e) {
  if(e.target.value==''){clearResults()};
})

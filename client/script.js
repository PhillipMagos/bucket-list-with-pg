// CRUD - Create, Read, Update, Delete

// Read - when the browser loads
let baseUrl = "http://localhost:3000";

// Read - when the browser loads
$(document).ready(function () {
  let route = "bucket";
  let endpoint = `${baseUrl}/${route}`;
  // 1) use an endpoint
  // 2) get a response
  //    a) if good - parse response
  //    B) if bad, throw an error
  // 3) do something with parsed data
  // 4) handle any errors
  fetch(endpoint)
    .then(function (response) {
      if (!response.ok) {
        throw Error("Issues getting data from server");
      }
      return response.json();
    })
    .then(function (dataArray) {
      $("ul").empty();
      dataArray.forEach(function (bucketItem) {
        // let bucketCompleted = bucketItem.isComplete ? "completed": ""
        $("ul").append(
          `<li data-id=${bucketItem._id} class=${bucketItem.isComplete ? "completed": ""}>
          ${bucketItem.description}
          <span><i class="fa fa-trash-alt"></i></span>
          </li>`
        );
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// $("div").on("click", function(){
//   console.log('I am the div!!!!')
// })

// Update
$("ul").on("click", "li", function () {
  let itemId = $(this).data("id")
  let route = `bucket/${itemId}`
  let endpoint = `${baseUrl}/${route}`
  let that = this
  fetch(endpoint, {
    method: "PUT"
  })
  .then(function(response){
    if(!response.ok){
      throw Error("Issues updating item in server")
    }
    return response.json()
  })
  .then(function(){
    $(that).toggleClass("completed");
  })
  .catch(function(error){
    console.error(error)
  })
});

// Delete
$("ul").on("click", "span", function (event) {
  event.stopPropagation()
  let itemId = $(this).parent().data("id")
  console.log(itemId)
  let route = `bucket/${itemId}`
  let endpoint = `${baseUrl}/${route}`
  let that = this
  fetch(endpoint, {
    method: "DELETE"
  })
  .then(function(response){
    if(!response.ok){
      throw Error("Issues deleting data from server")
    }
    return response.json()
  })
  .then(function(){
    console.log(that)
    $(that).parent().remove();
  })
  .catch(function(err){
    console.error(err)
  })
});

// Create
$("input").keypress(function (event) {
  if (event.which === 13 && $(this).val().trim()) {
    let route = "bucket";
    let endpoint = `${baseUrl}/${route}`;
    let listItem = {
      description: $(this).val(),
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listItem),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error("Issues posting data to the server");
        }
        return response.json();
      })
      .then(function (data) {
        $("ul").append(
          `<li data-id=${data._id}>${data.description}<span><i class="fa fa-trash-alt"></i></span></li>`
        );
        console.log(this)
        $("input").val("");
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
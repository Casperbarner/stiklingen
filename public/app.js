// BLOG CONSTRUCTOR

let Post = function(title, content, image) {
  this.title = title;
  this.content = content;
  this.image = image;
}

// POSTING A BLOG POST RELATED ------------------------------------------------------------------------------------------------

// POST A BLOG METHODS

let postBlog = function(title, content, image) {
  console.log("postBlog runs")

  if (title == "" || title == null) {

    console.log("Empty title!")
  } else if (content == "" || content == null) {

    console.log("Empty content!")

  } else if (image == "" || image == null) {


    console.log("Empty image!")

  } else {

    let post = new Post(title, content, image);
    console.log(post)
    let options = {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post)
    }
    fetch('/postblog', options)
      .then(response => response.json())
      .then(response => {

        console.log(response)
        if (response.status == 'OK') {
          console.log("OK")
        }
        if (response.status == 'NOTOK') {
          console.log("NOT OK")
        }
      })
  }
}

// PREVIEW BLOG CLIENT METHODS
let registerPreviewPostBlog = function() {

  let button = document.getElementById('preview')

  button.addEventListener("click", function(event) {
    event.preventDefault();
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').value
    previewBlog(title, content, image);

  });

}

let previewBlog = function(title, content, image) {
  console.log("previewBlog runs")

  if (title == "" || title == null) {

    console.log("Empty title!")
  } else if (content == "" || content == null) {

    console.log("Empty content!")

  } else if (image == "" || image == null) {

    console.log("Empty image!")

  } else {

    let html = ''

    html += '<div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12 mx-auto ">' +

      ` <h1  class="text-uppercase text-dark text-center"> ${title} </h1>` +
      `<img class=" img-fluid rounded mx-auto d-block border" src="${image}" alt="IMAGE NOT FOUND">` +
      '  <hr>' +
      `<p style="white-space: pre-wrap;" class=""> ${content} </p>` +
      '  <hr>' +
      '</div>'
    document.getElementsByClassName("preview")[0].innerHTML += html;

  }
}


let registerPostBlog = function() {

  let button = document.getElementById('submitBlogPost')

  button.addEventListener("click", function(event) {
    console.log("DEBUGG")
    event.preventDefault();
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').value
    postBlog(title, content, image);
    document.getElementById("blogPostForm").reset();
  });
}



// POSTING A BLOG POST RELATED ENDS ------------------------------------------------------------------------------------------------

// SHOWING POSTS RELATED ------------------------------------------------------------------------------------------------
// SHOW FOCUS POST, THE LATEST POST WHICH SHOULD BE IN FOCUS ON MAIN PAGE
let showFocus = function() {
  let options = {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    }
  } //REWRITE. NOT EFFICIENT TO FETCH ALL POSTS. SHOULD ONLY FETCH THE LATEST
  fetch('/allposts', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      let html = ''
      // SHORTEN MAIN TEXT OF BLOG POST FOR THE OVERVIEW ON MAIN
      if (response[0].content.length > 430) {
        placeholder = response[0].content
        response[0].content = placeholder.substring(0, 429) + '...'
      }

      html +=

        '<div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12 mx-auto ">' +

        ` <a href="/blogposts/${response[0].id}"> <h1  class="text-uppercase text-dark text-center"> ${response[0].title} </h1> </a>` +
        `<p class=""> ${response[0].content} </p>` +
        `<a href="/blogposts/${response[0].id}"> <img class="rounded mx-auto d-block img-fluid border" src="${response[0].image}" alt="Responsive image"> </a> ` +
        '</div>'

      document.getElementsByClassName("focusPost")[0].innerHTML += html;

      if (response.status == 'OK') {
        console.log("OK")
      }
      if (response.status == 'NOTOK') {
        console.log("NOT OK")
      }
    })
}


// FIND ALL POSTS FOR MAIN PAGE
let showAllPosts = function() {
  let options = {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    }
  }
  fetch('/allposts', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)

      for (i = 1; i < response.length; i++) {

        let html = ''
        // SHORTEN MAIN TEXT OF BLOG POST FOR THE OVERVIEW ON MAIN
        if (response[i].content.length > 430) {
          placeholder = response[i].content
          response[i].content = placeholder.substring(0, 429) + '...'
        }

        html +=

          '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto">' +
          `<div onclick="location.href='/blogposts/${response[i].id}';" style="background-color:#eee; cursor:pointer;" class="card rounded">` +
          '  <div class="card-body"> ' +
          ` <h4  class="card-title text-uppercase text-dark text-center"> ${response[i].title} </h4>  ` +
          ` <p class="card-text">${response[i].content} </p>` +
          `  <img class="card-img-bottom img-fluid rounded mx-auto d-block border" src="${response[i].image}" alt="Card image cap"> ` +
          ' </div>' +
          '  </div>' +
          '  </div>'
        document.getElementsByClassName("allPost")[0].innerHTML += html;

      }

      if (response.status == 'OK') {
        console.log("OK")
      }
      if (response.status == 'NOTOK') {
        console.log("NOT OK")
      }
    })
}

// FIND ONE POST

let showOne = function() {
  let url = document.location.href;
  let id = url.split('blogposts/').pop();
  let options = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id: id
    })
  }
  fetch('/onepost', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      let date = response.date;
      let formatted = date.slice(0, 10);
      let html = ''

      html += '<div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12 mx-auto ">' +

        ` <h1  class="text-uppercase text-dark text-center"> ${response.title} </h1>` +
        `<img class=" img-fluid rounded mx-auto d-block border" src="${response.image}" alt="Responsive image">` +


        '  <hr>' +

        `<p style="white-space: pre-wrap;" class=""> ${response.content} </p>` +
        `<p class="card-text font-italic">${formatted} </p>` +
        '  <hr>' +
        '</div>'
      document.getElementsByClassName("onePost")[0].innerHTML += html;

      if (response.status == 'OK') {
        console.log("OK")

      }
      if (response.status == 'NOTOK') {
        console.log("NOT OK")
      }
    })
}

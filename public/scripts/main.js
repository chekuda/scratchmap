const checkSuccess = (response) => {
  if (response.success) {
    window.location.href = 'http://www.google.com';
  }
}

const runLogin = () => {
  document.getElementById('formLogin').addEventListener('submit', function (event) {
    var request,
      data = {};

    event.preventDefault();

    data.name = document.getElementById('userName').value;
    data.password = document.getElementById('password').value;

    request = new XMLHttpRequest();
    request.open('post', '/login');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        checkSuccess(JSON.parse(request.responseText)); // Another callback here
      }
    };
    request.send(JSON.stringify(data));
  })
}

runLogin();

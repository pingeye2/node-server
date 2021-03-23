
/* called when form is submitted */
formSubmit = (url) => {
    let myregex = new RegExp(/^[a-zA-Z0-9 _+-]*$/);
    let emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;
    
    if(!myregex.test(name)){
        alert('name not valid');
        return false;
    }
    
    if(!emailRegex.test(email)) {
        alert('email not valid');
        return false;
    }
    
    if(!myregex.test(subject)){
        alert('name not valid');
        return false;
    }

    if(!myregex.test(message)){
        alert('message not valid');
        return false;
    }


    var data = new Object();
    data.name = name;
    data.email = email;
    data.subject = subject;
    data.message = message;
    console.log("posting->"+ JSON.stringify(data) + " to " + url);
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  
    
    xhr.send(JSON.stringify(data));
  
  return true;
}


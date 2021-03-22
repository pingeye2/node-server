
/* called when form is submitted */
formSubmit = (e) => {

    //form validation
    const validateForm = () => {
    
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

        return true;
    }
    
    if(validateForm()) {

        e.preventDefault();

    let data = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    }

    console.log(data);

    axios.post('http://localhost:3001/',data)
    .then(res=>{
        alert('message sent');
        console.log('message not sent');
    }).catch(()=>{
        alert('message not sent');
        console.log('message not sent');
    })

    }
    
}

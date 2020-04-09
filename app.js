//stackoverflow.com/questions/40537749/how-do-i-make-a-https-post-in-node-js-without-any-third-party-module
//nodejs.org/api/https.html#https_https_request_url_options_callback


const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const https = require('https')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html")
})
app.post('/', function(req, res){
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    
    //this is done from mailchimp website where we got the api key
const data = {
    members : [
        {
        email_address : email,
        status : "subscribed",
        merge_fields : {
            FNAME: firstName,
            LNAMEE: lastName
        }
    }

    ]
}
//url is in code example form of mailchimp website

const jsonData = JSON.stringify(data)
const url = 'https://us19.api.mailchimp.com/3.0/lists/fc31a63d0b' 
const options = {
    method : "POST",
    auth : "vibha :0b9f3468ce9e81dfeed6c5212d8cc53d-us19"
}
const request = https.request(url, options, function(response){
    
       if (response.statusCode === 200){
           res.sendFile(__dirname + '/success.html')
       }else{
           res.sendFile(__dirname + '/failure.html')
       }


       response.on('data', function(data){
        console.log(JSON.parse(data))

    })

})
request.write(jsonData)
request.end()

})
app.post('/failure', function(req, res){
    res.redirect('/')
})


app.listen(4000, function(){
    console.log("Server is running on port 4000")
})



//api key
// e7a9652e687897e130eda446c8b2ee2d-us19
//e7a9652e687897e130eda446c8b2ee2d-us19

//list id
// fc31a63d0b










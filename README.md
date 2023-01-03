# whatsauth : WhatsApp for Authentication

Use WhatsApp for Two-Factor Authentication (2FA) Application Login. Make 2FA easy for user.
1. Copy public folder
2. modif index.html with your style and login form parameter.
3. open whatsauth.js edit backend_url and login_url
4. backend_url : webhook for whatsauth. [Example in php](wauth.php).
5. login_url : open login form and you'll meet action in there

```html
<form id='loginform' name='loginform' method='post' action='besan.depan.php'>"
```

## Develop this repo

Prerequisite :

1. Tailwindcss

Start Develop

```sh
npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch
```

## Backend
Backend called by weebhook file, webhook post json to backend with uuid parameter.
Example :
POST : http://10.14.200.20:3333/whatsauth

```json
{
  "uuid" : "device or browser uuid get from user"
}
```

respon
```json
{
  "user_name" : "user name",
  "user_pass" : "user new random password",
  "login"     : "status",
  "uuid"      : "uuid sent by webhook"
}
```

## Database
Mongodb with ttl used in whatsauth, dbname whatsauth, collection requests. set index ttl in createdat

```json
whatsauth.requests.createIndex( { "createdat": 1 }, { expireAfterSeconds: 30 } )
```

## PHP Implementation

Create webhook for whatsauth, PHP example code in [wauth.php](wauth.php). 

## Using cloud backend
You might use mongodb atlas.
POST : 
https://ap-southeast-1.aws.data.mongodb-api.com/app/whatsauth-ghzng/endpoint/whatsauth

```json
{
  "api-key" : "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN",
  "uuid" : "e1abd82b-5d0a-43a2-8056-f642a99e94fa"
} 
``` 
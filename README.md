# whatsauth : WhatsApp for Authentication

Use WhatsApp for Two-Factor Authentication (2FA) Application Login. Make 2FA easy for user.

## Develop

Prerequisite :

1. Tailwindcss

Start Develop

```sh
npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch
```


## Testing backend

POST : 
https://ap-southeast-1.aws.data.mongodb-api.com/app/whatsauth-ghzng/endpoint/whatsauth

```json
{
  "api-key" : "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN",
  "uuid" : "e1abd82b-5d0a-43a2-8056-f642a99e94fa"
} 
```
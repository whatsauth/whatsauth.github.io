# whatsauth : WhatsApp for Authentication

Use WhatsApp for Two-Factor Authentication (2FA) Application Login. Make 2FA easy for user.
1. Copy public folder
2. modif index.html with your style and login form parameter.

```html
<form id='loginform' name='loginform' method='post' action='besan.depan.php'>"
```

3. open whatsauth.js edit auth_ws, use base64 encode before.
4. Setup and run websocket server.

## WebSocket server
WebSocket open by whatsauth.js in client browser. Starting to send UUID message and listening for authentication parameter.

```json
{
  "user_name" : "user name",
  "user_pass" : "user new random password",
  "login"     : "status",
  "uuid"      : "uuid sent by webhook"
}
```

Example of golang websocket implementation:

```go
package controller

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/whatsauth/whatsauth"
	"auth-service/config"
	"gitlab.com/informatics-research-center/auth-service/model"
)

func WsWhatsAuthQR(c *gin.Context) {
	whatsauth.ServeWs(c.Writer, c.Request)
}

func PostWhatsAuthMessage(c *gin.Context) {
	var ws model.WhatsauthStatus
	if c.Request.Host == config.Internalhost {
		var m model.WhatsauthMessage
		c.BindJSON(&m)
		msg := m.Message
		b, err := json.Marshal(msg)
		if err != nil {
			fmt.Printf("Error: %s", err)
			return
		}
		ws.Status = strconv.FormatBool(whatsauth.SendMessageTo(m.Id, string(b)))
	} else {
		ws.Status = c.Request.Host
	}
	c.JSON(200, ws)

}

```


## Develop css with tailwindcss
Optionally You might want to develop css style using tailwindcss. Start Developing tailwindcss by run

```sh
npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch
```

## Database
Optionally you may use Mongodb with ttl used in whatsauth, dbname whatsauth, collection requests. set index ttl in createdat

```json
whatsauth.requests.createIndex( { "createdat": 1 }, { expireAfterSeconds: 30 } )
```

## Using cloud backend
Optionall you might use mongodb atlas.
POST : 
https://ap-southeast-1.aws.data.mongodb-api.com/app/whatsauth-ghzng/endpoint/whatsauth

```json
{
  "api-key" : "BKH4OMazPlAKjMWQnUvxqmHwdWR06lTLTnB7PwuVM6wSKwZGAxrYB1limn2fy4aN",
  "uuid" : "e1abd82b-5d0a-43a2-8056-f642a99e94fa"
} 
``` 

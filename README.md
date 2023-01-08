# whatsauth : WhatsApp for Authentication



Use WhatsApp for Two-Factor Authentication (2FA) Application Login. Make 2FA easy for user.
1. Copy whatsauth.js and qrjs2.js to your asset public static folder. In this example : assets/whatsauth folder.
2. add this div and p tag into your login page.

```html
<div id="whatsauthqr"><div></div></div>
<p id="whatsauthcounter">hi</p>


<script src="assets/whatsauth/qrjs2.js"></script>
<script src="assets/whatsauth/whatsauth.js"></script>

```

3. open whatsauth.js edit this parameter based on your apps login form tag
```js
const id_user = 'user_name'; 
const id_pass = 'user_pass';
const id_form = 'loginform';
const id_button = 'login';
```
4. for auth_ws use base64 encode before.
```js
const auth_ws = 'd3NzOi8vYXV0aC51bGJpLmFjLmlkL3dzL3doYXRzYXV0aC9xcg==';
```
5. Setup and run websocket server.

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
	"auth-service/model"
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

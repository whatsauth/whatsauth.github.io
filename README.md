# whatsauth : WhatsApp for Authentication

Implementing Simple Authentication Single Sign On using Whatsapp

## Frontend 

Follow this [readme section](https://github.com/whatsauth/wauthjs)

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

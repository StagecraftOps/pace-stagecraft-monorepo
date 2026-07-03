package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "ip-geolocation-service"})
	})
	r.GET("/api/v1", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"service": "ip-geolocation-service", "version": "1.0.0", "description": "IP address to location"})
	})
	port := os.Getenv("PORT")
	if port == "" { port = "8080" }
	fmt.Printf("ip-geolocation-service running on port %s\n", port)
	r.Run(":" + port)
}

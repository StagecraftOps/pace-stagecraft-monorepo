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
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "pixel-service"})
	})
	r.GET("/api/v1", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"service": "pixel-service", "version": "1.0.0", "description": "Tracking pixel server"})
	})
	port := os.Getenv("PORT")
	if port == "" { port = "8080" }
	fmt.Printf("pixel-service running on port %s\n", port)
	r.Run(":" + port)
}

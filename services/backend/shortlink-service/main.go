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
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "shortlink-service"})
	})
	r.GET("/api/v1", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"service": "shortlink-service", "version": "1.0.0", "description": "Short URL generation"})
	})
	port := os.Getenv("PORT")
	if port == "" { port = "8080" }
	fmt.Printf("shortlink-service running on port %s\n", port)
	r.Run(":" + port)
}

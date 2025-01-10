package main

import (
    "fmt"
    "net/http"
    "patterns.mkbrechtel.dev/content"
)

func main() {
    mux := http.NewServeMux()
    fileServer := http.FileServer(http.FS(content.ContentFiles))
    mux.Handle("/", fileServer)

    fmt.Println("Starting server on :8080")
    err := http.ListenAndServe(":8080", mux)
    if err != nil {
        fmt.Printf("Server error: %v\n", err)
    }
}

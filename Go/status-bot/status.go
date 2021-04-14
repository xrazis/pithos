package main

import (
	"net/http"
)

func linkService(links []string) []string {
	var status []string

	c := make(chan string)

	for _, link := range links {
		go checkLink(link, c)
	}

	for i := 0; i < len(links); i++ {
		status = append(status, <-c)
	}

	return status
}

func checkLink(link string, c chan string) {
	_, err := http.Get(link)
	if err != nil {
		status := link + " might be down!"
		c <- status
		return
	}

	status := link + " is up!"
	c <- status
}

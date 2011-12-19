package jokkmokkmobile

import (
	"appengine"
	"appengine/urlfetch"
	"http"
	"io"
)

const (
	TROMSO_URL = "http://polaris.nipr.ac.jp/~acaurora/aurora/Tromso/html/wrap.php?html=main.html"
)

func init() {
	http.HandleFunc("/register", register)
	http.HandleFunc("/tromso", tromso)
	http.Handle("/", http.RedirectHandler("http://78762.de/jokkmokkmobile", 301))
}

func register(w http.ResponseWriter, r *http.Request) {
}

func tromso(w http.ResponseWriter, r *http.Request) {
	forward(w, r, TROMSO_URL)
}

func forward(w http.ResponseWriter, r *http.Request, url string) {
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "text/html")

	c := appengine.NewContext(r)
	client := urlfetch.Client(c)
	resp, e := client.Get(url);
	if e != nil {
		http.Error(w, "Could not get Tromso data", 500)
		return
	}

	io.Copy(w, resp.Body)

}

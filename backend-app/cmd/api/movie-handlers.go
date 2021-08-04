// cmd/api/movie-handlers.go
package main

import (
	"backend/models"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	// urlからidを抜きだす
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	app.logger.Println("id is", id)

	// 仮のデータ
	movie := models.Movie{
		ID:          id,
		Title:       "Some movie",
		Description: "Some description",
		Year:        2021,
		ReleaseDate: time.Date(2021, 01, 01, 01, 0, 0, 0, time.Local),
		Runtime:     100,
		Rating:      5,
		MPAARating:  "PG-13",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	err = app.writeJSON(w, http.StatusOK, movie, "movie")
}

func (app *application) getAllMovie(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{1, "movie1", "movie1", 2021, time.Date(2021, 01, 01, 01, 0, 0, 0, time.Local),
			100, 5, "PG-13", time.Now(), time.Now(), []models.MovieGenre{}},
		{2, "movie2", "movie2", 2021, time.Date(2021, 01, 01, 01, 0, 0, 0, time.Local),
			100, 5, "PG-13", time.Now(), time.Now(), []models.MovieGenre{}},
		{3, "movie3", "movie3", 2021, time.Date(2021, 01, 01, 01, 0, 0, 0, time.Local),
			100, 5, "PG-13", time.Now(), time.Now(), []models.MovieGenre{}},
	}

	app.writeJSON(w, http.StatusOK, movies, "movie")
}

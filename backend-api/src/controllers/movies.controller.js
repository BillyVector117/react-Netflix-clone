import Movie from "../models/Movie"

// CREATE ONE
export const newMovie = async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const saveMovie = await newMovie.save()
            res.status(201).json(saveMovie);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}
// UPDATE movie
export const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(201).json(updateMovie);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}
// DELETE movie
export const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(201).json("Movie removed!");
        } catch (error) {
            res.status(403).json(error)
        }
    }
}
// GET movie
export const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(201).json(movie);
    } catch (error) {
        res.status(403).json(error)
    }
}
// GET random movie / serie
export const getRandomMovieOrSerie = async (req, res) => {
    const type = req.query.type;
    // Ex: /random?type=series
    let movie;
    try {
        if (type === "series") {
            // Get a sample of random serie
            movie = await Movie.aggregate([
                { $match: { inSeries: true } }, // Search all documents with 'isSeries: true' property in Movie collection 
                { $sample: { size: 1 } }, // Return 1 doc. as example
            ]);
        } else {
            // In case req.query is empty
            movie = await Movie.aggregate([
                { $match: { inSeries: false } }, // Search for 'isSeries: false' documents property in Movie collection 
                { $sample: { size: 1 } }, // Return 1 doc. as example
            ]);
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(403).json(error)
    }
}
// GET ALL moviee
export const getAllMovies = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(201).json(movies.reverse());
        } catch (error) {
            res.status(403).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}

import List from "../models/List"

// CREATE list
export const createList = async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const saveList = await newList.save();
            res.status(201).json(saveList);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}
// DELETE list
export const deleteList = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json('List successfully removed!');
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}
// UPDATE list
export const updateList = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(201).json(updatedList);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Action not allowed")
    }
}
// GET ALL list
export const getAllLists = async (req, res) => {
    // Ex: http://localhost:5000/lists/?type=serie&genre=Horror
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = []
    try {
        if (typeQuery) {
            // User clicked series / movies section
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } } // 'type' & 'genre' are List properties
                ])
            } else {
                // User is at series / movies homepage
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            // User is in Homepage
            list = await List.aggregate([
                { $sample: { size: 10 } }
            ])
        }
        res.status(200).json(list)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

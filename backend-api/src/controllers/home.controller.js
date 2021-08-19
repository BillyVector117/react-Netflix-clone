export const home = async (req, res) => {
    try {
        console.log("OK 201")
        res.status(201).json({ status: "ok" })
    } catch (error) {
        res.status(500).json(error)
    }
}
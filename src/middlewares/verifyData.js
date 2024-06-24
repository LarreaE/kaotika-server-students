


const verify = async (req, res, next) => {

    const { body } = req;
    if (
        !body.name ||
        !body.mode ||
        !body.equipment 
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment'",
            },
        });
        return;
    }

    next();


};



module.exports = { verify };
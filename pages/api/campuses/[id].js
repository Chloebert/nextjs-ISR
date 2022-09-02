import {
    removeCampus,
    getCampus,
    updateCampus,
    NotFoundError,
    InvalidInputError
} from "../../../models/campus";

async function getCampusById(req, res) {
    try {
        const campus = await getCampus([req.query.id]);
        return res.json(campus)
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).end(error.message);
        }
    }
}

async function updateCampusById(req, res) {
    try {
        return res.json(await updateCampus(req.query.id, req.body));
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).end(error.message);
        } else if (error instanceof InvalidInputError) {
            res.status(422).end(error.message);
        }
    }
}

async function deleteCampusById(req, res) {
    try {
        await removeCampus(req.query.id);
        res.status(204).end();
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).end(error.message);
        }
    }
}

export default async function handleCampusRequest(req, res) {
    if (req.method === "GET") getCampusById(req, res);
    else if (req.method === "PATCH") updateCampusById(req, res);
    else if (req.method === "DELETE") deleteCampusById(req, res);
}
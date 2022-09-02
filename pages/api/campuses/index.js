import {
    getCampuses,
    createCampus,
    InvalidInputError,
} from "../../../models/campus";

async function getAllCampuses(req, res) {
    const [campuses, total] = await getCampuses(req.query.limit, req.query.offset);
    res.setHeader("x-total-count", total.count);
    return res.json(campuses);
}

async function postCampus(req, res) {
    try {
        const newCampus = await createCampus({ name: req.body.name });
        res.json(newCampus);
    } catch (error) {
        if (error instanceof InvalidInputError) {
            res.status(422).end(error.message);
        }
    }
}

export default async function handleCampusListRequest(req, res) {
    if (req.method === "GET") getAllCampuses(req, res);
    else if (req.method === "POST") postCampus(req, res);
}
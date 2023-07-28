const shortid = require('shortid');
const URL = require('../models/url');

const handleGenerateNewShortURL = async(req, res) => {
    try {
        const body = req.body;
        const shortId = shortid();
        if(!body.url) {
            return res.status(400).json({
                error: "Url is required",
            })
        }
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitedHistory: [],
        });
        return res.status(200).json({
            success: true,
            message: "url created successfully",
            shortId
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const fetchRedirectURL = async(req, res) => {
    try{
        const shortId = req.params.shortId;
        const result = await URL.findOneAndUpdate({shortId}, {
            $push:{
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }, {require: true});
        res.redirect(result.redirectURL);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const getTotalVisit = async(req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({shortId});
        const visit = result.visitHistory.length;
        return res.json({visit});
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    handleGenerateNewShortURL,
    fetchRedirectURL,
    getTotalVisit
}
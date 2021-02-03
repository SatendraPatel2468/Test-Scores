const ejs = require("ejs");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const score = mongoose.model("score");

router.get("/addScore", (req, res) => {
    res.render("addScore", { valueText: "Insert details" });
});

router.post("/addScore", (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var Score = new score();
    Score.name = req.body.name;
    Score.email = req.body.email;
    Score.firstTest = req.body.firstTest;
    Score.secondTest = req.body.secondTest;
    Score.thirdTest = req.body.thirdTest;
    Score.save((err, doc) => {
        if (!err) res.redirect("/result");
        else {
            console.log("Error during record insertion" + err);
        }
    });
}

router.get("/result", async (req, res) => {
    try {
        const studentResult = await score.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    firstTest: 1,
                    secondTest: 1,
                    thirdTest: 1,
                    avg: {
                        $round: [{ $avg: ["$firstTest", "$secondTest", "$thirdTest"] }, 2],
                    },
                },
            },
        ]);
        const firstTestResult = await score.aggregate([
            {
                $sort: {
                    firstTest: -1,
                },
            },
            {
                $group: {
                    _id: "all",
                    firstTestHighest: { $max: "$firstTest" },
                    firstTestAvg: { $avg: "$firstTest" },
                    name: { $first: "$name" },
                },
            },
        ]);
        const secondTestResult = await score.aggregate([
            {
                $sort: {
                    secondTest: -1,
                },
            },
            {
                $group: {
                    _id: "all",
                    secondTestHighest: { $max: "$secondTest" },
                    secondTestAvg: { $avg: "$secondTest" },
                    name: { $first: "$name" },
                },
            },
        ]);
        const thirdTestResult = await score.aggregate([
            {
                $sort: {
                    thirdTest: -1,
                },
            },
            {
                $group: {
                    _id: "all",
                    thirdTestHighest: { $max: "$thirdTest" },
                    thirdTestAvg: { $avg: "$thirdTest" },
                    name: { $first: "$name" },
                },
            },
        ]);
        res.render("result", {
            list: studentResult,
            firstTestResult: (firstTestResult.length) ? firstTestResult[0] : {},
            secondTestResult: (secondTestResult.length) ? secondTestResult[0] : {},
            thirdTestResult: (thirdTestResult.length) ? thirdTestResult[0] : {},
        });
    } catch (error) { }
    //   score.find((err, docs) => {
    //     if (!err) {
    //       res.render("result", {
    //         list: docs,
    //       });
    //     } else {
    //       console.log("Error in Scores List :" + err);
    //     }
    //   });
});

router.get("/addScore", (req, res) => {
    score.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("addEdit", {
                viewTitle: "Update score",
                Score: doc,
            });
        }
    });
});

module.exports = router;


var db = require('../models');
var io = {};
var thisRoom = ''
const { joinUser, removeUser, findUser } = require('./Rooms');
module.exports = (server) => {
    io = require('socket.io')(server)

    io.on("connection", function (socket) {
        try {
            socket.on("join room", async (data) => {
                let newUser = joinUser(socket.id, data.userName, data.roomName);
                io.emit("connected", newUser.roomName)
                thisRoom = newUser.roomName;

                try {
                    socket.join(data);
                }
                catch (error) {
                }
            })
        }
        catch (err) {
        }
        socket.on("question", async (data) => {
            let question1;
            let question2;
            let question3;
            if (data.catId1) {
                question1 = await db.roundOneQuestionModel.findAll({
                    where: {// [1,2,3] 
                        categoryId: data.catId1
                    },
                    order: sequelize.literal('rand()'), limit: 1
                })
            }
            io.to(thisRoom).emit("question2", question1);

            setTimeout(question1.time * 1000, function () {
                if (data.catId2) {
                    db.roundTwoQuestionModel.findAll({
                        where: {// [1,2,3] 
                            categoryId: data.catId2
                        },
                        order: sequelize.literal('rand()'), limit: 1
                    }).then(data => {
                        question2 = data
                    })
                }
                io.to(thisRoom).emit("question2", question2);
            });
            setTimeout(question2.time * 1000, function () {
                if (data.catId3) {
                    db.roundThirdQuestionModel.findAll({
                        where: {// [1,2,3] 
                            categoryId: data.catId3
                        },
                        order: sequelize.literal('rand()'), limit: 1
                    }).then(data => {
                        question3 = data
                    })
                }
                io.to(thisRoom).emit("question3", question3);
            })

        });

        socket.on("question2", (user) => {
            io.to(thisRoom).emit("typing", { userName: user });
        });
        socket.on("createTranscation", async (transcation) => {
            const transactionExits = await db.transactionModel.findAndCountAll({
                where: {
                    userId: transcation.userId,
                    questionId: transcation.questionId,
                    userSetId: transcation.userSetId,
                }
            })
            if (transactionExits) {
                if (transactionExits.count === 6) {
                    await db.userSetModel.create({
                        userSet: transactionExits.count,
                        userId: transcation.userId,
                        startDate: transactionExits.startDate,
                        endDate: transactionExits.endDate,
                        endTime: transcation.endTime,
                        flag: 1,
                        updatedBy: transcation.updatedBy
                    })
                }

            }
            let boundPoint = 0;
            let point = 0;
            if (roundType == "round1") {
                const question1 = await db.roundOneQuestionModel.findOne({ where: { id: transcation.questionId } });
                if (question1.correctAns == transcation.userAns) {
                    let bPoint = question1.time - transcation.qtimeTaken;
                    if (bPoint == 0) {
                        boundPoint = 0
                    }
                    else if (bPoint > 0) {
                        boundPoint = bPoint
                    }
                    point = question1.point;
                    io.to(thisRoom).emit("correct", { userName: user });
                }
                else {
                    boundPoint = 0;
                    point = 0;
                    io.to(thisRoom).emit("wrong", { userName: user });
                }
                const transaction = await db.transactionModel.create({
                    userId: transcation.userId,
                    questionId: transcation.questionId,
                    userSetId: transcation.userSetId,
                    userAns: transcation.userAns,
                    userPoint: point,
                    bouncePoint: boundPoint,
                    userRound: transcation.userRound,
                    qtimeTaken: transcation.qtimeTaken,
                    flag: 1,
                    updatedBy: transcation.updatedBy
                })
            }
            if (roundType == "round2") {
                const question1 = await db.roundTwoQuestionModel.findOne({ where: { id: transcation.questionId } });
                if (question1.correctAns == transcation.userAns) {
                    if (question1.correctAns == transcation.userAns) {
                        let bPoint = question1.time - transcation.qtimeTaken;
                        if (bPoint == 0) {
                            boundPoint = 0
                        }
                        else if (bPoint > 0) {
                            boundPoint = bPoint
                        }
                        point = question1.point;
                        io.to(thisRoom).emit("correct", { userName: user });
                    }
                }
                else {
                    boundPoint = 0;
                    point = 0;
                    io.to(thisRoom).emit("wrong", { userName: user });
                }
                const transaction = await db.transactionModel.create({
                    userId: transcation.userId,
                    questionId: transcation.questionId,
                    userSetId: transcation.userSetId,
                    userAns: transcation.userAns,
                    userPoint: point,
                    bouncePoint: boundPoint,
                    userRound: transcation.userRound,
                    qtimeTaken: transcation.qtimeTaken,
                    flag: 1,
                    updatedBy: transcation.updatedBy
                })

            }
            if (roundType == "round3") {
                const question1 = await db.roundThirdQuestionModel.findOne({ where: { id: transcation.questionId } });
                if (question1.correctAns == transcation.userAns) {
                    if (question1.correctAns == transcation.userAns) {
                        let bPoint = question1.time - transcation.qtimeTaken;
                        if (bPoint == 0) {
                            boundPoint = 0
                        }
                        else if (bPoint > 0) {
                            boundPoint = bPoint
                        }
                        point = question1.point;
                        io.to(thisRoom).emit("correct", { userName: user });
                    }
                }
                else {
                    boundPoint = 0;
                    point = 0;
                    io.to(thisRoom).emit("wrong", { userName: user });
                }
                const transaction = await db.transactionModel.create({
                    userId: transcation.userId,
                    questionId: transcation.questionId,
                    userSetId: transcation.userSetId,
                    userAns: transcation.userAns,
                    userPoint: point,
                    bouncePoint: boundPoint,
                    userRound: transcation.userRound,
                    qtimeTaken: transcation.qtimeTaken,
                    flag: 1,
                    updatedBy: transcation.updatedBy
                })
                if (transaction) {

                }
            }
        });

        socket.on("disconnect", () => {
            const user = removeUser(socket.id);
            // console.log(user, 'hello');
            if (user) {
                console.log(user.userName + ' has left');
            }
            // console.log("disconnected");
        });
    })

}
const axios = require("axios");
const TopPlayer = require("../model/topPlayers");
const csv = require("fast-csv")
const fs = require("fs");

module.exports.saveTopPlayers = async function (req, res) {
	try {
		const apiUrl = "https://lichess.org/api/player/top/200/classical";

		const response = await axios.get(apiUrl);
		const newTopPlayers = response.data.users;

		await TopPlayer.deleteMany({});

		for (const userData of newTopPlayers) {
			const { id, username, perfs } = userData;

			// Extract classical rating and progress
			const { rating, progress } = perfs.classical;

			const user = await TopPlayer.create({
				id,
				username,
				perfs: {
					classical: {
						rating,
						progress,
					},
				},
			});

			// Fetch data from the API
			const ratingHistoryResponse = await axios.get(`https://lichess.org/api/user/${username}/rating-history`);
			const ratingHistory = ratingHistoryResponse.data;

			// Extract and organize data for 'Classical' for the last 30 days
			const currentDate = new Date();
			const thirtyDaysAgo = new Date(currentDate);
			thirtyDaysAgo.setDate(currentDate.getDate() - 60);

			const classicalData = ratingHistory.find((item) => item.name === "Classical");

			if (classicalData) {
				const classicalPoints = classicalData.points
					.filter((item) => {
						const pointDate = new Date(item[0], item[1] - 1, item[2]);
						return pointDate >= thirtyDaysAgo;
					})
					.map((item) => ({
						year: item[0],
						month: item[1],
						day: item[2],
						rating: item[3],
					}));

				// Update the user document with classicalChess data
				await TopPlayer.findOneAndUpdate(
					{ username },
					{ $set: { classicalChess: classicalPoints } },
					{ upsert: true }
				);

				console.log(`Data for user ${username} successfully extracted and stored.`);
			} else {
				console.log(`No Classical data found for user ${username}.`);
			}
		}

		console.log("Data saved to MongoDB successfully!");
		return res.status(200).send({ message: "Top players saved successfully" });
	} catch (error) {
		console.error("Error fetching data or saving to MongoDB:", error.message);
		return res.status(500).send({ message: "Error saving to MongoDB:" });
	}
};

module.exports.getTopFiftyPlayers = async function (req, res) {
	try {
		// Find the top fifty players by classical ratings
		const topFiftyPlayers = await TopPlayer.find({})
			.sort({ "perfs.classical.rating": -1 }) // Sorting by classical ratings in descending order
			.limit(50); // Limiting the result to 50 players

		// Return the result as JSON
		res.status(200).json(topFiftyPlayers);
	} catch (error) {
		console.error("Error fetching top players:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports.getPlayerHistory = async function (req, res) {
	const { username } = req.params;
	console.log(username);

	try {
		const data = await TopPlayer.findOne({ username });

		if (!data) {
			return res.status(404).json({ error: "User not found" });
		}

		console.log(data);
		res.status(200).json({ data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports.downloadCsvFile = async function (req, res) {
	try {
		const players = await TopPlayer.find();

        const csvStream = csv.format({
            headers: true,
        })

        const writableStream = fs.createWriteStream(
            'assets/TopPlayer.csv',
        )

        csvStream.pipe(writableStream);

        writableStream.on("finish", ()=>{
            res.json(
                {
                    downloadUrl: "TopPlayer.csv",
                }
            )
        })

        if(players.length>0){
            csvStream.write(players)
        }

        csvStream.end();
        writableStream.end();


		console.log("Download Successful");
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

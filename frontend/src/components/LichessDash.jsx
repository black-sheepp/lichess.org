import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";

const BASE_URL = "http://localhost:8080";

const LichessDash = ({ userToken, routingHistory, historyData }) => {
	const [topPlayers, setTopPlayers] = useState([]);
	const [loading, setLoading] = useState(false);
	let count = 1;

	async function ratingHistory(username) {
		routingHistory();
		try {
			const response = await fetch(`${BASE_URL}/player/${username}/rating-history`, {
				method: "GET",
				headers: {
					Authorization: userToken,
				},
			});
			const recievedData = await response.json();
			// const { data } = recievedData;
			// historyData(recievedData.data);
			if (recievedData && recievedData.data) {
				historyData(recievedData.data);
				console.log("data**********", recievedData.data);
			}

			console.log("data**********", recievedData.data);
		} catch (error) {
			console.error("Error fetching rating history:", error);
		}
	}

	async function downloadCSVFile() {
		try {
			const response = await fetch(`${BASE_URL}/players/rating-history-csv`, {
				method: "GET",
				headers: {
					Authorization: userToken,
				},
			});
			console.log(response);

			// window.open(`${BASE_URL}/${response.downloadUrl}`, "blank");
			window.open(`http://localhost:8080/TopPlayer.csv`, "blank");
			console.log("CSV File Downloaded");
		} catch (error) {
			console.log(error);
		}
	}

	const fetchTopPlayers = async () => {
		try {
			const response = await fetch(`${BASE_URL}/fetch-leaderboard-top-50`, {
				method: "GET",
				headers: {
					Authorization: userToken,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setTopPlayers(data);
			} else {
				console.error("Failed to fetch top players:", response.status);
			}
		} catch (error) {
			console.error("Error fetching top players:", error.message);
		}
	};

	const updateTopPlayers = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/fetch-leaderboard`, {
				method: "GET",
				headers: {
					Authorization: userToken,
				},
			});

			if (response.ok) {
				fetchTopPlayers();
			}
		} catch (error) {
			console.error("Error fetching top players:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTopPlayers();
	}, []);

	return (
		<div>
			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-8'>
					<div className='flex justify-between'>
						<h2 className='text-3xl text-purple-600 font-semibold leading-tight'>Leaderboard</h2>
						<div className='flex'>
							<button
								onClick={updateTopPlayers}
								type='button'
								className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2'>
								Update Players
							</button>
							<button
								onClick={downloadCSVFile}
								type='button'
								className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2'>
								Download CSV
							</button>
						</div>
					</div>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
						{loading ? (
							<Loader />
						) : (
							<div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
								<table className='min-w-full leading-normal'>
									<thead>
										<tr>
											<th className='px-5 py-3 border-b-2 border-gray-200 bg-[#f72585] text-left text-xs font-semibold text-white uppercase tracking-wider'>
												#
											</th>
											<th className='px-5 py-3 border-b-2 border-gray-200 bg-[#f72585] text-left text-xs font-semibold text-white uppercase tracking-wider'>
												Username
											</th>
											<th className='px-5 py-3 border-b-2 border-gray-200 bg-[#f72585] text-left text-xs font-semibold text-white uppercase tracking-wider'>
												ID
											</th>
											<th className='px-5 py-3 border-b-2 border-gray-200 bg-[#f72585] text-left text-xs font-semibold text-white uppercase tracking-wider'>
												Rating
											</th>
											<th className='px-5 py-3 border-b-2 border-gray-200 bg-[#f72585] text-left text-xs font-semibold text-white uppercase tracking-wider'>
												Progress
											</th>
										</tr>
									</thead>
									<tbody>
										{topPlayers.map((player) => (
											<tr key={player.id}>
												<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm font-bold'>
													{count++}
												</td>
												<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
													<button
														onClick={() => ratingHistory(player.username)} // Pass player.username to routingHistory
														className='hover:text-[#f72585] cursor-pointer'>
														{player.username}
													</button>
												</td>
												<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
													{player.id}
												</td>
												<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
													{player.perfs?.classical?.rating || "-"}
												</td>
												<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
													{player.perfs?.classical?.progress || "-"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LichessDash;

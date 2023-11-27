import React, { useEffect, useState } from "react";

const RatingHistory = (data) => {
	const [rawData, setRawData] = useState([]);

	useEffect(() => {
		if (data && data.data && data.data.classicalChess) {
			setRawData(data.data);
		}
	}, [data]);

	const { id, username, perfs, classicalChess } = rawData;

	return (
		<div className='px-20'>
			<div className='flex justify-between'>
				<h2 className='text-3xl text-purple-600 font-semibold leading-tight my-5'>Rating History</h2>
			</div>
			<div>
				<ul>
					<li>
						<small>ID:</small> <span>{id}</span>
					</li>
					<li>
						<small>Username:</small> <span>{username}</span>
					</li>
					<li>
						<small>Rating:</small> <span>{perfs?.classical?.rating}</span>
					</li>
					<li>
						<small>Progress:</small> <span>{perfs?.classical?.progress}</span>
					</li>
					<li>
						<div className='container mx-auto px-4 sm:px-8'>
							<div className='py-8'>
								<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
									<div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
										<table className='min-w-full leading-normal'>
											<thead>
												<tr>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
														perf
													</th>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
														Rating
													</th>
													<th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
														Timeline
													</th>
												</tr>
											</thead>
											<tbody>
												{classicalChess && classicalChess.map((entry) => (
														<tr key={entry._id}>
															<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
																<p className='text-gray-900 whitespace-no-wrap'>
																	Classcial
																</p>
															</td>
															<td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
																<p className='text-gray-900 whitespace-no-wrap'>
																	{entry.rating}
																</p>
															</td>
															<td className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
																<p className='text-gray-900 whitespace-no-wrap'>
																	{entry.year}-{entry.month}-
																	{entry.day}
																</p>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RatingHistory;

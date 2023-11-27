import { Inter } from "next/font/google";
import Signup from "@/components/Signup";
import Signin from "@/components/Signin";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import LichessDash from "@/components/LichessDash";
import Loader from "@/components/loader/Loader";
import RatingHistory from "@/components/RatingHistory";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = `http://localhost:8080`;
let userToken = "";

export default function Home() {
	const [login, setLogin] = useState(false);
	const [form, setForm] = useState({});
	const [signUp, setSignUp] = useState(false);
	const [loader, setLoader] = useState(false);
	const [routing, setRouting] = useState(false);
	const [historyData, setHistoryData] = useState({});

	const routingHistory = async () => {
		setRouting(!routing);
	};

	const historyDataCall = (data) => {
		setHistoryData(data);
		console.log(historyData)
	};

	const handleForm = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignIn = async (e) => {
		e.preventDefault();
		setLoader(true);
		try {
			const response = await fetch(`${BASE_URL}/sign-in`, {
				method: "POST",
				body: JSON.stringify(form),
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			console.log(data);
			setForm(data);
			setLogin(true);
			localStorage.setItem("user", JSON.stringify(data));
		} catch (error) {
			console.error("Error signing in:", error);
		} finally {
			setLoader(false);
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		setLoader(true);
		try {
			const response = await fetch(`${BASE_URL}/sign-up`, {
				method: "POST",
				body: JSON.stringify(form),
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
			console.log(data);
			setLogin(true);
			setForm(data);
			localStorage.setItem("user", JSON.stringify(data));
		} catch (error) {
			console.error("Error signing up:", error);
		} finally {
			setLoader(false);
		}
	};

	const handleLogOut = async () => {
		await fetch(`${BASE_URL}/logout`, {
			method: "GET",
		});
		localStorage.removeItem("user");
		setLogin(false);
	};

	const handleSignInComponent = () => {
		setSignUp(false);
	};
	const handleSignUpComponent = () => {
		setSignUp(true);
	};

	useEffect(() => {
		const storedData = localStorage.getItem("user");
		const parsedData = JSON.parse(storedData);
		if (storedData) {
			userToken = parsedData.token;
			setLogin(true);
		} else {
			setLogin(false);
		}
	}, [historyData]);

	return (
		<main className={`flex flex-col items-center justify-between ${inter.className}`}>
			<Nav
				login={login}
				handleLogOut={handleLogOut}
				handleSignInComponent={handleSignInComponent}
				handleSignUpComponent={handleSignUpComponent}
			/>
			{loader ? (
				<Loader />
			) : (
				<>
					{login ? (
						<div className='mt-4 w-full px-80'>
							{routing ? (
								<RatingHistory data={historyData} />
							) : (
								<LichessDash
									userToken={userToken}
									routingHistory={routingHistory}
									historyData={historyDataCall}
								/>
							)}
						</div>
					) : (
						<>
							{signUp ? (
								<Signup handleForm={handleForm} handleSubmit={handleSignUp} />
							) : (
								<Signin handleForm={handleForm} handleSubmit={handleSignIn} />
							)}
						</>
					)}
				</>
			)}
		</main>
	);
}

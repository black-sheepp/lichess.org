import React from "react";

const Nav = ({ login, handleLogOut, handleSignInComponent, handleSignUpComponent }) => {
	return (
		<nav className='w-full mt-5'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
				<a href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
					<img
						src='https://images.prismic.io/lichess/5cfd2630-2a8f-4fa9-8f78-04c2d9f0e5fe_lichess-box-1024.png?auto=compress,format'
						className='h-8'
						alt=' Logo'
					/>
					<span className='self-center text-xl whitespace-nowrap'>Lichess.org</span>
				</a>

				<div className='hidden w-full md:block md:w-auto' id='navbar-solid-bg'>
					<ul className='flex flex-col mt-4 rounded-lg md:flex-row md:mt-0 md:border-0 md:bg-transparent'>
						<li>
							{login ? (
								<></>
							) : (
								<a
									href='#'
									onClick={handleSignInComponent}
									className='block py-2 pl-3 pr-4 rounded transparent'
									aria-current='page'>
									Sign In
								</a>
							)}
						</li>
						<li>
							{login ? (
								<a
									href='#'
									onClick={handleLogOut}
									className='block py-2 pl-3 pr-4 text-red-600 font-semibold rounded transparent'
									aria-current='page'>
									Log Out
								</a>
							) : (
								<a
									href='#'
									onClick={handleSignUpComponent}
									className='block py-2 pl-3 pr-4  rounded transparent'
									aria-current='page'>
									Sign Up
								</a>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;

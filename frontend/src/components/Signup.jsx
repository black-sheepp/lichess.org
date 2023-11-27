import React from "react";

const Signup = ({handleForm, handleSubmit}) => {
	return (
		<div className='w-1/3 px-20 py-8 bg-white flex justify-center mt-20 rounded-xl'>
			<form className="w-full" onSubmit={handleSubmit}>
				<div className='mb-6'>
					<label
						htmlFor='name'
						className='block mb-2 text-sm font-medium text-black '>
						Your name
					</label>
					<input
						type='text'
						className=' bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
						placeholder='Shivam K Gupta'
						required=''
                        name="name"
                        onChange={handleForm}
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='email'
						className='block mb-2 text-sm font-medium text-black '>
						Your email
					</label>
					<input
						type='email'
						className=' bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
						placeholder='shivam@gmail.com'
						required=''
                        name="email"
                        onChange={handleForm}
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='password'
						className='block mb-2 text-sm font-medium text-black '>
						Your password
					</label>
					<input
						type='password'
						className=' bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
						required=''
                        name="password"
                        onChange={handleForm}
						placeholder="password"
					/>
				</div>
				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default Signup;

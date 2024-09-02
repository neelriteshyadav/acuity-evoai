/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [timeslots, setTimeslots] = useState([]);
	const [selectedTimeslot, setSelectedTimeslot] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvv, setCvv] = useState('');

	useEffect(() => {
		fetchTimeslots();
	}, []);

	const fetchTimeslots = async () => {
		try {
			const response = await axios.get('/api/timeslots');
			setTimeslots(response.data);
		} catch (error) {
			console.error('Error fetching timeslots:', error);
		}
	};

	const handleBooking = async () => {
		const appointmentData = {
			name,
			email,
			datetime: selectedTimeslot,
			paymentDetails: {
				cardNumber,
				expiryDate,
				cvv,
			},
		};

		try {
			const response = await axios.post('/api/book', appointmentData);
			alert('Appointment booked successfully!');
			// Optional: sendCalendarInvite(response.data);
		} catch (error) {
			console.error('Error booking appointment:', error);
			alert('Failed to book appointment');
		}
	};

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-4'>Book an Appointment</h1>
			<div className='mb-4'>
				<h2 className='text-xl font-semibold'>Available Timeslots</h2>
				{timeslots.length === 0 ? (
					<p>No available timeslots. Please join the waitlist.</p>
				) : (
					<div className='grid grid-cols-1 gap-4'>
						{timeslots.map((slot, index) => (
							<label
								key={index}
								className='flex items-center space-x-2'>
								<input
									type='radio'
									name='timeslot'
									value={slot.datetime}
									onChange={() => setSelectedTimeslot(slot.datetime)}
									className='form-radio'
								/>
								<span>{slot.datetime}</span>
							</label>
						))}
					</div>
				)}
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>Name:</label>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='border p-2 rounded w-full'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>Email:</label>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='border p-2 rounded w-full'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>Credit Card Number:</label>
				<input
					type='text'
					value={cardNumber}
					onChange={(e) => setCardNumber(e.target.value)}
					className='border p-2 rounded w-full'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>Expiry Date:</label>
				<input
					type='text'
					value={expiryDate}
					onChange={(e) => setExpiryDate(e.target.value)}
					className='border p-2 rounded w-full'
				/>
			</div>
			<div className='mb-4'>
				<label className='block mb-2'>CVV:</label>
				<input
					type='text'
					value={cvv}
					onChange={(e) => setCvv(e.target.value)}
					className='border p-2 rounded w-full'
				/>
			</div>
			<button
				onClick={handleBooking}
				className='bg-blue-500 text-white px-4 py-2 rounded'>
				Book Appointment
			</button>
		</div>
	);
}

export default App;

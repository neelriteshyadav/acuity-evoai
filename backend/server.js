/** @format */

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const acuity = axios.create({
	baseURL: 'https://acuityscheduling.com/api/v1',
	auth: {
		username: process.env.ACUITY_API_USER_ID,
		password: process.env.ACUITY_API_KEY,
	},
});

// Endpoint to fetch available timeslots
app.get('/api/timeslots', async (req, res) => {
	try {
		const response = await acuity.get('/availability/timeslots');
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching timeslots:', error);
		res.status(500).send('Failed to fetch timeslots');
	}
});

// Endpoint to book an appointment
app.post('/api/book', async (req, res) => {
	const appointmentData = req.body;
	try {
		const response = await acuity.post('/appointments', appointmentData);
		// Logic to send calendar invites can be added here
		res.json(response.data);
	} catch (error) {
		console.error('Error booking appointment:', error);
		res.status(500).send('Failed to book appointment');
	}
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

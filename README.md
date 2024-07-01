Hodlinfo DashBoard



This project fetches cryptocurrency ticker data from the WazirX API and displays it on a web dashboard.

Table of Contents

	1. Introduction
	2. Features
	3. Setup
	4. Usage
	5. Technologies Used
 
Introduction


	Hodlinfo Dashboard is a Node.js application that retrieves real-time cryptocurrency prices
	 and displays them in a web interface. 
	 It uses PostgreSQL to store the fetched data and Express.js to serve API requests and static files.

Features

	Fetches cryptocurrency ticker data from WazirX API.
	Stores data in a PostgreSQL database.
	Provides a web interface to view current prices and trends.

Setup

	Clone the repository:
	
	bash
	
	Copy code
	
	git clone <repository-url>
	
	cd hodlinfo-dashboard

Install dependencies:

	Copy code
	npm install

Set up PostgreSQL database:

	Create a PostgreSQL database named hodlinfo.
	Update client configuration in fetchData.js with your PostgreSQL credentials.
	Run the application:

sql

	Copy code
	npm start
	This will start the Express server and fetch data from the WazirX API.

Usage

	Access the dashboard by navigating to http://localhost:3000 in your web browser.
	Click on buttons to view different cryptocurrency prices and trading information.

Technologies Used

	Node.js
	Express.js
	PostgreSQL
	Axios


 ScreenShots

 ![Screenshot 2024-06-30 010607](https://github.com/asmeet2003/Api/assets/103807632/f81ced4b-1446-4887-af2f-49795cd32257)

 ![Screenshot 2024-06-30 010716](https://github.com/asmeet2003/Api/assets/103807632/f40205a7-e832-4fa5-8666-203ca4e2f53e)
 ![Screenshot 2024-06-30 010620](https://github.com/asmeet2003/Api/assets/103807632/296bf5ba-f4fc-465f-a9b4-03dd61c49047)



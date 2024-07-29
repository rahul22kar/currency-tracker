# Currency Tracker

Currency Tracker is a web application that tracks the top 100 cryptocurrencies, displaying their details, including rank, price, market cap, and more. Users can also mark their favorite currencies for easy access.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)

## Features

- View a list of the top 100 cryptocurrencies.
- View detailed information about each cryptocurrency.
- Mark currencies as favorite.
- Real-time updates using WebSockets.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahul22kar/currency-tracker.git
   cd currency-tracker  
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

### Currency Listing

- Visit the home page to view the top 100 cryptocurrencies.
- Click on a currency name to view detailed information.

### Currency Details

- View detailed information about the selected cryptocurrency, including its price trend over the last 30 days.
- Mark a currency as a favorite by clicking the star icon.

## Running Tests

End-to-end tests are written using Cypress.

Run the Cypress tests in CLI mode:

```bash
yarn test
```

Run the Cypress tests in interactive mode:

```bash
yarn cypress open
```
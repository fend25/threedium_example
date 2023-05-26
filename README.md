# Threedium Unique NFT Example

This is a simple Node.js TypeScript project that can be executed by running `npm start`. The script requires some dependencies to be installed and also requires a `.env` file with proper environment variable values. To set up the project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (any reasonably recent version)
- npm (any reasonably recent version)

Also, you will need a Polkadot address (and know it's mnemonic 12 word phrase) with some amount of coins on it. You can use [Polkadot JS extension](https://polkadot.js.org/extension/) to generate a new address and [Opal faucet bot](https://t.me/unique2faucet_opal_bot) to get some Opal testnet coins.

### Getting Started

1. Clone the repository:

```shell
git clone git@github.com:fend25/threedium_example.git
```

Navigate to the project directory:

```shell
cd threedium_example
```

Install dependencies:

```shell
npm install
```

Copy the .example.env file and rename it to .env:

```shell
cp .example.env .env
```

Open the .env file and replace the placeholder values with the appropriate environment variable values for your project.

```dotenv
POLKADOT_MNEMONIC=your_mnemonic_here
```

Replace POLKADOT_MNEMONIC with the actual 12 word mnemonic for your Polkadot account.

### Running the Script
To run the TypeScript script, use the following command:

```shell
npm start
```

This will execute the `index.ts` script.

### Additional Notes
Modify the TypeScript script (`index.ts`) to implement your desired functionality.

Please pay attention to the line 86 in the `index.ts` file:

```ts
const network = 'opal'
```

Feel free to play around with the Opal testnet and switch the `network` value to `'unique'` when you are ready to deploy your project to the Unique mainnet.

## Bridge Monitor

### Live demo: https://bridge-monitor.vercel.app/

Note: Bridge Monitor is currently not showing data because my Parsiq actions / month account limit has been reached.

https://user-images.githubusercontent.com/30199031/140842100-a3efd64a-6312-48bd-9d82-c175ef195d8f.mp4

Cross-chain bridges rely on validators with high uptime to read and verify transactions. Outages and downtime can harm both the validator (often only the highest quality validators compete for a limited number of spots) and the health of the bridge.

Bridge Monitor monitors for unusual bridge activity in real-time. It is a real-time dashboard for engineers and staking companies to check for exceptional falls and spikes in bridging activity, enabling a rapid response.

N.B. % changes on previous period will show infinity% on the webapp when first starting the monitor, since there is no data for the previous period.

**Bridges supported:**
- [Optics](https://docs.celo.org/celo-codebase/protocol/optics)
- [Wormhole](https://wormholebridge.com/)

**Stats supported:**

- Total volume
- Transaction count
- [wip] Inflows versus outflows


## Implementation
- Bridge Chain relies on a real-time feed of data from [Parsiq](https://www.parsiq.net/en/)
- Transactions to and from bridges are monitored and caught using ParsiQL scripts
- Parsiq sends the transaction data to an intermediary [Pipedream](https://pipedream.com/) server via webhooks
- The Pipedream server listens for webhook calls. It receives the data, formats it, and then forwards it to a [Fauna database](https://fauna.com/)
- The front-end web app, built on [Next.js](https://nextjs.org/) consumes data from Fauna
- The front-end web app continuously refetches new database records for a real-time experience using the [swr library](https://swr.vercel.app/)

## Setup

### FaunaDB
1. Create a new [Fauna](https://fauna.com/) database (choose classic server location)
2. Under 'security', create a server key for access to the database

### ParsiQL scripts
1. Create a new, empty Parsiq project
2. Add a new trigger for each of the following bridges. Paste the queries below into the Code Editor for each trigger:
- [Optics on Ethereum](https://gist.github.com/karlxlee/d02fcca5a1dceba2d3ed601506b50ea6)
- [Wormhole on Ethereum](https://gist.github.com/karlxlee/c2a0a2a7b75e3fb1fd81659f5972ad23)
3. Click save (no need to deploy yet)

### Pipedream server
1. Add your Fauna server key into Pipedream under the 'Accounts' tab
2. Create a new [Pipedream](https://pipedream.com/) server to listen for webhook data from Parsiq
3. Remove the default 2nd step. Search for a FaunaDB step and add it
4. Paste the following [script](https://gist.github.com/karlxlee/ba6ef62f9fb858c0359d7c6fe9a17507) into the FaunaDB step to write the transaction data to Fauna
5. Copy the Pipedream webhook URL
6. Go back to Parsiq, create a new webhook Transport and paste the url
7. Go to each Parsiq trigger and select the webhook as the Transport channel
8. Deploy the Parsiq triggers

### Bridge Monitor web app

#### Deploy on Vercel

- Before deployment, allow the webapp to access your FaunaDB by using [Vercel's integration](https://vercel.com/integrations/fauna)
- Select the database and Vercel project to connect

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkarlxlee%2Fbridge-monitor)


### Local development
Clone this repo. If you've deployed with Vercel and used Vercel's Fauna integration, then get the environment variables for local development by running `vercel env pull`. Otherwise you may have to create another access key on Fauna, create an env file and add it (as demonstrated in .env.example).

Install modules and then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Phala Cloud Node.js + Express + TypeScript Starter

[![](https://cloud.phala.network/deploy-button.svg)](https://cloud.phala.network/templates/node-starter)

This is a template for developing a Node.js (Typescript) w/ Express app with boilerplate code targeting deployment on [Phala Cloud](https://cloud.phala.network/) and [DStack](https://github.com/dstack-TEE/dstack/). It includes the SDK by default to make integration with TEE features easier. This repo also includes a default Dockerfile and docker-compose.yml for deployment.

## Development

### Requirements
- NVM _(optional but recommended)_
  - [NVM for Mac & Linux](https://github.com/nvm-sh/nvm)
  - [NVM for Windows](https://github.com/coreybutler/nvm-windows)
- [Node](https://nodejs.org/en) version specified in [`.nvmrc`](.nvmrc)
- [Docker](https://www.docker.com/get-started/)
- [Phala CLI](https://www.npmjs.com/package/phala)

### Setup
First, follow these steps to set up your development environment.

Install the Phala CLI globally:
```bash
npm i -g phala
phala help
```

Clone the repository:
```bash
git clone --depth 1 https://github.com/Gldywn/phala-cloud-node-starter.git
cd phala-cloud-node-starter
```

Install dependencies and create your `.env` file from the template:
```bash
npm i
cp env.example .env
```

### DStack simulator
Before running the development server, you need to have an active DStack simulator running.

Start the simulator:
```bash
phala simulator start

# You will get something like this
✓ Setting environment for current process...
✓ DSTACK_SIMULATOR_ENDPOINT=/<user>/.phala-cloud/simulator/0.5.3/dstack.sock
✓ TAPPD_SIMULATOR_ENDPOINT=/<user>/.phala-cloud/simulator/0.5.3/tappd.sock
✓ TEE simulator started successfully
```

⚠️ If this is the first time you are running the simulator, replace the `DSTACK_SIMULATOR_ENDPOINT` variable inside your `.env` file with the one output by the start command.


### Run
Once the simulator is running, you can start your Express development server:
```bash
npm run dev
```

By default, the Express development server will listen on port 3000. Open `http://localhost:3000/get_quote` in your browser to get a quote with `Hello DStack!` as report data.

This repo also includes code snippets for the following common use cases:
- `/`: Returns the TCB Info of the hosted CVM.
- `/get_quote`: The `reportdata` is `Hello DStack!` and generates a quote for an attestation report via the `getQuote` API. You can see the raw text `Hello DStack!` by pasting your `quote` into the [Attestation Explorer](https://proof.t16z.com/).
- `/get_key`: Basic example of the `getKey` API.
- `/ethereum`: Using the `getKey` API to generate a deterministic wallet for Ethereum, a.k.a. a wallet held by the TEE instance.
- `/solana`: Using the `getKey` API to generate a deterministic wallet for Solana, a.k.a. a wallet held by the TEE instance.

## Build & Deployment

### Compose: Limit Docker log size (recommended)

The provided `docker-compose.yml` includes a shared logging config to restrict log growth as recommended [here](https://docs.phala.network/phala-cloud/cvm/deployment-cheat-sheet#performance-optimization).

### Local Docker build

Build a `linux/amd64` image locally via Docker:
```bash
phala docker build --image phala-cloud-node-starter --tag latest
```

### Github Action: Docker build

The workflow [.github/workflows/phala-docker-build.yml](.github/workflows/phala-docker-build.yml) validates the Docker build. It is optional and serves as a helper if you need automated checks. On each PR and push to `main`, it performs a Docker build using `phala docker build`.

### Publish to Docker public registry

Log in to Docker using Phala CLI:
```bash
phala docker login
```

Push your `linux/amd64` image to Docker Hub:
```bash
phala docker push --image <docker-user>/phala-cloud-node-starter:latest
```

### Deploy to Phala Cloud

Deploy a new CVM instance using your Docker Compose file:
```
phala deploy docker-compose.yml

# You will get something like this
CVM created successfully!

CVM ID:    xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Name:      phala-cloud-node-starter # (truncated to 20 chars)
App ID:    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Dashboard URL:  https://cloud.phala.network/dashboard/cvms/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Docs

This repository covers the basics of creating a DStack-powered application and deploying it to Phala Cloud. For more detailed information, please refer to the resources below.

- [DStack](https://docs.phala.network/dstack/getting-started)
- [Phala Cloud](https://docs.phala.network/phala-cloud/getting-started/overview)
- [Phala CLI](https://github.com/Phala-Network/phala-cloud-cli)

## Troubleshooting

This starter requires DStack v0.5 or higher for deployment on Phala Cloud, which is currently running a closed beta for this version. If your deployed CVM is not yet on v0.5, please request beta access on the official [Telegram](https://t.me/+nbhjx1ADG9EyYmI9) or [Discord](https://discord.gg/phala-network).

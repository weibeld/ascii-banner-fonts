# ASCII Banners

A minimalist static web application to showcase and compare FIGlet fonts. This project serves as a comprehensive gallery for ASCII typography, allowing users to preview text across hundreds of different font styles.

## Architecture

This project utilizes a **Full CI-Based Asset Strategy (Model 2)**. To maintain a lean and auditable repository, only human-authored source code and version configurations are tracked in Git. All binary assets (fonts) and generated metadata are treated as ephemeral build artifacts.

### Data Backbone
- **FIGlet Library:** The rendering engine, bundled into the application logic via Vite.
- **Font Collections:** Static `.flf` files served as URL resources on demand.
- **Fonts Manifest:** Automatically generated metadata (`fonts.json`) bundled for zero-latency font discovery.
- **Version Manifest:** The authoritative source of truth (`versions.json`) pinning all external dependency versions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher)
- [NPM](https://www.npmjs.com/)

### Setup & Installation
Because assets are generated on the fly, you must initialise your local environment before running the application:

```bash
# 1. Clone the repository
git clone https://github.com/dw/ascii-banners.git
cd ascii-banners

# 2. Initialise assets and dependencies
npm run setup
```

The `npm run setup` command will install the necessary libraries, acquire the font collections specified in `versions.json`, and generate the fonts manifest.

### Development
Once the setup is complete, start the local development server:

```bash
npm run dev
```

### Build
To compile the production-ready application bundle:

```bash
npm run build
```

The output will be generated in the `dist/` directory, ready for deployment.

## Deployment
This project is automatically built and deployed to **GitHub Pages** via GitHub Actions whenever changes are pushed to the `main` branch.

## License
[MIT](./LICENSE)
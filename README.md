# {skjson} Landing Page

This repository contains the source code for the `{skjson}` and `{skjson-js}` landing page and documentation site. 

It is built with [Next.js (App Router)](https://nextjs.org/), styled with [Tailwind CSS](https://tailwindcss.com/), and uses [Framer Motion](https://www.framer.com/motion/) for animations.

## About the Project

`{skjson}` allows you to train scikit-learn models in Python, export them to a lightweight JSON format, and seamlessly run inferences directly in any JavaScript environment (the browser, Node.js, Edge functions) with `{skjson-js}`. No backend APIs or FastAPI servers required!

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run web
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

- `apps/next/app/page.tsx`: The main landing page.
- `apps/next/app/skjson/page.tsx`: The dedicated page for the Python `{skjson}` package.
- `apps/next/app/skjson-js/page.tsx`: The dedicated page for the JavaScript `{skjson-js}` package.
- `apps/next/components/`: Reusable React components (UI components, Code Blocks, Logo Text).

## Learn More

- [skjson (Python)](https://github.com/hongyaok/skjson)
- [skjson-js (JavaScript)](https://github.com/hongyaok/skjson-js)

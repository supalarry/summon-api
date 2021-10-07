# summon-api

Summon API is used for communication with the Slack API and in future with frontend.

# Overview
1. Written in node.js + typescript
2. Deployed to AWS using Serverless framework
3. Jest for testing
4. Github Actions for running code before merging into branch
5. Github Actions CI / CD to push to AWS if tests succeed
6. Postman collection available
7. Mixpanel for tracking

# Develop locally

Run `yarn dev` to launch lambdas offline.

# Debug locally

For debugging use VS Code editor. Within `.vscode` folder is defined `launch.jso`n file which is debugging configuration. From VS Code Launch the debugger after placing a break point at whatever place you want.

The debugging URL is `http://localhost:4000/dev/` . So if within `serverless.yml` a function has path of `api/ping` , then to trigger debugging endpoint call `http://localhost:4000/dev/api/ping` , and code will stop at wherever you placed break point.

# Testing

First, Jest is used for unit tests and integration tests. To run Jest tests, run `yarn test`.
Add tests to `tests/source` folder. For file to be picked up as a test, add `.test.ts` at the end of file, and furthermore specify if its a unit test or integration test by choosing between `.unit.test.ts` (unit test) or `.int.test.ts` (integration test).

# Deployment

1. Let’s start with deployment. Summon runs in AWS, but it is not manually set up. Instead, we use Serverless framework, which allows us to define our infrastructure once, and then re-create it whenever we want it. To get up and running with Serverless
  a. Install Serveless `npm install -g serverless`
  b. Create user within IAM, and add it to admins group
  c. Within terminal log into serverless with AWS credentials `serverless config credentials --provider aws --key xxxxxxxxx --secret xxxxxxxxxx --profile lauris`
2. Serverless sets up API Gateway which exposes public URL, and then this request ends up at AWS Lambda running our Typescript code.
3. To deploy to AWS, run `yarn deploy-dev` (for development environment) or `yarn deploy-prod` (for production environment). Under the hood yarn runs serverless `deploy -s dev` where `-s` denotes stage to which the code is deployed. We use GitHub actions for CI / CD. Stage 1 is that tests pass, and if they pass then stage 2 is to deploy to AWS - serverless will create AWS Cloudformation files, which define our AWS infrastructure, and store them within S3 bucket. Then, these AWS Cloudformation files are used to launch our infrastructure, like lambdas, api gateways etc. The source that defines our infrastructure before the AWS Cloudformation files, is the serverless.yml file in the root directory.
4. Go to AWS API Gateway within `eu-central-1.console.aws.amazon.com` to see endpoints that are available and their URLs.
5. To see `console.log` or `console.warn` etc. of lambda function, select AWS Lambda service and visit the function which logs you want to see. Select Monitor section, then Logs and finally view logs in CloudWatch.

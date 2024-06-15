import express, { Application, Request, Response } from "express";
import router from "./routes/router";
const cookieParser = require("cookie-parser");
import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use('/docs', express.static(path.join(__dirname, '../public/api-explorer/')));
app.get('/', (_, res) => res.redirect('/docs'));

const apiSpec = path.join(__dirname, '../', 'api.yml');
const validateResponses = !!(
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
);
app.use('/api/spec', express.static(apiSpec));
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses,
    // ignorePaths: /.*\/spec(\/|$)/,
    ignorePaths: (path: string) => path.endsWith('/spec') || path.endsWith('/upload'),
  })
);
router(app);


export default app;

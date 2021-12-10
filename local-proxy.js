/**
 * Created by steve on 5/26/2016.
 */
/* global __dirname */
Error.stackTraceLimit = Infinity;
process.env.DEBUG = 'progulus:*';

'use strict';

// console.log(process.argv);

const debug = require('debug')('progulus:local-proxy');
const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ secure: false, changeOrigin: true });

proxy.on('error', (e) => {
    debug('onError()', e);
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

const proxyAuth = httpProxy.createProxyServer({
    secure: false,
    changeOrigin: true});

proxyAuth.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
// proxyAuth.on('proxyRes', (req, inc, res) => {
//     debug(req)
// })
proxyAuth.on('error', (err, req, res) => {
    debug(res);
    debug(err.message)
})

const proxySitesAuth = httpProxy.createProxyServer({
    secure: false,
    changeOrigin: true
});
proxySitesAuth.on('proxyReq', (proxyReq, req, res, options) => {
    // console.log(options);
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

const app = express();

app.locals.pretty = true;
app.set('json spaces', 2);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
    debug(req.method, req.url);
    next();
});

app.use('/api', (req, res) => {
    proxyAuth.web(req, res, { target: 'https://progulus.com/api' });
});
app.use('/images', (req, res) => {
    proxyAuth.web(req, res, { target: 'https://progulus.com/images' });
});
app.use('/rprweb', (req, res) => {
    proxyAuth.web(req, res, { target: 'https://progulus.com/rprweb' });
});

const server = http.createServer(app);
server.listen(8001, 'localhost');
debug('listening on localhost:' + 8001);

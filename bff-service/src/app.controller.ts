import { All, Controller, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { AxiosRequestConfig } from '@nestjs/common/node_modules/axios';
import { consoleLogger } from './utils/consoleLogger';

const { INTERNAL_SERVER_ERROR, BAD_GATEWAY } = HttpStatus;

interface ICachedProducts {
  iat?: number;
  data?: Object[]
}

const cachedProducts: ICachedProducts = {};

const CACHE_LIFETIME_MS = 120000;

@Controller()
export class AppController {
  constructor() { }

  @All()
  async handler(
    @Req()
    req: Request,
    @Res()
    res: Response
  ): Promise<any> {
    const { method, originalUrl, body } = req;

    consoleLogger({ method, originalUrl, body });

    const urlParts = req.originalUrl.split('/');
    const [, recipient] = urlParts;

    let fixedRequestedURL = req.originalUrl;

    if (urlParts.length >= 3 && recipient === 'cart') fixedRequestedURL = req.originalUrl.replace(`/${recipient}`, '');

    console.log('[recipient]', recipient);

    const recipientURL = process.env[recipient];

    console.log('[recipientURL]', recipientURL);

    if (recipientURL) {
      const axiosConfig = {
        method,
        url: `${recipientURL}${fixedRequestedURL}`,
        ...Object.keys(body || {}).length > 0 && { data: body }
      } as AxiosRequestConfig;

      console.log('[axiosConfig]', axiosConfig);
      try {
        const response = await axios(axiosConfig);
        console.log('[response from recipient]', response.data);

        if ((req.originalUrl === '/products' || req.originalUrl === '/products/') && req.method === 'GET') {
          const currTS = Date.now();
          if (!cachedProducts.iat || (currTS - cachedProducts.iat) > CACHE_LIFETIME_MS) {
            cachedProducts.iat = currTS;
            cachedProducts.data = response.data;
            console.log('Cache is updated, send fresh data');
            return res.json(response.data);
          } else {
            console.log('Send data from cache');
            return res.json(cachedProducts.data);
          }
        }

        res.json(response.data);

      } catch (e) {
        if (e.response) {
          const { status, data } = e.response;
          res.status(status).json(data);
        } else {
          res.status(INTERNAL_SERVER_ERROR).json({ error: e.message });
        }
      }

    } else {
      res.status(BAD_GATEWAY).json({ message: 'Cannot process request' });
    }
  }
}

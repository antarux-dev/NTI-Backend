import { Request, Response } from 'express';
import { messageResponses } from './health.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';
import { prisma } from '@/database/prisma.js';

type Service = {
  name: string,
  check: () => Promise<unknown>,
};
type State = 'up' | 'down';
type ServiceStates = Record<string, State>;

const availableServices: Service[] = [
  {
    name: 'db',
    check: () => prisma.$queryRaw`SELECT 1`,
  },
  {
    name: 'test',
    check: () => new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        resolve(true);
        reject();
      } else {
        reject();
      }
    }),
  }
];

async function getServiceState(check: () => Promise<unknown>): Promise<State> {
  try {
    await check();
    return 'up';
  } catch {
    return 'down';
  }
}

async function getServicesStates(services: Service[]): Promise<ServiceStates> {
  const serviceStates: ServiceStates = {}

  const serviceResults = await Promise.all(
    services.map(async (service) => {
      const state = await getServiceState(service.check);
      return {
        name: service.name,
        state
      }
    })
  ); 

  serviceResults.map((result) => {
    serviceStates[result.name] = result.state;
  })

  return serviceStates
}

export const getAppHealth = async(req: Request, res: Response) => {
  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  const services = await getServicesStates(availableServices);

  sendApiResponse(res, {
    status: HTTP_STATUS.OK,
    success: true,
    message: message,
    data: {
      services,
      uptime: process.uptime(),
    },
  });
};

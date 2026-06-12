import { Request, Response } from 'express';
import { messageResponses } from './health.model.js';
import { sendApiResponse } from '@utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';
import { prisma } from '@/database/prisma.js';

type Service = {
  name: string;
  check: () => Promise<unknown>;
};
type State = 'up' | 'down';
type ServiceStates = Record<string, State>;

const availableServices: Service[] = [
  { name: 'db', check: () => prisma.$queryRaw`SELECT 1` },
  // { name: 'test', check: () => Promise.reject(new Error('Test service is down')) }, // Len test, nechat zakomentovane!
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
  const serviceStates: ServiceStates = {};

  const serviceResults = await Promise.all(
    services.map(async (service) => {
      const state = await getServiceState(service.check);
      return {
        name: service.name,
        state,
      };
    })
  );

  serviceResults.map((result) => {
    serviceStates[result.name] = result.state;
  });

  return serviceStates;
}

function resolveAppHttpStatus(serviceStates: ServiceStates): { status: number; success: boolean } {
  const states = Object.values(serviceStates);
  const totalServices = states.length;
  const healthyServices = states.filter((s) => s === 'up').length;

  if (healthyServices === totalServices) {
    return {
      status: HTTP_STATUS.OK,
      success: true,
    };
  }

  if (healthyServices > 0) {
    return {
      status: HTTP_STATUS.FAILED_DEPENDENCY,
      success: false,
    };
  }

  return {
    status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    success: false,
  };
}

export const getAppHealth = async (req: Request, res: Response) => {
  const message = messageResponses[Math.floor(Math.random() * messageResponses.length)];
  const services = await getServicesStates(availableServices);
  const { status, success } = resolveAppHttpStatus(services);

  sendApiResponse(res, {
    status: status,
    success: success,
    message: message,
    data: {
      services,
      uptime: process.uptime(),
    },
  });
};

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response } from 'express';
import { getAppHealth } from './health.controller.js';
import { messageResponses } from './health.model.js';
import { sendApiResponse } from '@/utils/apiResponse.js';
import { HTTP_STATUS } from '@config/httpStatus.js';

vi.mock('@/database/prisma.js', () => ({
  prisma: {
    $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
  },
}));

vi.mock('@utils/apiResponse.js', () => ({
  sendApiResponse: vi.fn(),
}));

describe('Health Controller API', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.6);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return valid health response with services and uptime', async () => {
    const fakeRequest = {} as Request;
    const fakeResponse = {} as Response;

    await getAppHealth(fakeRequest, fakeResponse);

    expect(sendApiResponse).toHaveBeenCalledTimes(1);

    const mockCalls = vi.mocked(sendApiResponse).mock.calls;
    const apiResponseCall = mockCalls[0];

    const responseObject = apiResponseCall[0];
    const payload = apiResponseCall[1];

    expect(responseObject).toBe(fakeResponse);

    expect(payload).toEqual({
      status: HTTP_STATUS.OK,
      success: true,
      message: expect.any(String),
      data: {
        services: {
          db: 'up',
        },
        uptime: expect.any(Number),
      },
    });

    expect(messageResponses).toContain(payload.message);
  });
});

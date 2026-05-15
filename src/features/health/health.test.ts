import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import { healthCheck } from './health.controller.js';
import { messageResponses } from './health.model.js';
import { sendApiResponse } from '@/utils/apiResponse.js';

vi.mock('@utils/apiResponse.js', () => ({
  sendApiResponse: vi.fn(),
}));

describe('Health Controller API', () => {
  it('It should return valid message response', () => {
    const fakeRequest = {} as Request;
    const fakeResponse = {} as Response;

    healthCheck(fakeRequest, fakeResponse);

    expect(sendApiResponse).toHaveBeenCalledTimes(1);

    const mockCalls = vi.mocked(sendApiResponse).mock.calls;
    const apiResponseCall = mockCalls[0];

    const responseObject = apiResponseCall[0];
    const payload = apiResponseCall[1];

    expect(responseObject).toBe(fakeResponse);

    expect(payload).toEqual({
      status: expect.any(Number),
      success: true,
      message: expect.any(String),
    });

    expect(messageResponses).toContain(payload.message);
  });
});

import { Router, Request, Response } from 'express';

const router = Router();
const responses = [
  'This is the way.',
  'One does not simply GET this route. - dad joke prob (╯°□°)╯︵ ┻━┻',
  'Hello there. GENERAL KENOBI!',
  'The Force is strong with this Request.',
  'Ashley... Look at me. LOOK AT ME!',
  'The Multiverse of Mid Responses',
];

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: responses[Math.floor(Math.random() * responses.length)],
  });
});

export default router;

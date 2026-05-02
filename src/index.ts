import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `These aren't the endpoints you're looking for.`,
  });
});

app.listen(PORT, () => {
  console.log('Server suprisingly successfully started ?!');
});
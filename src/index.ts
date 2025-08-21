import express, { type Request, type Response } from 'express';
import { DstackClient } from '@phala/dstack-sdk';
import { toViemAccountSecure } from '@phala/dstack-sdk/viem';
import { toKeypairSecure } from '@phala/dstack-sdk/solana';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/', async (_req: Request, res: Response) => {
  try {
    const client = new DstackClient();
    const result = await client.info();
    res.json(result);
  } catch (error) {
    console.error('Error while handling /', error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.get('/get_quote', async (_req: Request, res: Response) => {
  try {
    const client = new DstackClient();
    const result = await client.getQuote('Hello DStack!');
    res.json(result);
  } catch (error) {
    console.error('Error while handling /get_quote', error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.get('/get_key', async (_req: Request, res: Response) => {
  try {
    const client = new DstackClient();
    const result = await client.getKey('test');
    res.json(result);
  } catch (error) {
    console.error('Error while handling /get_key', error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.get('/ethereum', async (_req: Request, res: Response) => {
  try {
    const client = new DstackClient();
    const result = await client.getKey('ethereum');
    const viemAccount = toViemAccountSecure(result);
    res.json({ address: viemAccount.address });
  } catch (error) {
    console.error('Error while handling /ethereum', error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.get('/solana', async (_req: Request, res: Response) => {
  try {
    const client = new DstackClient();
    const result = await client.getKey('solana');
    const solanaAccount = toKeypairSecure(result);
    res.json({ address: solanaAccount.publicKey.toBase58() });
  } catch (error) {
    console.error('Error while handling /solana', error);
    res.status(500).json({ error: 'internal error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port`, port);
});

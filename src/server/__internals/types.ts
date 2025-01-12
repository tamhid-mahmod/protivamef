import type { Context, TypedResponse } from 'hono';

import { type z } from 'zod';
import { type Variables } from 'hono/types';

import { httpHandler } from 'src/server';

import type { Bindings } from '../env';

// ----------------------------------------------------------------------

export type Middleware<I> = ({
  ctx,
  next,
  c,
}: {
  ctx: I;
  next: <B>(args?: B) => B & I;
  c: Context<{ Bindings: Bindings; Variables: Variables }>;
}) => Promise<any>;

export type QueryOperation<Schema extends Record<string, unknown>, ZodInput = never> = {
  type: 'query';
  schema?: z.ZodType<Schema>;
  handler: <Ctx, Output>({
    ctx,
    c,
    input,
  }: {
    ctx: Ctx;
    c: Context;
    input: ZodInput;
  }) => Promise<TypedResponse<Output>>;
  middlewares: Middleware<any>[];
};

export type MutationOperation<Schema extends Record<string, unknown>, ZodInput = never> = {
  type: 'mutation';
  schema?: z.ZodType<Schema>;
  handler: <Input, Output>({
    ctx,
    c,
  }: {
    ctx: Input;
    c: Context;
    input: ZodInput;
  }) => Promise<TypedResponse<Output>>;
  middlewares: Middleware<any>[];
};

export { httpHandler as GET, httpHandler as POST };

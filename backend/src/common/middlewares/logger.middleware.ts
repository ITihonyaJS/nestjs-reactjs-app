import type { NextFunction, Request, Response } from 'express';

//если подключаем в app.module.ts
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Request..., ${req.method},${req.originalUrl}`);
//     next();
//   }
// }

//если подключаем в main.ts то подключить как класс не получится и нужно подключить как функцию
export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Request..., ${req.method},${req.originalUrl}`);
  next();
}

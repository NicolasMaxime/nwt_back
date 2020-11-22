import { IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsNotEmpty()
  login: string;
}

import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isValidObjectId(value))
      throw new BadRequestException("O que você procura não foi encontrado");
    return value;
  }
}

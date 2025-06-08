import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  const pipe = new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true });

  async function validateDto(dto: any) {
    // эмулируем работу NestJS: трансформируем и валидируем
    const object = plainToInstance(CreateUserDto, dto);
    return await validate(object);
  }

  it('should pass with valid data', async () => {
    const dto = { name: 'John Doe', email: 'john@example.com', password: 'pass1234' };
    const errors = await validateDto(dto);
    expect(errors.length).toBe(0);
  });

  it('should strip non-whitelisted properties', async () => {
    const dto = { 
      name: 'John', 
      email: 'john@example.com', 
      password: '1234', 
      foo: 'bar' 
    };
    // применим pipe
    const result = pipe.transform(dto, { type: 'body', metatype: CreateUserDto });
    await expect(result).resolves.not.toThrow();
    // и лишнего свойства не будет в результате
    await expect((await result as any).foo).toBeUndefined();
  });

  it('should fail when email is invalid', async () => {
    const dto = { name: 'John', email: 'not-an-email', password: '1234' };
    const errors = await validateDto(dto);
    expect(errors.some(e => e.property === 'email')).toBe(true);
  });

  it('should fail when name is not a string', async () => {
    const dto = { name: 123 as any, email: 'john@example.com', password: '1234' };
    const errors = await validateDto(dto);
    expect(errors.some(e => e.property === 'name')).toBe(true);
  });

  it('should fail when password is missing', async () => {
    const dto = { name: 'John', email: 'john@example.com' };
    const errors = await validateDto(dto);
    expect(errors.some(e => e.property === 'password')).toBe(true);
  });
});

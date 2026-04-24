import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotFutureYear(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    console.log('OBJECT:', object);
    console.log('CONSTRUCTOR:', object.constructor);
    registerDecorator({
      name: 'isNotFutureYear',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: number) {
          return value <= new Date().getFullYear();
        },
      },
    });
  };
}

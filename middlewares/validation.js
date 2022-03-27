import { celebrate, Joi, Segments } from 'celebrate';
import validator from 'validator';

export const validateRegister = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }

      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректный',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть больше 8 символов',
    }),
  }),
});

export const validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Имя не может быть пустым',
        'string.min': 'Имя должно быть больше 2 символов',
        'string.max': 'Имя должно быть не больше 30 символов',
      }),
    about: Joi.string().required().min(2).max(20)
      .messages({
        'any.required': 'Пароль не указан',
        'string.min': 'Поле о себе должно быть больше 2 символов',
        'string.max': 'Поле о себе быть не больше 20 символов',
      }),
  }),
});

export const validateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri().messages({
      'any.required': 'Cсылка не указана',
      'string.uri': 'Cсылка некорректная',
    }),
  }),
});

export const validateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Название не может быть пустым',
        'string.min': 'Название должно быть больше 2 символов',
        'string.max': 'Название должно быть не больше 30 символов',
      }),
    link: Joi.string().required().uri().messages({
      'any.required': 'Cсылка не указана',
      'string.uri': 'Cсылка некорректная',
    }),
  }),
});

export const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'id не может быть пустым',
        'string.length': 'длина id должна быть 24 символа',
      }),
  }),
});

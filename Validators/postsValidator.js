import { body, check, param } from 'express-validator';

export const validatePost = () => {
  return [
    check('createdAt')
      .isDate({ format: 'DD-MM-YYYY' })
      .withMessage('Param createdAt is not a valid Date'),
    body('creatorUID').notEmpty().withMessage('Param creatorUID is empty'),
    check('updatedAt')
      .isDate({ format: 'DD-MM-YYYY' })
      .withMessage('Param createdAt is not a valid Date'),
    body('deleted').isBoolean().withMessage('Param deleted is not a Boolean'),
    body('content').notEmpty().withMessage('Param content is empty'),
  ];
};

export const validateGetPostById = () => {
  return [param('id').exists().withMessage('Param id is empty')];
};

export const validateUpdatePostContent = () => {
  return [body('content').notEmpty().withMessage('Param content is empty')];
};

export const validateDeletePostById = () => {
  return [
    body('deleted').isBoolean().withMessage('Param deleted is not a Boolean'),
  ];
};

export const validateRestorePostById = () => {
  return [
    body('deleted').isBoolean().withMessage('Param deleted is not a Boolean'),
  ];
};

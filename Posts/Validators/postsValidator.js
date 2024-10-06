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
  return [
    param('id')
      .isLength({ min: 20 })
      .withMessage('Param id does not have minimal length of 20'),
    param('id').notEmpty().withMessage('Param id is empty'),
  ];
};

export const validateUpdatePostContent = () => {
  return [body('content').notEmpty().withMessage('Param content is empty')];
};

export const validateDeletePostById = () => {
  return [
    param('id')
      .isLength({ min: 20 })
      .withMessage('Param id does not have minimal length of 20'),
    param('id').notEmpty().withMessage('Param id is empty'),
  ];
};

export const validateRestorePostById = () => {
  return [
    param('id')
      .isLength({ min: 20 })
      .withMessage('Param id does not have minimal length of 20'),
    param('id').notEmpty().withMessage('Param id is empty'),
  ];
};

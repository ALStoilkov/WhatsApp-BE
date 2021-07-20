import { Router } from 'express';
import createError from 'http-errors';
import UserModel from '../../models/User/index.js';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.status(201).send(newUser);
});

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    next(createError(500, { message: error.message }));
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) next(createError(404, `ID ${req.params.id} was not found`));
    else res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    );
    res.status(201).send(updateUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deleteUser) res.status(201).send('Profile deleted');
    else next(createError(400, 'Bad Request'));
  } catch (error) {
    next(error);
  }
});

export default usersRouter;

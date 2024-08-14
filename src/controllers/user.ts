import { Request, Response } from 'express';
import User from '../models/user';

// Função Alternativa para correção do envio das msg de erro
const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({ error: message });
};

// POST
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'O Usuário foi criado com sucesso', user: newUser });
  } catch (error: any) { 
    sendErrorResponse(res, 500, error.message || 'Ocorreu um Erro ao criar usuário');
  }
};

// GET
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message || 'Ocorreu um Erro ao buscar usuários');
  }
};

// GET
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: 'O Usuário não foi encontrado' });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message || 'Erro ao buscar usuário');
  }
};

// PUT
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado para atualização' });
      return;
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message || 'Ocorreu um Erro ao atualizar usuário');
  }
};

// DELETE de user pelo id tbmm
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'Usuário não encontrado para exclusão' });
      return;
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
  } catch (error: any) {
    sendErrorResponse(res, 500, error.message || 'Erro ao deletar usuário infelizmente');
  }
};

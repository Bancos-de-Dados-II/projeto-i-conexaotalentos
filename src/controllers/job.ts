//Controla o CRUD da Vaga

import { Request, Response } from 'express';
import Vaga from '../models/job';

// Essa foi uma funçaõ alternativa utilitaria para resolver a msg de error.
const enviarRespostaErro = (res: Response, statusCode: number, mensagem: string) => {
  res.status(statusCode).json({ error: mensagem });
};

// POST
export const criarVaga = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descricao, localizacao, empresa, salario } = req.body;
    const novaVaga = new Vaga({ titulo, descricao, localizacao, empresa, salario });
    await novaVaga.save();
    res.status(201).json({ message: 'Vaga criada com sucesso, hehe', vaga: novaVaga });
  } catch (error: any) { 
    enviarRespostaErro(res, 500, error.message || 'Ocorreu um Erro ao criar vaga');
  }
};

// GET
export const obterVagas = async (req: Request, res: Response): Promise<void> => {
  try {
    const vagas = await Vaga.find();
    res.status(200).json(vagas);
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Ocorreu um Erro ao buscar vagas');
  }
};

// GET
export const obterVagaPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const vaga = await Vaga.findById(id);
    if (!vaga) {
      res.status(404).json({ message: 'Esta vaga não encontrada' });
      return;
    }
    res.status(200).json(vaga);
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Ocorreu um Erro ao buscar vaga');
  }
};

// PUT
export const atualizarVaga = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titulo, descricao, localizacao, empresa, salario } = req.body;
  try {
    const vagaAtualizada = await Vaga.findByIdAndUpdate(id, { titulo, descricao, localizacao, empresa, salario }, { new: true });
    if (!vagaAtualizada) {
      res.status(404).json({ message: 'A Vaga não encontrada para atualização' });
      return;
    }
    res.status(200).json({ message: 'A Vaga atualizada com sucesso', vaga: vagaAtualizada });
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Ocorreu um Erro ao atualizar vaga');
  }
};

// DELETE
export const deletarVaga = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const vagaDeletada = await Vaga.findByIdAndDelete(id);
    if (!vagaDeletada) {
      res.status(404).json({ message: 'A Vaga não encontrada para exclusão' });
      return;
    }
    res.status(200).json({ message: 'A Vaga deletada com sucesso', vaga: vagaDeletada });
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Ocorreu um Erro ao deletar vaga');
  }
};

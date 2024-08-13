//Controla o CRUD da Vaga

import { Request, Response } from 'express';
import Vaga from '../models/job';

// Função utilitária para enviar respostas de erro
const enviarRespostaErro = (res: Response, statusCode: number, mensagem: string) => {
  res.status(statusCode).json({ error: mensagem });
};

// POST - Criar uma nova vaga
export const criarVaga = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descricao, localizacao, empresa, salario } = req.body;
    const novaVaga = new Vaga({ titulo, descricao, localizacao, empresa, salario });
    await novaVaga.save();
    res.status(201).json({ message: 'Vaga criada com sucesso', vaga: novaVaga });
  } catch (error: any) { 
    enviarRespostaErro(res, 500, error.message || 'Erro ao criar vaga');
  }
};

// GET - Buscar todas as vagas
export const obterVagas = async (req: Request, res: Response): Promise<void> => {
  try {
    const vagas = await Vaga.find();
    res.status(200).json(vagas);
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Erro ao buscar vagas');
  }
};

// GET - Buscar vaga por ID
export const obterVagaPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const vaga = await Vaga.findById(id);
    if (!vaga) {
      res.status(404).json({ message: 'Vaga não encontrada' });
      return;
    }
    res.status(200).json(vaga);
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Erro ao buscar vaga');
  }
};

// PUT - Atualizar vaga por ID
export const atualizarVaga = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titulo, descricao, localizacao, empresa, salario } = req.body;
  try {
    const vagaAtualizada = await Vaga.findByIdAndUpdate(id, { titulo, descricao, localizacao, empresa, salario }, { new: true });
    if (!vagaAtualizada) {
      res.status(404).json({ message: 'Vaga não encontrada para atualização' });
      return;
    }
    res.status(200).json({ message: 'Vaga atualizada com sucesso', vaga: vagaAtualizada });
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Erro ao atualizar vaga');
  }
};

// DELETE - Deletar vaga por ID
export const deletarVaga = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const vagaDeletada = await Vaga.findByIdAndDelete(id);
    if (!vagaDeletada) {
      res.status(404).json({ message: 'Vaga não encontrada para exclusão' });
      return;
    }
    res.status(200).json({ message: 'Vaga deletada com sucesso', vaga: vagaDeletada });
  } catch (error: any) {
    enviarRespostaErro(res, 500, error.message || 'Erro ao deletar vaga');
  }
};

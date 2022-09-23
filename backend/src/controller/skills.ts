import dataSource from "../db";
import Skill from "../entity/Skill";
import { Request, Response } from "express"
import IController from "../types/IController";

const skillController: IController = {
  viewOne: async (req: Request, res: Response) => {
    try {
      const oneSkill = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.id, 10) });
      if (oneSkill !== null) return res.status(200).send(oneSkill);
      else return res.sendStatus(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  viewAll: async (req: Request, res: Response) => {
    try {
      const allSkills = await dataSource
        .getRepository(Skill)
        .find({ select: { id: true, name: true } });
      return res.status(200).send(allSkills);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  createOne: async (req: Request, res: Response) => {
    const { name } = req.body;
    if (name?.length > 100 || name?.length === 0)
      return res.status(422).send("You should have a length between 1 and 99");
  
    const existingSkill = await dataSource
      .getRepository(Skill)
      .findOneBy({ name });
    if (existingSkill !== null)
      return res.status(409).send("This skill already exists in database.");
  
    try {
      const createSkill = await dataSource.getRepository(Skill).save(req.body);
      return res.status(200).send(createSkill);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  updateOne: async (req: Request, res: Response) => {
    const { name } = req.body;
    if (name?.length > 100 || name?.length === 0)
      return res.status(422).send("You should have a length between 1 and 99");
  
    try {
      const { affected } = await dataSource
        .getRepository(Skill)
        .update(req.params.id, req.body);
      if (affected !== null) return res.status(200).send("Skill successfully updated");
      else return res.sendStatus(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  deleteOne: async (req: Request, res: Response) => {
    try {
      const { affected } = await dataSource
        .getRepository(Skill)
        .delete(req.params.id);
      if (affected !== null) res.status(200).send("Skill successfully deleted");
      else res.sendStatus(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  }
}

export default skillController

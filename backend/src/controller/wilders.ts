import dataSource from "../db";
import Wilder from "../entity/Wilder";
import Skills from "../entity/Skill";
import { Request, Response } from "express"
import Grade from "../entity/Grade";
import IController from "../types/IController";

const wilderController: IController = {
  viewOneWilder: async (req: Request, res: Response) => {
    try {
      const oneWilder = await dataSource.getRepository(Wilder).findOneBy({ id: parseInt(req.params.id, 10) });
      if (oneWilder !== null) return res.send(oneWilder);
      else return res.status(404).send("Wilder not found")
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  viewAllWilders: async (req: Request, res: Response) => {
    try {
      const allWilders = await dataSource.getRepository(Wilder).find({
        relations: { grades: { skill: true } },
      });
      return res.status(200).send(allWilders.map((w) => ({
        ...w, 
        grades: undefined,
        skills: w.grades.map((g) => ({
          id: g.skill.id, 
          name: g.skill.name, 
          votes: g.vote, 
        }))
      }))
    );
    } catch (err) {
      return res.status(404).send(err);
    }
  },

  create: async (req: Request, res: Response) => {
    const { name, bio, city } = req.body;
    if (name?.length > 100 || name?.length === 0)
      return res.status(422).send("You should have a length between 1 and 99");

    const existingWilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ name });
    if (existingWilder !== null)
      return res.status(409).send("Wilder already exists in database");

    try {
      const createWilder = await dataSource.getRepository(Wilder).save({ name, bio, city });
      return res.status(201).send(createWilder);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  updateOne: async (req: Request, res: Response) => {
    const { name, bio, city } = req.body;
    if (name?.length > 100 || name?.length === 0)
      return res.status(422).send("You should have a length between 1 and 99");

    try {
      const { affected } = await dataSource.getRepository(Wilder).update(req.params.id, { name, bio, city});
      if (affected !== null) return res.status(200).send("Wilder successfully updated");
      else return res.status(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  deleteOne: async (req: Request, res: Response) => {
    try {
      const { affected } = await dataSource.getRepository(Wilder).delete(req.params.id);
      if (affected !== null) res.status(200).send("Wilder successfully deleted");
      else return res.status(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  }, 

  addSkill: async (req: Request, res: Response) => {
    const wilderId = parseInt(req.params.id, 10);
    const skillId = parseInt(req.body.skillsId, 10);
  
    const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({ id: wilderId });
    if (wilderToUpdate === null)
      return res.status(404).send(`Wilder with ${wilderId} not found`);
  
    const skilltoAdd = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: skillId });
    if (skilltoAdd === null)
      return res.status(404).send(`Skill with ${skillId} not found`);
  
  
      await dataSource.getRepository(Grade).insert({
        wilder: wilderToUpdate, 
        skill: skilltoAdd,
      })  
      return res.send("Skill successfully added")
  }, 

  deleteSkill: async (req: Request, res: Response) => {
    const wilderId = parseInt(req.params.wilderId, 10);
    const skillId = parseInt(req.params.skillId, 10);
  
    const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({ id: wilderId });
    if (wilderToUpdate === null)
    return res.status(404).send(`Wilder with ${wilderId} not found`);
  
    const skillToDelete = await dataSource
      .getRepository(Skills)
      .findOneBy({ id: skillId });
      if (skillToDelete === null)
      return res.status(404).send(`Skill ${skillId} not found`);
  
     await dataSource.getRepository(Grade).delete({
      wilderId: wilderToUpdate.id, 
      skillId: skillToDelete.id,
    })
    return res.status(200).send("Skill deleted successfully");
  }
}

export default wilderController

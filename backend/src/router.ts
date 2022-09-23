import express from "express";

import wildersController from "./controller/wilders";
import skillsController from "./controller/skills";

const router = express.Router();

// WILDER ENTITY

router.get("/wilders", wildersController.viewAllWilders);
router.get("/wilders/:id", wildersController.viewOneWilder);
router.post("/wilders", wildersController.create);
router.patch("/wilders/:id", wildersController.updateOne);
router.delete("/wilders/:id", wildersController.deleteOne);
router.post("/wilders/:id/skill", wildersController.addSkill);
router.delete(
  "/wilders/:wilderId/skill/:skillId",
  wildersController.deleteSkill
);

// SKILL ENTITY

router.get("/skills", skillsController.viewAll);
router.get("/skills/:id", skillsController.viewOne);
router.post("/skills", skillsController.createOne);
router.patch("/skills/:id", skillsController.updateOne);
router.delete("/skills/:id", skillsController.deleteOne);

export default router;

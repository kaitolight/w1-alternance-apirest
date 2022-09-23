import { Request, Response } from "express"

export default interface IController {
    [key: string]: (req: Request, res: Response) => void
}
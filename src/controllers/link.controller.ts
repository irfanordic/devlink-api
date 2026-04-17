import {Request, Response, NextFunction} from 'express';
import {LinkService} from '../services/link.service.js';

export class LinkController{
    static async createLink(req: Request, res: Response, next: NextFunction ){
        const { platform, url } = req.body
        const userId = (req as any).user.id

        try{
            const Link = await LinkService.createLink({platform, url}, userId)
            res.status(201).json({
                status: "success",
                messsage: "Link created succesfull",
                data:{
                    id: Link.id,
                    plateformName: Link.platform,
                    url: Link.url
                }
            })
        }catch(error: any){
            res.status(400).json({
                status: "error",
                message: error.message
            })
        }
    }

    static async getLink(req: Request, res: Response, next: NextFunction){
        const userId = (req as any).user.id
        try{
        const getLinks = await LinkService.getLinks(userId)
        res.status(200).json({
            status: "success",
            message: "Links retrieved successfully",
            data: getLinks
        })
    }catch(error: any){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}

  static async deleteLink(req: Request, res: Response){
    const userId  = (req as any).user.id
    const linkId = (req.params.id as string)
  try{
    const removelink = await LinkService.deleteLink(userId, linkId)
    res.status(200).json({
        status: "success",
        message: "Link deleted successfully",
        data: removelink
    })
  }catch(error: any){
    res.status(400).json({
        status: "error",
        message: error.message
    })
  }
}


static async updateLink(req: Request, res: Response){
    const userId = (req as any).user.id
    const linkId = (req.params.id as string)
     const {platform, url } = req.body
     try{
        const updatedLink = await LinkService.updateLink(userId, linkId, {platform, url})
        res.status(200).json({
            status: "success",
            message: "Link updated successfully",
            data: updatedLink
        })
     }catch(error: any){
        res.status(400).json({
            status: "error",
            message: error.message
        })
     }
  }

  static async getLinkById(req: Request, res: Response){
    const id = (req.params.id as string)
    try{
        const link = await LinkService.getLinksbyId(id)
        res.status(200).json({
            status: "success",
            message: "Link retrieved successfully",
            data: link
        })
    }catch(error: any){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    }
  }

}
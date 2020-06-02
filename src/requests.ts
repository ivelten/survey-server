import { Response } from 'express'

export const processRequest = async (res: Response, processor: () => Promise<void>) => {
    try {
        await processor()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
}
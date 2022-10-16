import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3000


let videos = [
    {id: 1, title: "About JS - 01", author: "IT-INCUBATOR.EU"},
    {id: 2, title: "About JS - 02", author: "IT-INCUBATOR.EU"},
    {id: 3, title: "About JS - 03", author: "IT-INCUBATOR.EU"},
    {id: 4, title: "About JS - 04", author: "IT-INCUBATOR.EU"},
    {id: 5, title: "About JS - 05", author: "IT-INCUBATOR.EU"},
]

app.get('/', (req: Request, res: Response) =>{
    res.send("Hello IT-INCUBATOR.")
})
app.get('/videos', (req: Request, res: Response) =>{
    res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        res.status(400).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
        })
        return;
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: "it-incubator.eu"
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
    let title = req.body.title
    if(!title || typeof title !== "string" || !title.trim()  || title.length > 40){
        res.status(400).send({
            errorsMessages: [{
                "message": "Incorrect title",
                "field": "title"
            }],
            resultCode: 1
        })
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
    if(video){
        video.title = title;
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
    if(video){
        res.send(video)
    } else {
        res.send(404)
    }
})
app.delete('/videos/:videoId',(req: Request, res: Response) => {
    const id = +req.params.videoId;
    const newVideos = videos.filter(v => v.id !== id)
    if(newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    } else{
        res.send(404)
    }
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
import { connectToDatabase } from '../../../lib/database'

export default async function AddHosp(req, res) {
    try {
        // Establish/Reuse Database connection
        const { db } = await connectToDatabase();

        let body = JSON.parse(req.body)

        console.info(body)

        db.collection("hospitals").insertOne(body)
            .then(res => {
                res.status(200).json({ ok: true, msg: `Inserted ${res.insertedID ?? ''}` })
                console.log(`Success: ${JSON.stringify(res)} `)
            })
            .catch(err => {
                res.status(409).json({ ok: false, msg: `${err}` })
                console.error(`Fatal error occured ${err}`)
            })

        return res.status(200).json(resp)
    }
    catch {

    }
}
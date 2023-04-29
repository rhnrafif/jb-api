import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res){
    try {
        let dataInput = req.body;
        if(dataInput.value != ""){
            await prisma.lookup.create({
                data : {
                    name : "MataPelajaran",
                    value : dataInput.value,
                    is_active : true
                }
            })
            .then((response)=>{
                res.status(201).json({message : "Berhasil Input Pelajaran"})
            })
        }        
    } catch (error) {
        res.status(500).json({message : error})
    }
}
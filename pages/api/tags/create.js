import {PrismaClient} from '@prisma/client'

const CreateTag = async (req, res) => {
    const prisma = new PrismaClient();

    try {
        const data = req.body;
        console.log("Creating new tag", data);
        const newTag = await prisma.tag.create({data});
        res.status(201);
        res.json(newTag)
    } catch(error) {
        console.log("Failed to create tag - " + usefulError);
        res.json({
            error: { message: error.message }
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateTag;
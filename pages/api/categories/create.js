import {PrismaClient} from '@prisma/client'

const CreateCategory = async (req, res) => {
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const data = req.body;
        const newCategory = await prisma.category.create({data});
        res.status(201);
        res.json(newCategory)
    } catch(error) {
        res.json({
            error: { message: error.message }
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateCategory;
import {PrismaClient} from '@prisma/client'

const CreateCategory = async (req, res) => {
    const prisma = new PrismaClient();

    try {
        const data = req.body;
        console.log("Creating category with data", req.body);
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
import {PrismaClient} from '@prisma/client'

//todo - there should be some way of making the new user automatically a creator
//       note that this is separate from *linking* a user to a pre-existing creator,
//       which should have a different endpoint
const CreateUser = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient();

    try {
        console.log("Creating new user with data", req.body);
        const data = req.body;
        const newUser = await prisma.user.create({data});
        res.status(201);
        res.json(newUser)
    } catch(error) {
        console.log("Failed to create user" + error.message);
        res.json({
            error: { message: error.message }
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateUser;
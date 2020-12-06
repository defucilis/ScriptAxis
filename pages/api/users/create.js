import {PrismaClient} from '@prisma/client'

//todo - there should be some way of making the new user automatically a creator
//       note that this is separate from *linking* a user to a pre-existing creator,
//       which should have a different endpoint
const CreateUser = async (req, res) => {
    console.log(req.body);
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const data = req.body;
        const newUser = await prisma.user.create({data});
        res.status(201);
        res.json(newUser)
    } catch(error) {
        const usefulError = error.message.split("\n").filter(line => line && !line.match(/[{}[\]:]+/g)?.length);
        console.log("Failed to create user" + error.message);
        res.status(400);
        res.json({
            error: usefulError
        });
    } finally {
        await prisma.$disconnect();
    }
}

export default CreateUser;
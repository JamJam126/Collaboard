import { Board, BoardMember } from "../models/index.js"


const getBoard = async (req, res) => {
    const {id}=req.user
    const result = await Board.findAll({where:{user_id:id}});
    res.json(result);

}
const getBoardById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Board.findOne({ where: { id } });
        res.json(result);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}
const addBoard = async (req, res) => {
    const { title, description, visibility } = req.body;
    const user_id = req.user.id
    try {
        if (!title || !visibility || !user_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = await Board.create({ title, description, visibility, user_id })
        const boardMember = await BoardMember.create({
            user_id: user_id,
            board_id: result.id, 
            role:'admin'
        });
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: error.message });
    }
}

const updateBoard = async (req, res) => {

    const id = req.params.id;
    const { title, description, visibility, user_id } = req.body;
    try {
        const updateBoard = await Board.update(
            {title,description,visibility,user_id},
            {where : {id}})
        res.json(updateBoard);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
    // res.json({message: `Edit board ID ${req.params.id} with ${req.body}`})
}
const deleteBoard = async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
        const result = await Board.destroy({ where: { id: Id } })
        if (result) {
            return res.status(200).json({ message: 'Board deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Board not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export {
    getBoard,
    getBoardById,
    updateBoard,
    addBoard,
    deleteBoard,
    inviteuser
}
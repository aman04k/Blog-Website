import Like from '../model/like.js';

export const newLike = async (request, response) => {
    try {
        const like = new Like({
            userId: request.body.userId,
            postId: request.body.postId
        });
        await like.save();

        response.status(200).json('Like added successfully');
    } catch (error) {
        response.status(500).json(error);
    }
};

export const getLikes = async (request, response) => {
    try {
        const likes = await Like.find({ postId: request.params.id }).populate('userId', 'username');
        
        response.status(200).json(likes);
    } catch (error) {
        response.status(500).json(error);
    }
};

export const deleteLike = async (request, response) => {
    try {
        const like = await Like.findOneAndDelete({
            userId: request.body.userId,
            postId: request.params.id
        });

        if (!like) {
            return response.status(404).json('Like not found');
        }

        response.status(200).json('Like removed successfully');
    } catch (error) {
        response.status(500).json(error);
    }
};

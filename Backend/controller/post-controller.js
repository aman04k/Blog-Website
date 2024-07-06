
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        const postId = request.params.id;
        const updatedFields = request.body;

        const post = await Post.findByIdAndUpdate(postId, { $set: updatedFields }, { new: true });

        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }

        response.status(200).json('Post updated successfully');
    } catch (error) {
        console.error('Error updating post:', error);
        response.status(500).json(error);
    }
};


export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if (username)
            posts = await Post.find({ username: username });
        else if (category)
            posts = await Post.find({ categories: category });
        else
            posts = await Post.find({});

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

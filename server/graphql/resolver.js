const Post = require("../models/Post");
const cloudinary = require('../config/cloudinary');

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find();
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching posts');
      }
    },
    getPost: async (_, { id }) => {
      try {
        return await Post.findById(id);
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching post');
      }
    }
  },

  Mutation: {
    addPost: async (_, { title, description, imageUrl, userId }) => {
      try {
        const newPost = new Post({
          title,
          description,
          imageUrl, 
          userId,
        });

        return await newPost.save();
      } catch (error) {
        console.error(error);
        throw new Error('Error adding post');
      }
    },
    updatePost: async (_, { id, title, description, imageUrl }) => {
      try {
        const updates = {
          title,
          description,
          imageUrl
        };

        const post = await Post.findByIdAndUpdate(id, updates, { new: true });
        return post;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating post');
      }
    },
    deletePost: async (_, { id }) => {
      try {
        const post = await Post.findById(id);
        if (!post) throw new Error('Post not found');

        const publicId = post.image.split('/').pop().split('.')[0]; // Extract publicId
        await cloudinary.uploader.destroy(publicId); // Delete image from Cloudinary

        await Post.findByIdAndDelete(id);
        return 'Post deleted successfully';
      } catch (error) {
        console.error(error);
        throw new Error('Error deleting post');
      }
    },
  },
};

module.exports = resolvers;

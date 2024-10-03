import { NextApiRequest, NextApiResponse } from 'next';

interface Post {
  id: number;
  userId: number;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: string[];
  tags: string[];
}

let posts: Post[] = [
  { id: 1, userId: 1, imageUrl: 'https://source.unsplash.com/random/400x400?1', caption: 'Belle journée !', likes: 0, comments: [], tags: ['soleil', 'vacances'] },
  { id: 2, userId: 2, imageUrl: 'https://source.unsplash.com/random/400x400?2', caption: 'Mon nouveau projet', likes: 0, comments: [], tags: ['travail', 'innovation'] },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(posts);
      break;
    case 'POST':
      if (req.body.type === 'like') {
        const { postId } = req.body;
        posts = posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post);
        res.status(200).json(posts.find(post => post.id === postId));
      } else if (req.body.type === 'comment') {
        const { postId, comment } = req.body;
        posts = posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post);
        res.status(200).json(posts.find(post => post.id === postId));
      } else {
        const newPost: Post = { 
          id: Date.now(), 
          ...req.body, 
          likes: 0, 
          comments: [],
          tags: req.body.tags || []
        };
        posts.push(newPost);
        res.status(201).json(newPost);
      }
      break;
    case 'PUT':
      const { id, ...updateData } = req.body;
      posts = posts.map(post => post.id === id ? { ...post, ...updateData } : post);
      res.status(200).json(posts.find(post => post.id === id));
      break;
    case 'DELETE':
      const { id: deleteId } = req.query;
      posts = posts.filter(post => post.id !== Number(deleteId));
      res.status(200).json({ message: 'Post supprimé' });
      break;
    default:
      res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
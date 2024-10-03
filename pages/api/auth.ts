import { NextApiRequest, NextApiResponse } from 'next';

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.status(200).json({ id: user.id, username: user.username });
    } else {
      res.status(401).json({ message: 'Identifiants invalides' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';

const users = [
  { id: 1, username: 'user1', bio: 'Je suis user1' },
  { id: 2, username: 'user2', bio: 'Je suis user2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id, search } = req.query;
    if (id) {
      const user = users.find(u => u.id === Number(id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    } else if (search) {
      const results = users.filter(u => u.username.toLowerCase().includes(String(search).toLowerCase()));
      res.status(200).json(results);
    } else {
      res.status(400).json({ message: 'Paramètre de requête manquant' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const businesses = await prisma.business.findMany({
        orderBy: { id: 'desc' },
      });
      res.status(200).json(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name, description, price, employees, yearEstablished, location } = req.body;
    try {
      const newBusiness = await prisma.business.create({
        data: {
          name,
          description,
          price: parseInt(price),
          employees: parseInt(employees),
          yearEstablished: parseInt(yearEstablished),
          location,
        },
      });
      res.status(201).json(newBusiness);
    } catch (error) {
      console.error('Error adding business:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

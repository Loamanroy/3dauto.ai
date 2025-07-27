import express from 'express';
import laximoService from '../services/laximoService';

const router = express.Router();

router.get('/parts', async (req, res) => {
  try {
    const { catalogCode, unitId, vin } = req.query;

    if (!catalogCode || !unitId) {
      return res.status(400).json({ 
        error: 'catalogCode and unitId are required' 
      });
    }

    let parts;
    try {
      if (vin) {
        await laximoService.findVehicleByVin(catalogCode as string, vin as string);
      }
      
      const quickDetails = await laximoService.listQuickDetail(
        catalogCode as string, 
        unitId as string
      );
      
      parts = quickDetails.parts || [];
    } catch (error) {
      console.log('Laximo API not available, using mock data');
      parts = laximoService.getMockParts();
    }

    res.json({ parts });
  } catch (error) {
    console.error('Parts API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      parts: laximoService.getMockParts()
    });
  }
});

export default router;
